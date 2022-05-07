import React from 'react';
import createTheme, { Theme } from '@mui/material/styles/createTheme';
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
    BUTTON_DEFAULT_TEXT_COLOR,
    COLOR_ACTIVE_LEVEL,
    COLOR_CHANGE_LEVEL,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    BORDER_COLOR,
    POPUPS_BG_COLOR,
    POPUPS_TEXT_COLOR,
} from './constants';
import Color from 'color';
import '@mui/lab/themeAugmentation';
import { CreateThemeOptions } from './interfaces';
import merge from 'lodash/merge';
import {
    PaletteColorOptions,
    PaletteOptions,
} from '@mui/material/styles/createPalette';
import { CSSInterpolation } from '@mui/material/styles';

const createStylesWithTheme = (creator: (theme: Theme) => CSSInterpolation) => {
    return createStyles((data) => creator(data.theme));
};

const createMuiTheme = (options: CreateThemeOptions = {}) => {
    const defaultOptions: Required<CreateThemeOptions> = {
        mode: 'light',
        variants: {
            primary: '#2185d0',
            secondary: '#3e3f40',
            error: '#d32f2f',
            info: '#e0e0e0',
            success: '#2e7d32',
            warning: '#ed6c02',
        },
        presets: {
            borderColor: Color('#000000').alpha(0.6).toString(),
            changeLevel: 0.075,
            changeLevelStep: 2,
            borderRadius: 4,
            padding: 5,
        },
    };

    const createThemeOptions: Required<CreateThemeOptions> = merge(defaultOptions, options);

    return createTheme({
        palette: merge(
            Object.keys(createThemeOptions.variants).reduce((result, variant) => {
                const variantMainColor = createThemeOptions.variants[variant];
                const changeLevel = createThemeOptions.presets.changeLevel;

                result[variant] = {
                    main: variantMainColor,
                    light: Color(variantMainColor).lighten(changeLevel).toString(),
                    dark: Color(variantMainColor).darken(changeLevel).toString(),
                } as PaletteColorOptions;

                return result;
            }, {} as PaletteOptions),
            {
                text: {
                    primary: Color('#000000').alpha(0.6).toString(),
                    secondary: Color('#000000').alpha(0.4).toString(),
                    disabled: Color('#000000').alpha(0.3).toString(),
                },
                divider: '#e6e6e6',
            } as PaletteOptions,
        ),
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
                    color: 'info',
                },
                styleOverrides: {
                    root: createStyles((data) => {
                        const color = data.ownerState.color;
                        const theme = data.theme as Theme;
                        let themeColor = theme.palette[color]?.main || theme.palette.grey[300];

                        if (color === 'info') {
                            themeColor = theme.palette.text.primary;
                        }

                        return {
                            backgroundColor: 'transparent',
                            borderRadius: createThemeOptions.presets.borderRadius,
                            padding: createThemeOptions.presets.padding,
                            color: themeColor,
                            '&:hover': {
                                backgroundColor: theme.palette.grey[200],
                            },
                            '&:active': {
                                backgroundColor: theme.palette.grey[300],
                            },
                        };
                    }),
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                    disableTouchRipple: true,
                },
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            borderRadius: createThemeOptions.presets.borderRadius,
                            padding: createThemeOptions.presets.padding,
                            color: theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor: theme.palette.grey[200],
                            },
                            '&:active': {
                                backgroundColor: theme.palette.grey[300],
                            },
                        };
                    }),
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    disableFocusRipple: true,
                    disableRipple: true,
                    disableTouchRipple: true,
                    variant: 'contained',
                    color: 'info',
                },
                styleOverrides: {
                    root: createStyles((data) => {
                        const variant = data.ownerState.variant;
                        const color = data.ownerState.color;
                        const theme = data.theme as Theme;
                        const backgroundColor = theme.palette[color]?.main || theme.palette.grey[300];
                        const {
                            changeLevel,
                            changeLevelStep,
                        } = createThemeOptions.presets;

                        switch (variant) {
                            case 'contained': {
                                return {
                                    backgroundColor,
                                    '&:hover': {
                                        backgroundColor: Color(backgroundColor).darken(changeLevel).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor).darken(changeLevel * changeLevelStep).toString(),
                                    },
                                };
                            }
                            case 'outlined': {
                                return {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: Color(backgroundColor).darken(0.3).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(0.15).toString(),
                                    },
                                    '&:active': {
                                        color: Color(backgroundColor).darken(0.3).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(0.25).toString(),
                                    },
                                };
                            }
                            case 'text': {
                                return {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: Color(backgroundColor).darken(0.3).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(0.15).toString(),
                                    },
                                    '&:active': {
                                        color: Color(backgroundColor).darken(0.3).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(0.25).toString(),
                                    },
                                };
                            }
                            default:
                                return {};
                        }
                    }),
                },
                variants: [
                    {
                        props: {
                            color: 'info',
                        },
                        style: createStylesWithTheme((theme) => {
                            const primaryColor = theme.palette.text.primary;
                            const backgroundColor = theme.palette['info']?.main || theme.palette.grey[300];
                            const {
                                changeLevel,
                                changeLevelStep,
                            } = createThemeOptions.presets;

                            return {
                                color: primaryColor,
                                borderColor: primaryColor,
                                '&:hover': {
                                    backgroundColor: Color(backgroundColor).darken(changeLevel).toString(),
                                    borderColor: Color(primaryColor).alpha(0.8).toString(),
                                    color: Color(primaryColor).alpha(0.8).toString(),
                                },
                                '&:active': {
                                    backgroundColor: Color(backgroundColor).darken(changeLevel * changeLevelStep).toString(),
                                },
                            };
                        }),
                    },
                    {
                        props: {
                            color: 'info',
                            variant: 'contained',
                        },
                        style: createStylesWithTheme((theme) => {
                            const backgroundColor = theme.palette['info'].dark;
                            const {
                                changeLevel,
                                changeLevelStep,
                            } = createThemeOptions.presets;
                            return {
                                backgroundColor,
                                '&:hover': {
                                    backgroundColor: Color(backgroundColor).darken(changeLevel).toString(),
                                },
                                '&:active': {
                                    backgroundColor: Color(backgroundColor).darken(changeLevel * changeLevelStep).toString(),
                                },
                            };
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
                    groupedContained: {
                        '&:not(:last-of-type)': {
                            borderColor: Color(createThemeOptions.presets.borderColor).alpha(0.1).toString(),
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            minHeight: 24,
                            borderRadius: createThemeOptions.presets.borderRadius,
                            padding: 2,
                            backgroundColor: theme.palette.grey[200],
                            alignItems: 'center',
                        };
                    }),
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            minHeight: 24,
                            padding: 4,
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: theme.palette.grey[300],
                                color: theme.palette.text.primary,
                            },
                            '&:active': {
                                backgroundColor: theme.palette.grey[400],
                                color: theme.palette.text.primary,
                            },
                            '&.Mui-selected': {
                                borderRadius: 4,
                                color: theme.palette.text.primary,
                                backgroundColor: 'white',
                                boxShadow: `${theme.palette.grey[400]} 0px 2px 10px`,
                            },
                        };
                    }),
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
                    today: createStylesWithTheme((theme) => {
                        return {
                            border: '0 !important',
                            backgroundColor: theme.palette.grey[300],
                        };
                    }),
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
                    root: createStylesWithTheme((theme) => {
                        return {
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
                        };
                    }),
                },
                defaultProps: {
                    checkedIcon: React.createElement(CheckBoxTwoToneIcon),
                    indeterminateIcon: React.createElement(IndeterminateCheckBoxIcon),
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
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
                        };
                    }),
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: theme.palette.grey[300],

                            '&+.MuiDialogContent-root': {
                                paddingTop: 20,
                            },
                        };
                    }),
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            backgroundColor: theme.palette.grey[300],
                        };
                    }),
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            padding: '6px 10px',
                            border: 0,
                            backgroundColor: theme.palette.grey[300],
                            '&.Mui-disabled': {
                                border: 0,
                            },
                            '&.Mui-selected': {
                                backgroundColor: Color(theme.palette.grey[300])
                                    .darken(COLOR_ACTIVE_LEVEL)
                                    .toString(),
                                '&:hover': {
                                    backgroundColor: Color(theme.palette.grey[300])
                                        .darken(COLOR_ACTIVE_LEVEL)
                                        .toString(),
                                },
                            },
                            '&:not(.Mui-selected):hover': {
                                backgroundColor: Color(theme.palette.grey[300])
                                    .darken(COLOR_CHANGE_LEVEL)
                                    .toString(),
                            },
                        };
                    }),
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

export default createMuiTheme;

export {
    createMuiTheme,
    CreateThemeOptions,
};
