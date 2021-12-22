import {
    createTheme,
    createStyles,
} from '@mui/material';
import {
    COLOR_ACTIVE_LEVEL,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    PRIMARY_COLOR_LIGHT,
    SECONDARY_COLOR,
    SECONDARY_COLOR_DARK,
    SECONDARY_COLOR_LIGHT,
    SECONDARY_TEXT_COLOR,
} from './constants';
import Color from 'color';

const createMuiTheme = () => {
    return createTheme({
        palette: {
            primary: {
                main: PRIMARY_COLOR,
                light: PRIMARY_COLOR_LIGHT,
                dark: PRIMARY_COLOR_DARK,
            },
            secondary: {
                main: SECONDARY_COLOR,
                light: SECONDARY_COLOR_LIGHT,
                dark: SECONDARY_COLOR_DARK,
                contrastText: SECONDARY_TEXT_COLOR,
            },
        },
        typography: {
            fontSize: 12,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    disableFocusRipple: true,
                    disableRipple: true,
                    disableTouchRipple: true,
                },
                variants: [
                    {
                        props: {
                            variant: 'contained',
                        },
                        style: createStyles({
                            backgroundColor: PRIMARY_COLOR,
                            '&:hover': {
                                backgroundColor: PRIMARY_COLOR_DARK,
                            },
                            '&:active': {
                                backgroundColor: Color(PRIMARY_COLOR).darken(COLOR_ACTIVE_LEVEL).toString(),
                            },
                        }),
                    },
                ],
            },
        },
        transitions: {
            duration: {
                shortest: 0,
                shorter: 0,
                short: 0,
                standard: 0,
                complex: 0,
                enteringScreen: 0,
                leavingScreen: 0,
            },
        },
    });
};

export default createMuiTheme();
