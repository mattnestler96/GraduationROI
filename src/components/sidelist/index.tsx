import React from "react";
import Typography from "@mui/material/Typography";
import { ROI } from "../../models";
import { Box, Button, List, ListItemButton } from "@mui/material";
import randomColors from "../../utils/randomColors";
import GoogleAds from "../googleAd";
import ArrowUp from "@mui/icons-material/ArrowCircleUp";
import ProgramListItem from "../programListItem";

const EmptyState = () => {
  return (
    <Box
      padding="40px"
      paddingTop="10px"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <ArrowUp fontSize="large" color="action" />
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
  items: ROI[];
  selectedPrograms: ROI[];
  onChange: (v: ROI[]) => void;
}

const SideList = (props: ISideList) => {
  const [limit, setLimit] = React.useState(10);

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };

  const selectedProgramIds = React.useMemo(
    () => props.selectedPrograms?.map((v) => v.id) || [],
    [props.selectedPrograms]
  );

  const handleItemClick = (v: ROI) => () => {
    if (selectedProgramIds.includes(v.id)) {
      props.onChange(props.selectedPrograms.filter((p) => p.id !== v.id));
    } else {
      props.onChange([...props.selectedPrograms, v]);
    }
  };

  return (
    <>
      <List>
        {props.items.length === 0 ? <EmptyState /> : null}
        {props.items.slice(0, limit).map((v) => {
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
      <GoogleAds slot="1040489084" />
      <Button onClick={handleLoadMore} style={{ marginBottom: 30 }}>
        Load More
      </Button>
    </>
  );
};

export default SideList;
