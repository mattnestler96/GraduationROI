import { ROI } from "../../models";
import { DataStore, API } from "aws-amplify";
import { uniqueId, ITEM_LIMIT } from "../../utils/dataHelpers";
import { stateByUniqueId } from "../../graphql/queries";
import { isInSampleUserMode } from "../../utils/userInfo";

const chainCall = (test, param, values) => (c) => {
  if (!values || values.length === 0) {
    return;
  }
  const newValues = [...values];
  const currValue = newValues.pop();
  if (values.length > 1) {
    return chainCall(test, param, newValues)(c[param](test, currValue));
  }
  return c[param](test, currValue);
};

const buildGraphQLFilter = (test, param, values) => {
  if (values?.length) {
    return { or: values.map((v) => ({ [param]: { [test]: v } })) };
  }
  return undefined;
};

const fetchByGraphQL = async (s, pc, filter, nT, accumulatedData) => {
  if (accumulatedData && accumulatedData.length > ITEM_LIMIT) {
    return accumulatedData;
  }
  const response = await API.graphql({
    query: stateByUniqueId,
    operation: "stateByUniqueId",
    authMode: "AWS_IAM",
    variables: {
      state: s,
      uniqueId: { beginsWith: `${s}_${pc}` },
      nextToken: nT,
      limit: ITEM_LIMIT,
      filter: {
        and: [
          // buildGraphQLFilter("eq", "state", s),
          // buildGraphQLFilter("eq", "programCategory", pc),
          buildGraphQLFilter("eq", "programName", filter.programs),
          buildGraphQLFilter(
            "contains",
            "institutionName",
            filter.institutions
          ),
        ].filter((v) => !!v),
      },
    },
  });
  const { items, nextToken } = response.data.stateByUniqueId;
  if (nextToken) {
    return fetchByGraphQL(s, pc, filter, nextToken, [
      ...(accumulatedData ?? []),
      ...items,
    ]);
  }
  return [...(accumulatedData ?? []), ...items];
};

const breakDownByStateAndProgramCategory = async (filter) => {
  let { states, programCategory } = filter;
  if (states) {
    programCategory = programCategory?.length ? programCategory : [""];
    const responses = await Promise.all(
      states.map(async (s) => {
        const stateResponses = await Promise.all(
          programCategory.map((pc) => {
            return fetchByGraphQL(s, pc, filter);
          })
        );
        return stateResponses.flat();
      })
    );
    return responses.flat();
  }
  return [];
};

const fetchByDataStore = async (filter) => {
  return DataStore.query(
    ROI,
    (c) =>
      c
        .or(chainCall("eq", "state", filter.states))
        .or(chainCall("eq", "programCategory", filter.programCategory))
        .or(chainCall("eq", "programName", filter.programs))
        .or(chainCall("contains", "institutionName", filter.institutions)),
    { limit: ITEM_LIMIT }
  );
};

export const fetchPrograms = async (filter) => {
  const response = await (isInSampleUserMode()
    ? breakDownByStateAndProgramCategory(filter)
    : fetchByDataStore(filter));
  const dedupe = {};
  response.forEach(async (v) => {
    if (!isInSampleUserMode() && !v.uniqueId) {
      DataStore.save(
        ROI.copyOf(v, (item) => {
          item.uniqueId = uniqueId(v);
        })
      );
    }
    if (!isInSampleUserMode() && dedupe[uniqueId(v)]) {
      console.log(`delete ${uniqueId(v)}`, v.id);
      await DataStore.delete(ROI, v.id);
    }
    dedupe[uniqueId(v)] = v;
  });
  return Object.values(dedupe);
};
