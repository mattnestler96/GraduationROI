import { Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { Programs } from "../../../contexts/programs";
import { ROI } from "../../../models";
import { handleAddViewHistoryBulk } from "../../../utils/userSearchTracking";
import MultiSelect from "../../multiSelect";
import SummaryCell from "../../summaryCell";

const ANALYSIS_KEY = "graduationROI.analysisKey";
const analysisTypeOptions: Record<string, keyof ROI> = {
  "Program Name": "programName",
  "Program Type": "programCategory",
  State: "state",
  "Institution Type": "control",
  "Institution Name": "institutionName",
};

const SummaryTab = () => {
  const [analysisType, setAnalysisType] = useState(
    localStorage.getItem(ANALYSIS_KEY) || "Program Name"
  );
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
    setAnalysisType(newType);
  };
  const uniquePrograms: Record<string, ROI[]> = Object.fromEntries(
    programs.map((v) => [v[analysisTypeOptions[analysisType]] || "", []])
  );
  programs.forEach((v) => {
    uniquePrograms[v[analysisTypeOptions[analysisType]] || ""].push(v);
  });
  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h5">
          Showing summary of programs broken by:
        </Typography>
        <MultiSelect
          value={[analysisType]}
          options={Object.keys(analysisTypeOptions)}
          onChange={handleTypeChange}
        />
      </Box>
      {Object.entries(uniquePrograms)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map(([name, filteredPrograms]) => (
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
