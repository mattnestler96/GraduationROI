import { Paper, PaperTypeMap } from "@mui/material";
import SelectedProgramsHeader from "../../selectedProgramsHeader";
import ROIOverTimeGraph from "../../visualizations/roiOverTimeLine";
import ROILifeTimeBar from "../../visualizations/roiLifeTimeBar";
import GraduationRatePie from "../../visualizations/graduationRate";
import ROICostSizeBubble from "../../visualizations/roiCostSizeBubble";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

const TableWrapper = (props: DefaultComponentProps<PaperTypeMap>) => (
  <Paper {...props} style={{ marginBottom: 5, padding: 15, ...props.style }} />
);

const VisualizationTab = () => {
  return (
    <>
      <SelectedProgramsHeader />
      <TableWrapper>
        <ROILifeTimeBar />
      </TableWrapper>
      <TableWrapper>
        <ROIOverTimeGraph />
      </TableWrapper>
      <TableWrapper>
        <GraduationRatePie />
      </TableWrapper>
      <TableWrapper>
        <ROICostSizeBubble />
      </TableWrapper>
    </>
  );
};

export default VisualizationTab;
