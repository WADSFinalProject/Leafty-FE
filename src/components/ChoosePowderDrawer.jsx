import React, { useEffect, useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Checkbox from '@mui/material/Checkbox';
import WidgetContainer from '@components/Cards/WidgetContainer';
import CircularButton from '@components/CircularButton';
import Countdown from '@components/Countdown';
import Button from './Button';
import axios from 'axios';
import PowderLogo from '@assets/Powder.svg';
import ReadyIcon from '@assets/ReadyIcon.svg';
import { API_URL } from '../App';
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
    padding: theme.spacing(2),
    height: '75vh', // Use vh to ensure it takes 75% of the viewport height
    overflowY: 'auto' // Ensure content is scrollable if it overflows
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

function ChoosePowderDrawer(props) {
    const { window, open, toggleDrawer, UserID, onSelectFlour, weight } = props; // Receiving weight as a prop
    const [PowderData, setPowderData] = useState([]);
    const [selectedFlours, setSelectedFlours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/flour/get_by_user/${UserID}`);
                setPowderData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching Powder data:', error);
            }
        };

        fetchData();
    }, [UserID]);

    const handleSelectFlour = (flourID, flourWeight) => {
        const flour = { FlourID: flourID, Flour_Weight: flourWeight };
        setSelectedFlours(prevSelected => {
            if (prevSelected.some(item => item.FlourID === flourID)) {
                return prevSelected.filter(item => item.FlourID !== flourID);
            } else {
                return [...prevSelected, flour];
            }
        });
    };

    const handleConfirmSelection = () => {
        if (selectedFlours.length >= 0) {
            const updatedData = PowderData.map((item) =>
                selectedFlours.some(f => f.FlourID === item.FlourID) ? { ...item, selected: true } : item
            );
            setPowderData(updatedData);
            onSelectFlour(selectedFlours);
            toggleDrawer(false)();
        }
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
            <Root>
                <SwipeableDrawer
                    container={container}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)} // Pass false to close the drawer
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox>
                        <Puller />
                        <div className='flex flex-col gap-2'>
                            <span className='font-bold text-2xl'>Choose Powder</span>
                            {PowderData.length > 0 ? (
                                PowderData.map((item) => (
                                    <div key={item.FlourID} className='flex justify-between'> {/* Corrected key prop */}
                                        <WidgetContainer container = {false} borderRadius="10px" className="w-full flex items-center ">
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                checked={selectedFlours.some(f => f.FlourID === item.FlourID)}
                                                onChange={() => handleSelectFlour(item.FlourID, item.Flour_Weight)}
                                            />
                                            <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                                            <div className='flex flex-col ml-3'>
                                                <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                                                    {item.Flour_Weight} Kg
                                                </span>
                                                <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                                                    P01{item.FlourID}
                                                </span>
                                            </div>
                                            <div className="flex ml-auto items-center">
                                                <Countdown time={item.Expiration} color={"#C0CD30"} image={ReadyIcon} />
                                                {/* <Button onClick={() => handleSelectFlour(item.FlourID, item.Flour_Weight)}>Select</Button> */}
                                            </div>
                                        </WidgetContainer>
                                    </div>
                                ))
                            ) : (
                                <span className='text-md'>No Powder Found</span>
                            )}
                        </div>
                        <Button
                            className={"mt-2 flex w-full justify-center items-center"}
                            noMax={true}
                            label={"Confirm"}
                            color={"white"}
                            background={"#0F7275"}
                            onClick={handleConfirmSelection}
                        />
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
        </ThemeProvider>
    );
}

export default ChoosePowderDrawer;
