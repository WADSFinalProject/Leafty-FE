import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceiptContainer from '../components/Cards/ReceiptContainer';

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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Centra" />
                    <Tab label="Harbor" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} className='m-0'>
                <div className='flex flex-row gap-4 flex-wrap my-2'>
                    {reception_data.map((value, index) => (
                        <ReceiptContainer key={index} value={value} />
                    ))}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className='flex flex-row gap-4 flex-wrap my-2'>
                    {reception_data.map((value, index) => (
                        <ReceiptContainer key={index} value={value} />
                    ))}
                </div>
            </CustomTabPanel>
        </Box>
    );
}

export default Reception;