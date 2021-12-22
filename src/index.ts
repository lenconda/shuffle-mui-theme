import {
    createTheme,
    createStyles,
} from '@mui/material';
import {
    BUTTON_DEFAULT_BACKGROUND_COLOR,
    BUTTON_DEFAULT_TEXT_COLOR,
    COLOR_ACTIVE_LEVEL,
    COLOR_CHANGE_LEVEL,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    PRIMARY_COLOR_LIGHT,
    SECONDARY_COLOR,
    SECONDARY_COLOR_DARK,
    SECONDARY_COLOR_LIGHT,
    SECONDARY_TEXT_COLOR,
    OUTLINED_BUTTON_BORDER_COLOR,
    OUTLINED_BUTTON_BORDER_HOVER_COLOR,
    OUTLINED_BUTTON_ACTIVE_SHADOW_COLOR,
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
            button: {
                textTransform: 'none',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    disableFocusRipple: true,
                    disableRipple: true,
                    disableTouchRipple: true,
                },
                styleOverrides: createStyles({
                    backgroundColor: 'white',
                }),
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
                    {
                        props: {
                            variant: 'text',
                        },
                        style: createStyles({
                            color: BUTTON_DEFAULT_TEXT_COLOR,
                            backgroundColor: BUTTON_DEFAULT_BACKGROUND_COLOR,
                            '&:hover': {
                                backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                    .darken(COLOR_CHANGE_LEVEL)
                                    .toString(),
                            },
                            '&:active': {
                                backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                    .darken(COLOR_ACTIVE_LEVEL)
                                    .toString(),
                            },
                        }),
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: createStyles({
                            borderColor: OUTLINED_BUTTON_BORDER_COLOR,
                            color: BUTTON_DEFAULT_TEXT_COLOR,
                            '&:hover': {
                                borderColor: OUTLINED_BUTTON_BORDER_HOVER_COLOR,
                                backgroundColor: 'white',
                                color: Color(BUTTON_DEFAULT_TEXT_COLOR).alpha(0.8).toString(),
                            },
                            '&:active': {
                                boxShadow: `0 1px 6px 0 ${OUTLINED_BUTTON_ACTIVE_SHADOW_COLOR} inset`,
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
