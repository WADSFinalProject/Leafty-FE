import React, { useEffect, useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Checkbox from '@mui/material/Checkbox';
import WidgetContainer from '@components/Cards/WidgetContainer';
import CircularButton from '@components/CircularButton';
import Countdown from '@components/Countdown';
import Button from './Button';
import { Link } from 'react-router-dom';
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

function ChoosePowderDrawer(props) {
    const { window, open, toggleDrawer, UserID } = props;
    const [PowderData, setPowderData] = useState([]);

    const data = [
        { time: 'Ready ', color: '#C0CD30', image: ReadyIcon, weight: '20 Kg', code: 'W563210' },
        { time: 'Ready ', color: '#C0CD30', image: ReadyIcon, weight: '30 Kg', code: 'W553210' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL + `/powder/get_by_user/${UserID}`);
                setPowderData(response.data);
            } catch (error) {
                console.error('Error fetching Powder data:', error);
            }
        };

        fetchData();
    }, [UserID]);

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
                            {PowderData ? (
                                data.map((item) => (
                                    <div key={item.code} className='flex justify-between'>
                                        <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
                                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}></Checkbox>
                                            <Link to={`/centra/powderdetail/${item.code}/${item.weight}`}>
                                                <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                                            </Link>

                                            <div className='flex flex-col ml-3'>
                                                <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                                                    {item.weight}
                                                </span>
                                                <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                                                    {item.code}
                                                </span>
                                            </div>
                                            <div className="flex ml-auto items-center">
                                                <Countdown time={item.time} color={item.color} image={item.image} />
                                            </div>
                                        </WidgetContainer>
                                    </div>
                                ))
                            ) : (
                                <span className='text-md'>No Powder Found</span>
                            )}
                        </div>
                        <Button className={"mt-2 flex w-full justify-center items-center"} noMax={true} label={"Confirm"} color={"white"} background={"#0F7275"} />
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
        </ThemeProvider>
    );
}

export default ChoosePowderDrawer;
