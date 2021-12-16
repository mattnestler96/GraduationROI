import { Hidden, Button, IconButton } from "@mui/material";
import Help from '@mui/icons-material/Help';

const LearnMoreButton = () => {
  const handleClick = () => {
    window.open(
      "https://freopp.org/how-we-calculated-the-return-on-investment-of-a-college-degree-e93bce69f9c7",
      "_blank"
    );
  };
  return (
    <>
      <Hidden smDown>
        <Button
          style={{ marginRight: 10 }}
          variant="outlined"
          onClick={handleClick}
        >
          Learn More
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          onClick={handleClick}
        >
          <Help/>
        </IconButton>
      </Hidden>
    </>
  );
};

export default LearnMoreButton;
