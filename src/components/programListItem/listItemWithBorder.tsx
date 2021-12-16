import { ListItemButton, Box } from "@mui/material";
import ProgramListItem from ".";
import { ROI } from "../../models";

interface IListItemWithBorder {
  program: ROI;
  onClick: (p: ROI) => void;
  color?: string;
}

const ListItemWithBorder = (props: IListItemWithBorder) => {
  const { program, onClick, color } = props;
  return (
    <ListItemButton
      onClick={(e) => onClick(program)}
      style={{
        minWidth: "317px",
        width: "317px",
        maxWidth: "317px",
        border: "1px solid #bbb",
        borderRadius: "10px",
        margin: "5px",
      }}
    >
      <Box width="100%" height="100px" display="flex" alignItems="center">
        <ProgramListItem color={color} program={program} />
      </Box>
    </ListItemButton>
  );
};

export default ListItemWithBorder;
