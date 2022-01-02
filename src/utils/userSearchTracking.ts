import { Analytics } from "aws-amplify";
import { ROI } from "../models";
import { uniqueId } from "./dataHelpers";
import { getUserName } from "./userInfo";

export interface IUserProgramRecord {
  count: number;
  lastViewed: string;
}

// const handleFetchUserInfo = async (): Promise<UserInfo[]> => {
//   return await DataStore.query(UserInfo, (c) =>
//     c.email("eq" as never, getUserName() as never)
//   );
// };
export const handleAddViewHistoryBulk = async (
  programs: ROI[]
): Promise<void> => {
  programs.forEach((p) => {
    Analytics.record({
      name: 'program_click',
      attributes: {
        program_state: p.state,
        program_program_category: p.programCategory,
        program_program_name: p.programName,
        program_institution_name: p.institutionName,
        program_uniqueId: p.uniqueId || uniqueId(p),
        user_username: getUserName(),
      }
    });
  });

  // if (!isInSampleUserMode()) {
  //   const users = await handleFetchUserInfo();
  //   if (users && users.length === 1) {
  //     const existingUser = users[0];
  //     const previousViewHistory = convertAWSJSON(existingUser.viewHistory) as any;
  //     const newViewHistory = {
  //       ...previousViewHistory,
  //       ...Object.fromEntries(
  //         programs.map((p) => {
  //           const previousCount =
  //             (previousViewHistory[uniqueId(p)]?.count || 0) + 1;
  //           return [
  //             uniqueId(p),
  //             {
  //               count: previousCount,
  //               lastViewed: new Date().toDateString(),
  //             } as IUserProgramRecord,
  //           ];
  //         })
  //       ),
  //     };
  //     await DataStore.save(
  //       UserInfo.copyOf(existingUser, (item) => {
  //         item.viewHistory = JSON.stringify(newViewHistory);
  //       })
  //     );
  //   }
  // }
};
export const handleAddViewHistory = async (program: ROI): Promise<void> => {
  return handleAddViewHistoryBulk([program]);
};
