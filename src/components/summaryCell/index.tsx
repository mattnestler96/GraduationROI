import {
  Paper,
  PaperTypeMap,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import Add from "@mui/icons-material/AddCircleOutline";
import { useContext, useMemo } from "react";
import { ROI } from "../../models";
import ListItemWithBorder from "../programListItem/listItemWithBorder";
import { Programs } from "../../contexts/programs";
import { numberWithCommas } from "../../utils/dataHelpers";

const TableWrapper = (props: DefaultComponentProps<PaperTypeMap>) => (
  <Paper
    {...props}
    style={{
      marginBottom: 5,
      padding: 15,
      overflowX: "scroll",
      ...props.style,
    }}
  />
);

interface ISummaryCell {
  label: string;
  programs: ROI[];
  onClick: (v: ROI) => void;
  onClickAll: (v: ROI[]) => void;
}

const SummaryCell = ({
  label,
  programs,
  onClick,
  onClickAll,
}: ISummaryCell) => {
  const { selectedColorMap } = useContext(Programs);
  const handleClickAll = () => {
    onClickAll(programs);
  };

  const stats = useMemo(() => {
    let averageROI = 0;
    let maxROIValue = -Infinity;
    let maxROI = "";
    let averageStudentPopulation = 0;
    let maxStudentPopulationValue = 0;
    let maxStudentPopulation = "";
    let averageFourYearGraduationRate = 0;
    const programMap = Object.fromEntries(programs.map((v) => [v.id, v]));
    Object.entries(programMap).forEach(([u, v]) => {
      averageFourYearGraduationRate += v.shareOfStudentWhoGraduateIn4Years ?? 0;

      averageStudentPopulation += v.collegeScorecardCohortCount ?? 0;
      if ((v.collegeScorecardCohortCount ?? 0) > maxStudentPopulationValue) {
        maxStudentPopulation = u;
        maxStudentPopulationValue = v.collegeScorecardCohortCount ?? 0;
      }

      averageROI += v.lifetimeReturnOnInvestmentROI ?? 0;
      if ((v.lifetimeReturnOnInvestmentROI ?? 0) > maxROIValue) {
        maxROI = u;
        maxROIValue = v.lifetimeReturnOnInvestmentROI ?? -Infinity;
      }
    });
    averageROI /= programs.length;
    averageStudentPopulation /= programs.length;
    averageFourYearGraduationRate /= programs.length;
    return {
      averageROI,
      averageStudentPopulation,
      averageFourYearGraduationRate,
      maxROI: programMap[maxROI],
      maxStudentPopulation: programMap[maxStudentPopulation],
    };
  }, [programs]);

  return (
    <TableWrapper>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h5">{label}</Typography>
      </Box>
      <Box padding="15px">
        <Typography>AVERAGES:</Typography>
        <Box display="flex">
          <Box margin="0px 10px 10px 10px">
            <Typography color="gray">Lifetime ROI:</Typography>
            <Typography>
              {`$${numberWithCommas(Math.floor(stats.averageROI))}`}
            </Typography>
          </Box>
          <Box margin="0px 10px 10px 10px">
            <Typography color="gray">Students:</Typography>
            <Typography>
              {Math.floor(stats.averageStudentPopulation)}
            </Typography>
          </Box>
          <Box margin="0px 10px 10px 10px">
            <Typography color="gray">OnTime Completion:</Typography>
            <Typography>
              {`${Math.floor(stats.averageFourYearGraduationRate * 100)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box textAlign="center">
          <Typography variant="caption">{`Highest ROI ($${numberWithCommas(
            stats.maxROI.lifetimeReturnOnInvestmentROI
          )})`}</Typography>
          <ListItemWithBorder
            program={stats.maxROI}
            onClick={onClick}
            color={selectedColorMap[stats.maxROI.id]}
          />
        </Box>
        <Box textAlign="center">
          <Typography variant="caption">{`Largest Student Population (${stats.maxStudentPopulation.collegeScorecardCohortCount})`}</Typography>
          <ListItemWithBorder
            program={stats.maxStudentPopulation}
            onClick={onClick}
            color={selectedColorMap[stats.maxStudentPopulation.id]}
          />
        </Box>
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          minWidth="200px"
        >
          <IconButton onClick={handleClickAll}>
            <Add fontSize="large" />
          </IconButton>
          <Typography variant="caption">{`Select all ${programs.length} programs`}</Typography>
        </Box>
      </Box>
    </TableWrapper>
  );
};

export default SummaryCell;
