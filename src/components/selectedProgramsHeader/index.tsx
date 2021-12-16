import { Typography, Paper, Box } from "@mui/material";
import { ROI } from "../../models";
import { uniqueId } from "../../utils/dataHelpers";
import randomColors from "../../utils/randomColors";
import ListItemWithBorder from "../programListItem/listItemWithBorder";

interface ISelectedProgramsHeader {
  selectedPrograms: ROI[];
  onChange: (v: ROI[]) => void;
}

const SelectedProgramsHeader = (props: ISelectedProgramsHeader) => {
  const handleItemClick = (v: ROI) => {
    props.onChange(props.selectedPrograms.filter((p) => p.id !== v.id));
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
          {props.selectedPrograms.length === 0 ? (
            <Box
              display="flex"
              height="100%"
              alignItems="center"
              justifyContent="center"
              margin="auto"
            >
              <Typography color="GrayText" variant="caption">
                Nothing selected, start selecting items on the left to see data.
              </Typography>
            </Box>
          ) : (
            props.selectedPrograms.map((p, k) => (
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
