import { ROI } from "../../models";
import { DataStore, API } from "aws-amplify";
import { uniqueId, ITEM_LIMIT } from "../../utils/dataHelpers";
import { listROIS } from "../../graphql/queries";
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
  if (values.length) {
    return { or: values.map((v) => ({ [param]: { [test]: v } })) };
  }
  return undefined;
};

const fetchByGraphQL = async (filter, nT, accumulatedData) => {
  if (accumulatedData && accumulatedData.length > ITEM_LIMIT) {
    return accumulatedData;
  }
  const response = await API.graphql({
    query: listROIS,
    operationName: "listROIS",
    authMode: "AWS_IAM",
    variables: {
      nextToken: nT,
      limit: ITEM_LIMIT,
      filter: {
        and: [
          buildGraphQLFilter("eq", "state", filter.states),
          buildGraphQLFilter("eq", "programCategory", filter.programCategory),
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
  const { items, nextToken } = response.data.listROIS;
  if (nextToken) {
    return fetchByGraphQL(filter, nextToken, [
      ...(accumulatedData ?? []),
      ...items,
    ]);
  }
  return [...accumulatedData, ...items];
};

const fetchByDataStore = async (filter) => {
  const response = await DataStore.query(
    ROI,
    (c) =>
      c
        .or(chainCall("eq", "state", filter.states))
        .or(chainCall("eq", "programCategory", filter.programCategory))
        .or(chainCall("eq", "programName", filter.programs))
        .or(chainCall("contains", "institutionName", filter.institutions)),
    { limit: ITEM_LIMIT }
  );
  const dedupe = {};
  response.forEach(async (v) => {
    if (!v.uniqueId) {
      console.log("update uniqueId");
      DataStore.save(
        ROI.copyOf(v, (item) => {
          item.uniqueId = uniqueId(v);
        })
      );
    }
    if (dedupe[uniqueId(v)]) {
      console.log(`delete ${uniqueId(v)}`, v.id);
      await DataStore.delete(ROI, v.id);
    }
    dedupe[uniqueId(v)] = v;
  });
  return Object.values(dedupe);
};

export const fetchPrograms = async (filter) => {
  if (isInSampleUserMode()) {
    return fetchByGraphQL(filter);
  } else {
    return fetchByDataStore(filter);
  }
};
