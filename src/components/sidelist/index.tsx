import React from "react";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import { ROI } from "../../models";
import { Box, Button, List, ListItemButton, ListItemIcon } from "@mui/material";
import stateMapper from "../../utils/stateMapper";
import randomColors from "../../utils/randomColors";
import GoogleAds from "../googleAd";

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
        {props.items.slice(0, limit).map((v) => {
          const selectedIndex = selectedProgramIds.findIndex((p) => p === v.id);
          const selected = selectedIndex > -1;
          return (
            <ListItemButton key={v.id} onClick={handleItemClick(v)}>
              <ListItemIcon>
                <Box
                  border={
                    selected
                      ? `5px solid ${randomColors[selectedIndex]}`
                      : "none"
                  }
                  borderRadius="50%"
                  height={30}
                  width={30}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {selected ? <Close style={{ margin: "auto" }} /> : null}
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
