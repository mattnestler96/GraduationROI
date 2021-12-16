import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ROI } from "../../../models";
import MultiSelect from "../../multiSelect";
import SummaryCell from "../../summaryCell";

const analysisTypeOptions: Record<string, keyof ROI> = {
  "Program Name": "programName",
  "Program Type": "programCategory",
  State: "state",
  "Institution Type": "control",
  "Institution Name": "institutionName",
};

interface IVisualizationTab {
  programs: ROI[];
  selectedPrograms: ROI[];
  onChange: (v: ROI[]) => void;
}

const SummaryTab = (props: IVisualizationTab) => {
  const [analysisType, setAnalysisType] = useState("Program Name");
  const { programs, selectedPrograms } = props;
  const handleItemClick = (v: ROI) => {
    if (selectedPrograms.includes(v)) {
      props.onChange(selectedPrograms.filter((p) => p.id !== v.id));
    } else {
      props.onChange([...selectedPrograms, v]);
    }
  };
  const handleTypeChange = (v: string[]) => {
    let newType = v[0] ?? analysisType;
    if (v.length > 1) {
      newType = v.find((t) => t !== analysisType) ?? analysisType;
    }
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
      <Box display="flex" alignItems="center">
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
            label={name}
            programs={filteredPrograms}
            selectedPrograms={selectedPrograms}
            onClick={handleItemClick}
          />
        ))}
    </>
  );
};

export default SummaryTab;
