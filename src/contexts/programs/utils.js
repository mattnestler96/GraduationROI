import { ROI } from "../../models";
import { DataStore } from "aws-amplify";
import { uniqueId, ITEM_LIMIT } from "../../utils/dataHelpers";

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

export const fetchPrograms = async (filter) => {
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
    if (dedupe[uniqueId(v)]) {
      console.log(`delete ${uniqueId(v)}`, v.id);
      await DataStore.delete(ROI, v.id);
    }
    dedupe[uniqueId(v)] = v;
  });
  return Object.values(dedupe);
};
