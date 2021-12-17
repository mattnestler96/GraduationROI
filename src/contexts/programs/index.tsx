import React, { createContext, useEffect } from "react";
import { sampleData } from "../../data/sample";
import { ROI } from "../../models";
import { uniqueId, convertData } from "../../utils/dataHelpers";
import { isInSampleUserMode } from "../../utils/userInfo";
import { fetchPrograms } from "./utils";

const QUERY_FILTER_KEY = "graduationROI.filterQuery";
const initialState = {
  programs: [] as ROI[],
  selectedPrograms: [] as ROI[],
  queryFilter: JSON.parse(localStorage.getItem(QUERY_FILTER_KEY) || "{}") || {
    states: ["CALIFORNIA"],
    programs: [],
    institutions: [],
  },
  handleFetchPrograms: async (f: any) => console.log('initialState', f),
  handleSelectedProgramChange: (f: any) => console.log('initialState', f),
};

export const Programs = createContext(initialState);

export const ProgramProvider = ({ children }: { children: JSX.Element }) => {
  const [programs, setPrograms] = React.useState<ROI[]>(initialState.programs);
  const [selectedPrograms, setSelectedPrograms] = React.useState<ROI[]>(initialState.selectedPrograms)
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

  useEffect(() => {
    if (!isInSampleUserMode()) {
      handleFetchPrograms(queryFilter);
    } else {
      setPrograms(
        sampleData.map(convertData).map((v) => ({ ...v, id: uniqueId(v) }))
      );
    }
  }, []);

  return (
    <Programs.Provider value={{ programs, selectedPrograms, queryFilter, handleFetchPrograms, handleSelectedProgramChange }}>
      {children}
    </Programs.Provider>
  );
};
