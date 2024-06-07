import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CircularButton from '../../components/CircularButton';
import Plus from '../../assets/Plus.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Drawer from '../../components/Drawer';
import PackageCount from "@assets/PackageBox.svg";
import Date from "@assets/Date.svg";
import WeightLogo from "@assets/Weight.svg";

const theme = createTheme({
    palette: {
        primary: {
            main: '#0F7275', // Green color
        },
    },
});

const BoldTab = styled(Tab)({
    fontWeight: '600',
    fontSize: '20px',
    textTransform: 'capitalize',
    fontFamily: 'montserrat',
    flex: 1
});

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function Shipment() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <BoldTab label="Orders" component={Link} to="ShipmentOrder" />
                        <BoldTab label="Sent" component={Link} to="ShipmentSent" />
                        <BoldTab label="Completed" component={Link} to="ShipmentCompleted" />
                    </Tabs>
                </Box>
                <Outlet />
            </Box>

            <div className="flex justify-end mt-4">
                <Link to="/wetleavesdetail">
                    <CircularButton imageUrl={Plus} backgroundColor="#94C3B3" />
                </Link>
            </div>


            <Drawer includeFourthSection={true} showThirdInput={true} firstText="Total Packages" secondText="Schedule Deliver" thirdText="Powder ID" fourthText="Total weight" firstImgSrc={PackageCount} secondImgSrc={Date} thirdImgSrc={WeightLogo} />

        </ThemeProvider>
    );
}

export default Shipment;
