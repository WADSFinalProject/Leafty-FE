import React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputData from './InputData';
import "./Drawer.css";

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'transparent',
  zIndex: 1,
  borderRadius: '30px'
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '30px',
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.divider,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F7275', // Green color
    },
  },
});

function Drawer(props) {
  const { WetLeaves, DryLeaves, Flour, Shipment, UserID, window, firstText, secondText, thirdText, fourthText, firstImgSrc, secondImgSrc, thirdImgSrc, showThirdInput, includeFourthSection, inputData } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleSelectFlour = (flourID) => {
    // Handle the selected flour ID here, if needed.
    console.log("Selected flour ID in Drawer component:", flourID);
  };

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Fab
          color="primary" // Ensure it uses the primary color from the theme
          aria-label="add"
          style={{ position: 'fixed', bottom: '75px', right: '16px', zIndex: '1000' }}
          onClick={toggleDrawer(true)}
        >
          <AddIcon />
        </Fab>
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox>
            <InputData
              UserID={UserID}
              firstp={firstText}
              secondp={secondText}
              thirdp={thirdText}
              fourthp={fourthText}
              firstimg={firstImgSrc}
              secondimg={secondImgSrc}
              showThirdInput={showThirdInput}
              thirdimg={thirdImgSrc}
              includeFourthSection={includeFourthSection}
              WetLeaves={WetLeaves}
              DryLeaves={DryLeaves}
              Flour={Flour}
              Shipment={Shipment}
            />
          </StyledBox>
          <Puller />
        </SwipeableDrawer>
      </Root>
    </ThemeProvider>
  );
}

export default Drawer;

