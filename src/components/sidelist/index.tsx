import React from "react";
import Typography from "@mui/material/Typography";
import { ROI } from "../../models";
import { Box, Button, List, ListItemButton, ListItemIcon } from "@mui/material";
import stateMapper from "../../utils/stateMapper";

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
        {props.items.slice(0, limit).map((v) => (
          <ListItemButton key={v.id} onClick={handleItemClick(v)}>
            <ListItemIcon>
              <Box
                border={
                  selectedProgramIds.includes(v.id) ? "2px solid blue" : "none"
                }
                borderRadius="50%"
                height={30}
                width={30}
                textAlign="center"
              >
                <Typography color="inherit">
                  {selectedProgramIds.includes(v.id) ? "Y" : "N"}
                </Typography>
              </Box>
            </ListItemIcon>
            <Box width="100%">
              <Typography color="primary">{v.programName}</Typography>
              <Typography variant="caption">{v.programCategory}</Typography>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="caption">{v.institutionName}</Typography>
                <Typography variant="caption">
                  {stateMapper(v.state)}
                </Typography>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
      <Button onClick={handleLoadMore}>Load More</Button>
    </>
  );
};

export default SideList;
