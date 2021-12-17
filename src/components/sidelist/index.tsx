import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { ROI } from "../../models";
import { Box, Button, List, ListItemButton } from "@mui/material";
import randomColors from "../../utils/randomColors";
import Search from "@mui/icons-material/SearchOutlined";
import ProgramListItem from "../programListItem";
import { handleAddViewHistory } from "../../utils/userSearchTracking";
import { Programs } from "../../contexts/programs";

const EmptyState = () => {
  return (
    <Box
      padding="40px"
      paddingTop="10px"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Search fontSize="large" color="action" />
      <Box marginLeft="12px">
        <Box>
          <Typography color="textSecondary" variant="caption">
            Woops! We didn't find any degrees.
          </Typography>
        </Box>
        <Box>
          <Typography color="textSecondary" variant="caption">
            Try a new search.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
interface ISideList {
  filteredPrograms: ROI[];
}

const SideList = (props: ISideList) => {
  const { selectedPrograms, handleSelectedProgramChange } =
    useContext(Programs);
  const [limit, setLimit] = React.useState(10);

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };

  const selectedProgramIds = React.useMemo(
    () => selectedPrograms?.map((v) => v.id) || [],
    [selectedPrograms]
  );

  const handleRemoveItemFromView = (v: ROI) => {
    handleSelectedProgramChange(selectedPrograms.filter((p) => p.id !== v.id));
  };

  const handleAddItemFromView = (v: ROI) => {
    handleAddViewHistory(v);
    handleSelectedProgramChange([...selectedPrograms, v]);
  };

  const handleItemClick = (v: ROI) => () => {
    if (selectedProgramIds.includes(v.id)) {
      handleRemoveItemFromView(v);
    } else {
      handleAddItemFromView(v);
    }
  };

  return (
    <>
      <List>
        {props.filteredPrograms.length === 0 ? <EmptyState /> : null}
        {props.filteredPrograms.slice(0, limit).map((v) => {
          const selectedIndex = selectedProgramIds.findIndex((p) => p === v.id);
          const selected = selectedIndex > -1;
          return (
            <ListItemButton key={v.id} onClick={handleItemClick(v)}>
              <ProgramListItem
                color={selected ? randomColors[selectedIndex] : undefined}
                program={v}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Button onClick={handleLoadMore} style={{ marginBottom: 30 }}>
        Load More
      </Button>
    </>
  );
};

export default SideList;
