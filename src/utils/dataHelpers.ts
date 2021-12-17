import { originalColumnToType } from "../data/types";
import { ROI } from "../models";

export const ITEM_LIMIT = 1000;

export const uniqueId = (v: Partial<ROI>): string =>
  `${v.state}_${v.programCategory}_${v.institutionName}_${v.programName}`;

type OriginalColumnKeys = keyof typeof originalColumnToType;

export const convertData = (
  d: Record<OriginalColumnKeys, string | number>
): Omit<ROI, "id"> =>
  Object.fromEntries(
    Object.entries(d).map(([k, v]) => [
      originalColumnToType[k as OriginalColumnKeys],
      v || undefined,
    ])
  );

export const convertAWSJSON = (x: any): unknown => {
  return !x || typeof x !== "object" ? JSON.parse(x || "{}") : x;
};
