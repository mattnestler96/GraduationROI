import { ListItemIcon, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import stateMapper from "../../utils/stateMapper";
import { ROI } from "../../models";

interface IProgramListItem {
  color?: string;
  program: ROI;
}

const ProgramListItem = (props: IProgramListItem) => {
  return (
    <>
      <ListItemIcon>
        <Box
          border={!!props.color ? `5px solid ${props.color}` : "none"}
          borderRadius="50%"
          height={30}
          width={30}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!!props.color ? <Close style={{ margin: "auto" }} /> : null}
        </Box>
      </ListItemIcon>
      <Box width="100%">
        <Typography color="primary">{props.program.programName}</Typography>
        <Typography variant="caption">
          {props.program.programCategory}
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="caption">
            {props.program.institutionName}
          </Typography>
          <Typography variant="caption">
            {stateMapper(props.program.state)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProgramListItem;
