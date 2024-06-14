import React, { useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
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
            main: '#0F7275',
        },
    },
});

const BoldTab = styled(Tab)({
    fontWeight: '600',
    fontSize: '15px',
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
    const UserID = useOutletContext();
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
                <CustomTabPanel value={value} index={0}>
                    {/* Display Orders Tab Content */}
                    <Outlet context={UserID} />
                </CustomTabPanel>
            </Box>

            <Drawer 
                UserID={UserID} 
                Shipment={true} 
                includeFourthSection={true} 
                showThirdInput={true} 
                firstText="Schedule Deliver" 
                secondText="Total Packages" 
                thirdText="Powder ID" 
                fourthText="Total weight" 
                firstImgSrc={Date} 
                secondImgSrc={PackageCount} 
                thirdImgSrc={WeightLogo} 
            />
        </ThemeProvider>
    );
}

export default Shipment;
