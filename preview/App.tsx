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
                <Button>Basic Button</Button>&nbsp;
                <Button variant="contained">Contained Button</Button>&nbsp;
                <Button variant="outlined">Outlined Button</Button>&nbsp;
                <Button variant="text">Text Button</Button>
            </div>
        </ThemeProvider>
    );
};

export default App;
