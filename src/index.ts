import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import createStyles from '@mui/material/styles/createStyles';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import DateTimePickerToolbar from '@mui/lab/DateTimePicker/DateTimePickerToolbar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBoxTwoTone';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
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
    BORDER_COLOR,
    POPUPS_BG_COLOR,
    POPUPS_TEXT_COLOR,
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
                        color: BUTTON_DEFAULT_TEXT_COLOR,
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
                        backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR).toString(),
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
                    TransitionComponent: React.forwardRef((props: any, ref) => {
                        return React.createElement(Fade, {
                            ref,
                            ...props,
                            timeout: 0,
                        });
                    }),
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
                                    timeIcon: React.createElement(ScheduleTwoToneIcon, {
                                        fontSize: 'small',
                                    }),
                                    dateRangeIcon: React.createElement(DateRangeTwoToneIcon, {
                                        fontSize: 'small',
                                    }),
                                }),
                            ],
                        );
                    },
                    components: {
                        OpenPickerIcon: () => React.createElement(CalendarTodayTwoTone),
                    },
                },
            },
            MuiYearPicker: {
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
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            border: 0,
                            '&:focus': {
                                borderColor: 'transparent',
                                outline: 0,
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderWidth: 1,
                                '& > legend > span': {
                                    display: 'none',
                                },
                            },
                        },
                        '& input': {
                            border: `1px solid ${SECONDARY_COLOR}`,
                            '&:hover': {
                                borderColor: Color(SECONDARY_COLOR).darken(0.05).toString(),
                            },
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        display: 'none',
                        '&.Mui-focused': {
                            display: 'none',
                        },
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        '& > fieldset': {
                            display: 'none',
                        },
                    },
                    sizeSmall: {
                        '& input': {
                            paddingTop: 6,
                            paddingBottom: 6,
                            fontSize: '0.5rem',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        border: `1px solid ${BORDER_COLOR}`,

                        '&.Mui-focused': {
                            borderColor: PRIMARY_COLOR,
                        },

                        '&.Mui-disabled': {
                            borderColor: Color(BORDER_COLOR).alpha(0.15).toString(),
                        },

                        '&:not(.Mui-disabled):not(.Mui-focused):hover': {
                            borderColor: Color(BORDER_COLOR).alpha(0.5).toString(),
                        },
                    },
                    input: {
                        padding: 10,
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        backgroundColor: 'transparent',
                        color: Color(BUTTON_DEFAULT_TEXT_COLOR).alpha(0.4).toString(),
                        '&:hover': {
                            color: PRIMARY_COLOR,
                            backgroundColor: 'transparent',
                        },
                        '&:active': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
                defaultProps: {
                    checkedIcon: React.createElement(CheckBoxTwoToneIcon),
                    indeterminateIcon: React.createElement(IndeterminateCheckBoxIcon),
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        backgroundColor: 'transparent',
                        color: Color(BUTTON_DEFAULT_TEXT_COLOR).alpha(0.4).toString(),
                        '&:hover': {
                            color: PRIMARY_COLOR,
                            backgroundColor: 'transparent',
                        },
                        '&:active': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
                defaultProps: {
                    checkedIcon: React.createElement(CircleTwoToneIcon),
                },
            },
            MuiCollapse: {
                defaultProps: {
                    timeout: 0,
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: {
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        '&.Mui-checked': {
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&+.MuiSwitch-track': {
                                opacity: 1,
                            },
                        },
                        '&.Mui-disabled': {
                            '&+.MuiSwitch-track': {
                                'opacity': 0.12,
                            },
                        },
                    },
                    thumb: {
                        backgroundColor: 'white',
                    },
                    track: {
                        opacity: 0.2,
                    },
                    sizeMedium: {
                        '.MuiSwitch-thumb': {
                            width: 12,
                            height: 12,
                        },
                        '.MuiSwitch-switchBase': {
                            padding: 13,
                        },
                    },
                    sizeSmall: {
                        '.MuiSwitch-thumb': {
                            width: 8,
                            height: 8,
                        },
                        '.MuiSwitch-switchBase': {
                            padding: 8,
                        },
                    },
                },
            },
            MuiDialog: {
                defaultProps: {
                    transitionDuration: 0,
                },
            },
            MuiDialogContent: {
                defaultProps: {
                    dividers: true,
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: BUTTON_DEFAULT_BACKGROUND_COLOR,

                        '&+.MuiDialogContent-root': {
                            paddingTop: 20,
                        },
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        backgroundColor: BUTTON_DEFAULT_BACKGROUND_COLOR,
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        padding: 4,
                        color: POPUPS_TEXT_COLOR,
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        padding: '6px 10px',
                        border: 0,
                        backgroundColor: BUTTON_DEFAULT_BACKGROUND_COLOR,
                        '&.Mui-disabled': {
                            border: 0,
                        },
                        '&.Mui-selected': {
                            backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                .darken(COLOR_ACTIVE_LEVEL)
                                .toString(),
                            '&:hover': {
                                backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                    .darken(COLOR_ACTIVE_LEVEL)
                                    .toString(),
                            },
                        },
                        '&:not(.Mui-selected):hover': {
                            backgroundColor: Color(BUTTON_DEFAULT_BACKGROUND_COLOR)
                                .darken(COLOR_CHANGE_LEVEL)
                                .toString(),
                        },
                    },
                    sizeSmall: {
                        padding: '4px 7px',
                        fontSize: '0.025rem',
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        '&:not(.Mui-selected):hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.05)
                                .toString(),
                        },
                        '&:not(.Mui-selected):active, &.Mui-selected': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                    },
                },
            },
            MuiPopover: {
                defaultProps: {
                    transitionDuration: 0,
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        '&:not(.Mui-selected):hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.05)
                                .toString(),
                        },
                        '&:not(.Mui-selected):active, &.Mui-selected': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                    },
                },
            },
            MuiMenu: {
                defaultProps: {
                    transitionDuration: 0,
                },
                styleOverrides: {
                    list: {
                        padding: 0,
                        paddingTop: 4,
                        paddingBottom: 4,
                        backgroundColor: POPUPS_BG_COLOR,
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        '&:not(.Mui-selected):hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.05)
                                .toString(),
                        },
                        '&:active, &.Mui-selected': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.1)
                                .toString(),
                        },
                    },
                },
            },
            MuiDatePicker: {
                defaultProps: {
                    TransitionComponent: React.forwardRef((props: any, ref) => {
                        return React.createElement(Fade, {
                            ref,
                            ...props,
                            timeout: 0,
                        });
                    }),
                    components: {
                        OpenPickerIcon: () => React.createElement(CalendarTodayTwoTone),
                    },
                },
            },
            MuiTreeItem: {
                defaultProps: {
                    TransitionProps: {
                        timeout: 0,
                    },
                },
                styleOverrides: {
                    content: {
                        color: POPUPS_TEXT_COLOR,
                        paddingTop: 6,
                        paddingBottom: 6,
                        '&.Mui-selected, &:active, &:not(.Mui-selected):hover, &.Mui-selected:hover, &.Mui-selected.Mui-focused': {
                            backgroundColor: Color(POPUPS_BG_COLOR)
                                .darken(0.05)
                                .toString(),
                        },
                    },
                    group: {
                        marginLeft: 0,
                        '& .MuiTreeItem-content': {
                            paddingLeft: 17,
                        },
                    },
                    label: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
