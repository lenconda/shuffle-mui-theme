import React from 'react';
import {
    Button,
    ThemeProvider,
} from '@mui/material';
import theme from '../src';
import './App.css';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: 10 }}>
                <h3>Buttons</h3>
                <Button>Basic</Button>&nbsp;
                <Button variant="contained">Contained</Button>&nbsp;
                <Button variant="outlined">Outlined</Button>&nbsp;
                <Button variant="text">Text</Button>
                <br />
                <br />
                <Button disabled={true}>Basic Disabled</Button>&nbsp;
                <Button disabled={true} variant="contained">Contained Disabled</Button>&nbsp;
                <Button disabled={true} variant="outlined">Outlined Disabled</Button>&nbsp;
                <Button disabled={true} variant="text">Text Disabled</Button>
            </div>
        </ThemeProvider>
    );
};

export default App;
