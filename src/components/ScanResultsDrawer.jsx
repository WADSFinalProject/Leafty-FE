import React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
  padding: theme.spacing(2)
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
      main: '#0F7275',
    },
  },
});

function ScanResultsDrawer(props) {
  const { window, open, toggleDrawer, data } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Fab
          color="primary"
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
            <Puller />
            <div>{data}</div>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </ThemeProvider>
  );
}

export default ScanResultsDrawer;
