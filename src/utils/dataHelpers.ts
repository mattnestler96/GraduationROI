import { ROI } from "../models";

export const ITEM_LIMIT = 100;

export const uniqueId = (v: Partial<ROI>): string =>
  `${v.state}_${v.programCategory}_${v.programName}_${v.institutionName}`;

export const convertAWSJSON = (x: any): unknown => {
  return !x || typeof x !== "object" ? JSON.parse(x || "{}") : x;
};
