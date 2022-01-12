import React, { createContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROI } from "../../models";
import randomColors from "../../utils/randomColors";
import useQuery from "../../utils/useQuery";
import { getUserName } from "../../utils/userInfo";
import { fetchPrograms } from "./utils";

const QUERY_FILTER_KEY = "graduationROI.filterQuery";
const initialState = {
  programs: [] as ROI[],
  selectedPrograms: [] as ROI[],
  selectedColorMap: {} as Record<string, string>,
  queryFilter: JSON.parse(localStorage.getItem(QUERY_FILTER_KEY) || "{}") || {
    states: [],
    programs: [],
    programCategory: [],
  },
  handleFetchPrograms: async (f: any) => console.log("initialState", f),
  handleSelectedProgramChange: (f: any) => console.log("initialState", f),
  programsLoading: false,
};

export const Programs = createContext(initialState);

export const ProgramProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [programs, setPrograms] = React.useState<ROI[]>(initialState.programs);
  const [loading, setLoading] = React.useState<boolean>(false);
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

  const query = useQuery();
  React.useEffect(() => {
    const states = query
      .get("states")
      ?.split(",")
      ?.filter((v) => v);
    const programs = query
      .get("programs")
      ?.split(",")
      ?.filter((v) => v);
    const programCategory = query
      .get("programCategory")
      ?.split(",")
      ?.filter((v) => v);
    if (states || programs || programCategory) {
      setQueryFilter({ states, programs, programCategory });
    }
    if (!states?.length && !queryFilter.states?.length) {
      navigate("/query");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchPrograms = async (
    filter: typeof initialState.queryFilter
  ) => {
    setLoading(true);
    setQueryFilter(filter);
    localStorage.setItem(QUERY_FILTER_KEY, JSON.stringify(filter));
    const progs = await fetchPrograms(filter);
    const querySelectedPrograms = query.get("selected")?.split(",");
    if (querySelectedPrograms?.length) {
      setSelectedPrograms(
        progs.filter((v) => querySelectedPrograms.includes(v.id))
      );
    } else if (!selectedPrograms.length) {
      setSelectedPrograms(
        progs
          .sort(
            (a, b) =>
              b.lifetimeReturnOnInvestmentROI - a.lifetimeReturnOnInvestmentROI
          )
          .slice(0, 2)
      );
    }
    setPrograms(progs);
    setLoading(false);
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
        programsLoading: loading,
      }}
    >
      {children}
    </Programs.Provider>
  );
};
