import { ROI } from "../models";

export const uniqueId = (v: ROI): string =>
  `${v.state}_${v.programCategory}_${v.institutionName}_${v.programName}`;
