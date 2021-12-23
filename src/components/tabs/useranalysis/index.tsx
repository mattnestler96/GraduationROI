import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { UserInfo } from "../../../models";
import { IUserProgramRecord } from "../../../utils/userSearchTracking";
import MultiSelect from "../../multiSelect";
import { useDeferred } from "../../../utils/useDeferred";
import { convertAWSJSON } from "../../../utils/dataHelpers";
import UserInfoGraph, { IUserInfoGraphKeys } from "../../visualizations/useranalysis/UserInfoGraph";

const analysisTypeOptions: Record<string, number> = {
  state: 0,
  "Program Category": 1,
  "Institution Name": 2,
  "Program Name": 3,
};

export const fetchUserInfo = async () => {
  const response = await DataStore.query(UserInfo);
  return response;
};

interface IEnhancedUserRecord extends IUserProgramRecord {
  users: Record<string, boolean>;
}

const combineValues = (
  oldVal?: IEnhancedUserRecord,
  newVal?: IEnhancedUserRecord
): IEnhancedUserRecord => ({
  count: (oldVal?.count ?? 0) + (newVal?.count ?? 0),
  lastViewed: newVal?.lastViewed ?? oldVal?.lastViewed ?? "",
  users: { ...oldVal?.users, ...newVal?.users },
});

const addUser = (
  oldVal?: IEnhancedUserRecord,
  newVal?: IUserProgramRecord,
  user?: UserInfo
): IEnhancedUserRecord => ({
  count: (oldVal?.count ?? 0) + (newVal?.count ?? 0),
  lastViewed: newVal?.lastViewed ?? oldVal?.lastViewed ?? "",
  users: {
    ...(oldVal?.users ?? {}),
    [user?.id as string]: true,
  },
});

const UserAnalysisTab = () => {
  const [users, setUsers] = useState<Record<string, UserInfo>>({});
  const [analysisType, setAnalysisType] = useState("state");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState<
    { info: IEnhancedUserRecord; type: IUserInfoGraphKeys } | undefined
  >();
  const deferredSearch = useDeferred(search, 300);

  const combinedHistory = useMemo(() => {
    return Object.values(users).reduce((acc, u) => {
      const history = convertAWSJSON(u.viewHistory) as Record<
        string,
        IUserProgramRecord
      >;

      Object.entries(history).forEach(([k, v]) => {
        acc[k] = addUser(acc[k], v, u);
      });
      return acc;
    }, {} as Record<string, IEnhancedUserRecord>);
  }, [users]);

  const uniqueUsersInfo = useMemo(() => {
    const unique = {} as Record<string, IEnhancedUserRecord>;
    Object.entries(combinedHistory).forEach(([id, h]) => {
      const key = id.split("_")[analysisTypeOptions[analysisType]];
      unique[key] = combineValues(unique[key], h);
    });
    return unique;
  }, [combinedHistory, analysisType]);

  const filteredUniqueUserInfo = useMemo(() => {
    return Object.fromEntries(
      Object.entries(uniqueUsersInfo).filter(([k]) =>
        k.toUpperCase().includes(deferredSearch.toUpperCase())
      )
    );
  }, [uniqueUsersInfo, deferredSearch]);

  const handleTypeChange = (v: string[]) => {
    let newType = v[0] ?? analysisType;
    if (v.length > 1) {
      newType = v.find((t) => t !== analysisType) ?? analysisType;
    }
    setAnalysisType(newType);
  };
  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };
  const openDialog = (info: IEnhancedUserRecord, type: IUserInfoGraphKeys) => () => {
    setDialogOpen({ info, type });
  };
  const closeDialog = () => {
    setDialogOpen(undefined);
  };
  useEffect(() => {
    fetchUserInfo().then((userArray) =>
      setUsers(Object.fromEntries(userArray.map((u) => [u.id, u])))
    );
  }, []);
  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h5">Showing user interest broken up by:</Typography>
        <MultiSelect
          value={[analysisType]}
          options={Object.keys(analysisTypeOptions)}
          onChange={handleTypeChange}
        />
        <TextField onChange={handleSearchChange} label="Quick Filter" />
      </Box>
      {Object.entries(filteredUniqueUserInfo)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map(([name, info]) => (
          <Paper style={{ margin: "10px", padding: "10px" }}>
            <Typography>{name}</Typography>
            <Typography>count</Typography>
            <Typography>{info.count}</Typography>
            <Typography>user count</Typography>
            <Typography>{Object.keys(info.users).length}</Typography>
            <Button onClick={openDialog(info, "dayPreferences")}>
              DOW
            </Button>
            <Button onClick={openDialog(info, "timePreferences")}>
              Time
            </Button>
            <Button onClick={openDialog(info, "modalityPreferences")}>
              Modality
            </Button>
          </Paper>
        ))}

      <Dialog open={!!dialogOpen} onClose={closeDialog}>
        <DialogTitle>Graph</DialogTitle>
        <DialogContent>
          <UserInfoGraph
            selectedUsers={Object.keys(dialogOpen?.info?.users ?? {}).map(
              (i) => users[i]
            )}
            type={dialogOpen?.type || "dayPreferences"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserAnalysisTab;
