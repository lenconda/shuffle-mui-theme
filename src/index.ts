import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import createStyles from '@mui/material/styles/createStyles';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
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
    ICON_BUTTON_HOVER_BG_COLOR,
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
            MuiIconButton: {
                defaultProps: {
                    disableFocusRipple: true,
                    disableRipple: true,
                    disableTouchRipple: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                        padding: 5,
                        '&:hover': {
                            backgroundColor: ICON_BUTTON_HOVER_BG_COLOR,
                        },
                        '&:active': {
                            backgroundColor: Color(ICON_BUTTON_HOVER_BG_COLOR).darken(2).toString(),
                        },
                    },
                },
            },
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
            MuiButtonGroup: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    groupedText: {
                        '&:not(:last-of-type)': {
                            borderRight: 0,
                        },
                    },
                    groupedOutlined: {
                        '&:not(:last-of-type):hover': {
                            borderColor: OUTLINED_BUTTON_BORDER_HOVER_COLOR,
                        },
                    },
                },
            },
            MuiTabs: {
                defaultProps: {
                    TabIndicatorProps: {
                        style: createStyles({
                            display: 'none',
                        }),
                    },
                    textColor: 'inherit',
                    ScrollButtonComponent: () => React.createElement(
                        IconButton,
                        null,
                        React.createElement(AlarmIcon),
                    ),
                },
                styleOverrides: {
                    root: {
                        minHeight: 32,
                        borderRadius: 4,
                        'button:last-child': {
                            borderRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                        },
                        'button:first-child': {
                            borderRadius: 0,
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                        },
                    },
                    vertical: {
                        'button:last-child': {
                            borderRadius: 0,
                            borderBottomRightRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomLeftRadius: 4,
                        },
                        'button:first-child': {
                            borderRadius: 0,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            borderBottomLeftRadius: 0,
                        },
                    },
                    scroller: {
                        borderRadius: 4,
                    },
                },
            },
            MuiTab: {
                defaultProps: {
                    disableRipple: true,
                    disableFocusRipple: true,
                    disableTouchRipple: true,
                },
                styleOverrides: {
                    root: {
                        minHeight: 32,
                        backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                            .darken(COLOR_CHANGE_LEVEL)
                            .toString(),
                    },
                },
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
