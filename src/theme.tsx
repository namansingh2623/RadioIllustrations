import { createTheme, darken, lighten } from '@mui/material/styles';

const black = '#000000';
const white = '#ffffff';

const theme = createTheme({
    palette: {
        // Defines the overall mode for the theme.
        // 'light' sets the default background to white and text to black.
        mode: 'light',

        // Customize the primary color for interactive components like buttons.
        primary: {
            // The main color for primary buttons (black).
            main: black,
            // The text color on primary components (white).
            contrastText: white,
            // You can also define light and dark variants if needed, but for a solid black button,
            // the main color is often sufficient.
            light: lighten(black, 0.2),
            dark: darken(black, 0.2),
        },

        // Customize the color for the background and other surfaces.
        background: {
            default: white, // Sets the main page background to white
            paper: white,   // Sets the background for paper components (e.g., Cards) to white
        },

        // Customize the color for text.
        text: {
            primary: black,   // Main text color
            secondary: '#444444', // Secondary, slightly lighter text color
            disabled: '#aaaaaa',  // Color for disabled text
        },

        // Other color intentions can be customized as well.
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#ED6C02',
        },
        info: {
            main: '#0288D1',
        },
        success: {
            main: '#2E7D32',
        },
    },

    // Customize the appearance of specific components.
    components: {
        MuiButton: {
            styleOverrides: {
                // Override styles for the root of the button component.
                root: {
                    // Set text color for contained buttons.
                    // This ensures that the button text remains white even if the button type is changed.
                    color: black,
                },
            },
            // Define variations for different button types.
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        // Background color for a contained button.
                        backgroundColor: black,
                        '&:hover': {
                            backgroundColor: lighten(black, 0.2), // Lighter black on hover
                        },
                    },
                },
            ],
        },
    },
});

export default theme;