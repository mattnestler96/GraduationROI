import { Typography, Paper, Box, ListItemButton } from "@mui/material";
import { ROI } from "../../models";
import randomColors from "../../utils/randomColors";
import ProgramListItem from "../programListItem";

interface ISelectedProgramsHeader {
  selectedPrograms: ROI[];
  onChange: (v: ROI[]) => void;
}

const SelectedProgramsHeader = (props: ISelectedProgramsHeader) => {
  const handleItemClick = (v: ROI) => () => {
    props.onChange(props.selectedPrograms.filter((p) => p.id !== v.id));
  };
  return (
    <Box marginTop="10px" marginBottom="10px">
      <Paper>
        <Box
          minHeight="105px"
          display="flex"
          alignItems="center"
          maxWidth="100%"
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
            props.selectedPrograms.map((p, k) => {
              return (
                <ListItemButton
                  onClick={handleItemClick(p)}
                  style={{
                    minWidth: "317px",
                    width: "317px",
                    maxWidth: "317px",
                    border: "1px solid #bbb",
                    borderRadius: "10px",
                    margin: "5px",
                  }}
                >
                  <Box
                    width="100%"
                    height="100px"
                    display="flex"
                    alignItems="center"
                  >
                    <ProgramListItem color={randomColors[k]} program={p} />
                  </Box>
                </ListItemButton>
              );
            })
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectedProgramsHeader;
