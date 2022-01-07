// import { ROI } from "../../models";
import {
  // DataStore,
  API,
} from "aws-amplify";
import programToType from "../../components/queryButton/programToType";
import {
  // uniqueId,
  ITEM_LIMIT,
} from "../../utils/dataHelpers";
import { stateByUniqueId } from "../../graphql/queries";
import { isInSampleUserMode } from "../../utils/userInfo";

const previousCalledCache = {};
const cacheWrapper = async (fn, s, pc, programs) => {
  const cacheKey = `${s}_${pc}_${JSON.stringify(programs)}`;
  let value = previousCalledCache[cacheKey];
  if (!value) {
    const response = await fn(s, pc, programs);
    previousCalledCache[cacheKey] = response;
    value = response;
  }
  return value;
};

// const chainCall = (test, param, values) => (c) => {
//   if (!values || values.length === 0) {
//     return;
//   }
//   const newValues = [...values];
//   const currValue = newValues.pop();
//   if (values.length > 1) {
//     return chainCall(test, param, newValues)(c[param](test, currValue));
//   }
//   return c[param](test, currValue);
// };

const buildGraphQLFilter = (test, param, values) => {
  if (values?.length) {
    return { or: values.map((v) => ({ [param]: { [test]: v } })) };
  }
  return undefined;
};

const limit = isInSampleUserMode() ? ITEM_LIMIT : 3000;
const fetchByGraphQL = async (s, pc, programs, nT, accumulatedData) => {
  if (accumulatedData && accumulatedData.length > limit) {
    return accumulatedData;
  }
  const response = await API.graphql({
    query: stateByUniqueId,
    operation: "stateByUniqueId",
    authMode: "AWS_IAM",
    variables: {
      limit,
      state: s,
      uniqueId: { beginsWith: `${s}_${pc}` },
      nextToken: nT,
      filter: {
        and: [buildGraphQLFilter("eq", "programName", programs)].filter(
          (v) => !!v
        ),
      },
    },
  });
  const { items, nextToken } = response.data.stateByUniqueId;
  if (nextToken) {
    return fetchByGraphQL(s, pc, programs, nextToken, [
      ...(accumulatedData ?? []),
      ...items,
    ]);
  }
  return [...(accumulatedData ?? []), ...items];
};

const determineProgramCategories = (programCategories, programs) => {
  let programCategoryFromPrograms = [];
  if (programs && programs.length) {
    programCategoryFromPrograms = Object.keys(
      Object.fromEntries(programs?.map((p) => [programToType[p], ""]))
    );
  }
  programCategories = programCategories?.length
    ? Object.keys(
        Object.fromEntries(
          [...programCategories, ...programCategoryFromPrograms].map((v) => [
            v,
            "",
          ])
        )
      )
    : programCategoryFromPrograms;
  return programCategories;
};

const breakDownByStateAndProgramCategory = async (filter) => {
  let { states, programCategory, programs } = filter;
  if (states) {
    const responses = await Promise.all(
      states.map(async (s) => {
        const stateResponses = await Promise.all(
          determineProgramCategories(programCategory, programs).map((pc) => {
            return cacheWrapper(fetchByGraphQL, s, pc, programs);
          })
        );
        return stateResponses.flat();
      })
    );
    return responses.flat();
  }
  return [];
};

// const fetchByDataStore = async (filter) => {
//   return DataStore.query(ROI, (c) =>
//     c
//       .or(chainCall("eq", "state", filter.states))
//       .or(chainCall("eq", "programCategory", filter.programCategory))
//       .or(chainCall("eq", "programName", filter.programs))
//   );
// };

// const cleanItems = (response) => {
//   const dedupe = {};
//   response.forEach(async (v) => {
//     if (
//       !isInSampleUserMode() &&
//       (!v.uniqueId || v.uniqueId.includes("undefined_undefined"))
//     ) {
//       DataStore.save(
//         ROI.copyOf(v, (item) => {
//           item.uniqueId = uniqueId(v);
//         })
//       );
//     }
//     if (!isInSampleUserMode() && dedupe[uniqueId(v)]) {
//       console.log(`delete ${uniqueId(v)}`, v.id);
//       await DataStore.delete(ROI, v.id);
//     }
//     dedupe[uniqueId(v)] = v;
//   });
//   return Object.values(dedupe);
// };

export const fetchPrograms = async (filter) => {
  const response = await breakDownByStateAndProgramCategory(filter);

  // return cleanItems(response);
  return response;
};
