import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import createStyles from '@mui/material/styles/createStyles';
import IconButton from '@mui/material/IconButton';
import DateTimePickerToolbar from '@mui/lab/DateTimePicker/DateTimePickerToolbar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
    TAB_ACTIVE_SHADOW_COLOR,
} from './constants';
import Color from 'color';
import '@mui/lab/themeAugmentation';

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
            MuiButtonBase: {
                defaultProps: {
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
                    ScrollButtonComponent: (props) => React.createElement(
                        IconButton,
                        {
                            ...props,
                            style: {
                                padding: 0,
                            },
                        },
                        props.direction === 'left'
                            ? props.orientation === 'horizontal'
                                ? React.createElement(KeyboardArrowLeftIcon)
                                : React.createElement(KeyboardArrowUpIcon)
                            : props.orientation === 'horizontal'
                                ? React.createElement(KeyboardArrowRightIcon)
                                : React.createElement(KeyboardArrowDownIcon),
                    ),
                },
                styleOverrides: {
                    root: {
                        minHeight: 24,
                        borderRadius: 4,
                        padding: 2,
                        backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                            .darken(COLOR_CHANGE_LEVEL)
                            .toString(),
                        alignItems: 'center',
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
                        minHeight: 24,
                        padding: 4,
                        backgroundColor: 'transparent',
                        '&:hover': {
                            color: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                .darken(2)
                                .toString(),
                        },
                        '&.Mui-selected': {
                            borderRadius: 4,
                            color: Color(BUTTON_DEFAULT_TEXT_COLOR)
                                .alpha(1)
                                .toString(),
                            backgroundColor: 'white',
                            boxShadow: `${TAB_ACTIVE_SHADOW_COLOR} 0px 2px 10px`,
                        },
                    },
                },
            },
            MuiDateTimePicker: {
                defaultProps: {
                    ToolbarComponent: (props) => {
                        return React.createElement(
                            'div',
                            {
                                style: {
                                    padding: 10,
                                    fontSize: 9,
                                    position: 'relative',
                                },
                            },
                            [
                                React.createElement(DateTimePickerToolbar, {
                                    ...props,
                                    key: 'date-time-picker-toolbar',
                                }),
                            ],
                        );
                    },
                },
            },
            MuiYearPicker: {
                defaultProps: {
                },
                styleOverrides: {
                    root: {
                        '.PrivatePickersYear-root': {
                            '& > button': {
                                borderRadius: 4,
                            },
                        },
                    },
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                    },
                    today: {
                        border: '0 !important',
                        backgroundColor: BUTTON_DEFAULT_BACKGROUND_COLOR,
                    },
                },
            },
            MuiClockPicker: {
                styleOverrides: {
                    arrowSwitcher: {
                        position: 'initial',
                        padding: '0 10px',
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
