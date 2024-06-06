import React from 'react';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Date from '../assets/Date.svg';
import WeightLogo from '../assets/Weight.svg';
import PackageCount from '../assets/Packagecount.svg';
import InputData from './InputData';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'transparent',
  zIndex: 1,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '30px',
  border: '2px solid red',
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

function Drawer(props, openDrawer = false) {
  const { window } = props;
  const [open, setOpen] = React.useState(openDrawer);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
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
          <InputData
            firstp={firstText}
            secondp={secondText}
            thirdp={thirdText}
            fourthp={fourthText}
            firstimg={firstImgSrc}
            secondimg={secondImgSrc}
            showThirdInput={showThirdInput}
            thirdimg={thirdImgSrc}
            includeFourthSection={includeFourthSection}
          />
        </StyledBox>
        {/* Puller */}
        <Puller />
      </SwipeableDrawer>
    </Root>
  );
}

export default Drawer;

