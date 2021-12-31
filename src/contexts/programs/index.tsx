import React, { createContext, useEffect, useMemo } from "react";
import { ROI } from "../../models";
import randomColors from "../../utils/randomColors";
import { getUserName  } from "../../utils/userInfo";
import { fetchPrograms } from "./utils";

const QUERY_FILTER_KEY = "graduationROI.filterQuery";
const initialState = {
  programs: [] as ROI[],
  selectedPrograms: [] as ROI[],
  selectedColorMap: {} as Record<string, string>,
  queryFilter: JSON.parse(localStorage.getItem(QUERY_FILTER_KEY) || "{}") || {
    states: ["CALIFORNIA"],
    programs: [],
    institutions: [],
  },
  handleFetchPrograms: async (f: any) => console.log("initialState", f),
  handleSelectedProgramChange: (f: any) => console.log("initialState", f),
};

export const Programs = createContext(initialState);

export const ProgramProvider = ({ children }: { children: JSX.Element }) => {
  const [programs, setPrograms] = React.useState<ROI[]>(initialState.programs);
  const [selectedPrograms, setSelectedPrograms] = React.useState<ROI[]>(
    initialState.selectedPrograms
  );
  const selectedColorMap = useMemo(
    () =>
      Object.fromEntries(
        selectedPrograms.map((p, k) => [
          p.id,
          randomColors[k % randomColors.length],
        ])
      ),
    [selectedPrograms]
  );
  const [queryFilter, setQueryFilter] = React.useState(
    initialState.queryFilter
  );

  const handleFetchPrograms = async (
    filter: typeof initialState.queryFilter
  ) => {
    setQueryFilter(filter);
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(filter));
    const response = await fetchPrograms(filter);
    setPrograms(response);
  };

  const handleSelectedProgramChange = (changedValues: ROI[]) => {
    setSelectedPrograms(changedValues);
  };

  const userName = getUserName();
  useEffect(() => {
    if (userName) {

      handleFetchPrograms(queryFilter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <Programs.Provider
      value={{
        programs,
        selectedPrograms,
        selectedColorMap,
        queryFilter,
        handleFetchPrograms,
        handleSelectedProgramChange,
      }}
    >
      {children}
    </Programs.Provider>
  );
};
