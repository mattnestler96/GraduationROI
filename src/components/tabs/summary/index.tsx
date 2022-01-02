import { useMemo } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Analytics } from "aws-amplify";
import { useState, useContext } from "react";
import { Programs } from "../../../contexts/programs";
import { ROI } from "../../../models";
import { handleAddViewHistoryBulk } from "../../../utils/userSearchTracking";
import MultiSelect from "../../multiSelect";
import SummaryCell from "../../summaryCell";
import { useDeferred } from "../../../utils/useDeferred";

const ANALYSIS_KEY = "graduationROI.analysisKey";
const analysisTypeOptions: Record<string, keyof ROI> = {
  "Program Name": "programName",
  "Area of Focus": "programCategory",
  State: "state",
  "Institution Type": "control",
  "Institution Name": "institutionName",
};

const SummaryTab = () => {
  const [analysisType, setAnalysisType] = useState(
    localStorage.getItem(ANALYSIS_KEY) || "Program Name"
  );
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferred(filter, 300);
  const {
    programs,
    selectedPrograms,
    selectedColorMap,
    handleSelectedProgramChange,
  } = useContext(Programs);
  const handleItemClick = (v: ROI) => {
    if (selectedColorMap[v.id]) {
      handleSelectedProgramChange(
        selectedPrograms.filter((p) => p.id !== v.id)
      );
    } else {
      handleSelectedProgramChange([...selectedPrograms, v]);
    }
  };
  const handleClickAll = (v: ROI[]) => {
    handleAddViewHistoryBulk(v);
    handleSelectedProgramChange(
      Object.values(
        Object.fromEntries([...v, ...selectedPrograms].map((p) => [p.id, p]))
      )
    );
  };
  const handleTypeChange = (v: string[]) => {
    let newType = v[0] ?? analysisType;
    if (v.length > 1) {
      newType = v.find((t) => t !== analysisType) ?? analysisType;
    }
    localStorage.setItem(ANALYSIS_KEY, newType);
    Analytics.record({
      name: "change_analysis_type",
      attributes: {
        analysis_type: newType,
      },
    });
    setAnalysisType(newType);
  };
  const programObject = useMemo(() => {
    const uniquePrograms: Record<string, ROI[]> = Object.fromEntries(
      programs.map((v) => [v[analysisTypeOptions[analysisType]] || "", []])
    );
    programs.forEach((v) => {
      uniquePrograms[v[analysisTypeOptions[analysisType]] || ""].push(v);
    });
    return uniquePrograms;
  }, [analysisType, programs]);
  const filteredProgramObject = useMemo(() => {
    return Object.fromEntries(
      Object.entries(programObject)
        .filter(([name]) =>
          name.toUpperCase().includes(deferredFilter.toUpperCase())
        )
        .sort(([nameA], [nameB]) => (nameA > nameB ? 1 : -1))
    );
  }, [programObject, deferredFilter]);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        marginBottom="10px"
        marginTop="10px"
      >
        <Typography variant="h5">Broken out by</Typography>
        <MultiSelect
          value={[analysisType]}
          options={Object.keys(analysisTypeOptions)}
          onChange={handleTypeChange}
        />
        <Typography variant="h5">filtered to</Typography>
        <TextField
          label="Filter..."
          onChange={(e) => setFilter(e.target.value)}
          style={{ margin: "0px 10px" }}
        />
      </Box>
      {Object.entries(filteredProgramObject).map(([name, filteredPrograms]) => (
        <SummaryCell
          key={`${name}_${analysisType}`}
          label={name}
          programs={filteredPrograms}
          onClick={handleItemClick}
          onClickAll={handleClickAll}
        />
      ))}
    </>
  );
};

export default SummaryTab;
