import { Analytics, DataStore } from "aws-amplify";
import { ROI, UserInfo } from "../models";
import { uniqueId } from "./dataHelpers";
import { getUserName } from "./userInfo";

export const setUpAnalytics = async (isAdmin: boolean): Promise<void> => {
  Analytics.autoTrack("event", {
    enable: !isAdmin,
  });
  if (!isAdmin) {
    const response = await DataStore.query(UserInfo, (c) =>
      c.email("eq" as never, getUserName() as never)
    );
    const user = response[0];
    Analytics.updateEndpoint({
      address: getUserName(),
      userId: getUserName(),
      userAttributes: {
        email: [getUserName()],
        timezone: [new Date().getTimezoneOffset()],
        user_type: [user?.userType],
        time_preferences: Object.keys(user?.timePreferences ?? {}),
        day_preferences: Object.keys(user?.dayPreferences ?? {}),
        modality_preferences: Object.keys(user?.modalityPreferences ?? {}),
      },
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
