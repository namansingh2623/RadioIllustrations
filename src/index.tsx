import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from "./Routes/Router";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme file

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    </React.StrictMode>
);
