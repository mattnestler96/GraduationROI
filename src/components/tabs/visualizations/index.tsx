import { Paper, PaperTypeMap } from "@mui/material";
import SelectedProgramsHeader from "../../selectedProgramsHeader";
import ROIOverTimeGraph from "../../visualizations/roiOverTimeLine";
import ROILifeTimeBar from "../../visualizations/roiLifeTimeBar";
import GraduationRatePie from "../../visualizations/graduationRate";
import ROICostSizeBubble from "../../visualizations/roiCostSizeBubble";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { ROI } from "../../../models";

const TableWrapper = (props: DefaultComponentProps<PaperTypeMap>) => (
  <Paper {...props} style={{ marginBottom: 5, padding: 15, ...props.style }} />
);

interface IVisualizationTab {
    selectedPrograms: ROI[];
    onChange: (v: ROI[]) => void;
}

const VisualizationTab = (props: IVisualizationTab) => {
  const { selectedPrograms, onChange } = props;
  return (
    <>
      <SelectedProgramsHeader
        selectedPrograms={selectedPrograms}
        onChange={onChange}
      />
      <TableWrapper>
        <ROILifeTimeBar items={selectedPrograms} />
      </TableWrapper>
      <TableWrapper>
        <ROIOverTimeGraph items={selectedPrograms} />
      </TableWrapper>
      <TableWrapper>
        <GraduationRatePie items={selectedPrograms} />
      </TableWrapper>
      <TableWrapper>
        <ROICostSizeBubble items={selectedPrograms} />
      </TableWrapper>
    </>
  );
};

export default VisualizationTab;
