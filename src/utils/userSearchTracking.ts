import { Analytics } from "aws-amplify";
import { ROI } from "../models";
import { uniqueId } from "./dataHelpers";
import { getUserName } from "./userInfo";

export const setUpAnalytics = async (isAdmin: boolean): Promise<void> => {
  Analytics.autoTrack("event", {
    enable: !isAdmin,
  });
  if (!isAdmin) {
    Analytics.updateEndpoint({
      address: getUserName(),
      demographics: {
        timezone: (new Date()).getTimezoneOffset(),
      }
    });
  }
};

export const handleAddViewHistoryBulk = async (
  programs: ROI[]
): Promise<void> => {
  programs.forEach((p) => {
    Analytics.record({
      name: "program_click",
      attributes: {
        program_state: p.state,
        program_program_category: p.programCategory,
        program_program_name: p.programName,
        program_institution_name: p.institutionName,
        program_uniqueId: p.uniqueId || uniqueId(p),
      },
    });
  });
};
export const handleAddViewHistory = async (program: ROI): Promise<void> => {
  return handleAddViewHistoryBulk([program]);
};
