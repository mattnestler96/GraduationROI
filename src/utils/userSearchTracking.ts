import { DataStore } from "aws-amplify";
import { ROI, UserInfo } from "../models";
import { convertAWSJSON, uniqueId } from "./dataHelpers";
import { getUserName, isInSampleUserMode } from "./userInfo";

export interface IUserProgramRecord {
  count: number;
  lastViewed: string;
}

const handleFetchUserInfo = async (): Promise<UserInfo[]> => {
  return await DataStore.query(UserInfo, (c) =>
    c.email("eq" as never, getUserName() as never)
  );
};
export const handleAddViewHistoryBulk = async (
  programs: ROI[]
): Promise<void> => {
  if (!isInSampleUserMode()) {
    const users = await handleFetchUserInfo();
    if (users && users.length === 1) {
      const existingUser = users[0];
      const previousViewHistory = convertAWSJSON(existingUser.viewHistory) as any;
      const newViewHistory = {
        ...previousViewHistory,
        ...Object.fromEntries(
          programs.map((p) => {
            const previousCount =
              (previousViewHistory[uniqueId(p)]?.count || 0) + 1;
            return [
              uniqueId(p),
              {
                count: previousCount,
                lastViewed: new Date().toDateString(),
              } as IUserProgramRecord,
            ];
          })
        ),
      };
      await DataStore.save(
        UserInfo.copyOf(existingUser, (item) => {
          item.viewHistory = JSON.stringify(newViewHistory);
        })
      );
    }
  }
};
export const handleAddViewHistory = async (program: ROI): Promise<void> => {
  return handleAddViewHistoryBulk([program]);
};
