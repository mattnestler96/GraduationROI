import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { Programs } from "../../../contexts/programs";
import SelectedProgramsHeader from "../../selectedProgramsHeader";

const monthlyPaymentCalc = (r: number, n: number, p?: number) => {
  const z = Math.pow(1 + r, n);
  console.log(p ?? 0, r, z);
  return (p ?? 0) * r * (z / (z - 1));
};

const SummaryTab = () => {
  const { selectedPrograms } = useContext(Programs);

  return (
    <>
      <SelectedProgramsHeader />
      {selectedPrograms.map((program) => (
        <Box key={program.uniqueId} margin="20px">
          <Typography>{program.estimatedEarnings26}</Typography>
          <Typography>{program.fourYearEducationRelatedSpending}</Typography>
          <Typography>
            {((program.estimatedEarnings26 ?? 0) / 24) * 0.7}
          </Typography>
          <Typography>
            {monthlyPaymentCalc(
              0.04,
              120,
              program.fourYearEducationRelatedSpending
            )}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default SummaryTab;
