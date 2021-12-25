import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import AlarmIcon from '@mui/icons-material/Alarm';
import theme from '../src';
import './App.css';

import HorizontalTabs from './components/Tabs/Horizontal';
import VerticalTabs from './components/Tabs/Vertical';
import BasicDatePicker from './components/DatePickers/Basic';
import DatePicker from './components/DatePickers/DatePicker';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst={true}>
                <div style={{ padding: 10 }}>
                    <h3>Buttons</h3>
                    <Button variant="contained">Contained</Button>&nbsp;
                    <Button variant="outlined">Outlined</Button>&nbsp;
                    <Button variant="text">Text</Button>
                    <br />
                    <br />
                    <Button disabled={true} variant="contained">Contained</Button>&nbsp;
                    <Button disabled={true} variant="outlined">Outlined</Button>&nbsp;
                    <Button disabled={true} variant="text">Text</Button>
                    <br /><br />
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup variant="text" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <br /><br />
                    <ButtonGroup disabled={true} variant="contained" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup disabled={true} variant="outlined" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>&nbsp;
                    <ButtonGroup disabled={true} variant="text" aria-label="outlined primary button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                    <br /><br />
                    <IconButton>
                        <AlarmIcon />
                    </IconButton>&nbsp;
                    <IconButton disabled={true}>
                        <AlarmIcon />
                    </IconButton>
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Tabs</h3>
                    <HorizontalTabs />
                    <VerticalTabs />
                </div>
                <div style={{ padding: 10 }}>
                    <h3>Date Pickers</h3>
                    <BasicDatePicker />
                    <br /><br />
                    <DatePicker />
                </div>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default App;
