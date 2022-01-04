import { Paper, PaperTypeMap } from "@mui/material";
import SelectedProgramsHeader from "../../selectedProgramsHeader";
import ROIOverTimeGraph from "../../visualizations/roiOverTimeLine";
import ROILifeTimeBar from "../../visualizations/roiLifeTimeBar";
import CostBar from "../../visualizations/costBar";
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
        <CostBar />
      </TableWrapper>
      <TableWrapper>
        <ROIOverTimeGraph />
      </TableWrapper>
      <TableWrapper>
        <ROICostSizeBubble />
      </TableWrapper>
      <TableWrapper>
        <GraduationRatePie />
      </TableWrapper>
    </>
  );
};

export default VisualizationTab;
