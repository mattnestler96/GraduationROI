import { Typography, Paper, Box } from "@mui/material";
import { useContext } from "react";
import { Programs } from "../../contexts/programs";
import { ROI } from "../../models";
import { uniqueId } from "../../utils/dataHelpers";
import randomColors from "../../utils/randomColors";
import ListItemWithBorder from "../programListItem/listItemWithBorder";

const SelectedProgramsHeader = () => {
  const {selectedPrograms, handleSelectedProgramChange} = useContext(Programs);
  const handleItemClick = (v: ROI) => {
    handleSelectedProgramChange(selectedPrograms.filter((p) => p.id !== v.id));
  };
  return (
    <Box marginTop="10px" marginBottom="10px">
      <Paper>
        <Box
          minHeight="105px"
          display="flex"
          alignItems="center"
          overflow="scroll"
        >
          {selectedPrograms.length === 0 ? (
            <Box
              display="flex"
              height="100%"
              alignItems="center"
              justifyContent="center"
              margin="auto"
            >
              <Typography color="GrayText" variant="caption">
                Nothing selected, start by selecting programs.
              </Typography>
            </Box>
          ) : (
            selectedPrograms.map((p, k) => (
              <ListItemWithBorder
                key={`${uniqueId(p)}_selectedHeader`}
                onClick={handleItemClick}
                color={randomColors[k]}
                program={p}
              />
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectedProgramsHeader;
