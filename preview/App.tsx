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
            <Button>Basic Button</Button>
            <Button variant="contained">Contained Button</Button>
        </ThemeProvider>
    );
};

export default App;
