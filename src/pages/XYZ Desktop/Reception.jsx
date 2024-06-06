import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useLocation, Link, Outlet } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0F7275', // Green color
        },
    },
});

const BoldTab = styled(Tab)({
    fontWeight: 'bold',
    fontSize: '20px',
    textTransform: 'capitalize',
    fontFamily: 'montserrat'
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
                    <Typography>{children}</Typography>
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

const reception_data = Array(11).fill({ items: "a" });

function Reception() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname === '/harbor' ? 1 : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <BoldTab label="Centra" component={Link} to="centra" />
                        <BoldTab label="Harbor" component={Link} to="harbor" />
                    </Tabs>
                </Box>
                <Outlet />
            </Box>
        </ThemeProvider>
    );
}

export default Reception;
