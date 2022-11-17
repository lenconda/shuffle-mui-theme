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
import SvgIcon from '@mui/material/SvgIcon';
import Color from 'color';
import '@mui/lab/themeAugmentation';
import { CreateThemeOptions } from './interfaces';
import merge from 'lodash/merge';
import {
    Palette,
    PaletteColor,
    PaletteColorOptions,
    PaletteOptions,
} from '@mui/material/styles/createPalette';
import { CSSInterpolation } from '@mui/material/styles';

const createStylesWithTheme = (creator: (theme: Theme) => CSSInterpolation) => {
    return createStyles((data: any) => creator(data.theme));
};

const createMuiTheme = (options: Partial<CreateThemeOptions> = {}) => {
    const defaultOptions: Required<CreateThemeOptions> = {
        mode: 'light',
        variants: {
            primary: '#0070ba',
            secondary: '#ced4da',
            error: '#d32f2f',
            info: '#0288d1',
            success: '#2e7d32',
            warning: '#ec7211',
        },
        presets: {
            borderColor: Color('#000000')!.alpha(0.6)!.toString(),
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
                const variantMainColor = (createThemeOptions.variants as any)[variant];
                const changeLevel = createThemeOptions.presets.changeLevel;

                (result as any)[variant] = {
                    main: variantMainColor,
                    light: Color(variantMainColor)!.lighten(changeLevel).toString(),
                    dark: Color(variantMainColor)!.darken(changeLevel).toString(),
                } as PaletteColorOptions;

                return result;
            }, {} as PaletteOptions),
            {
                text: {
                    primary: Color(createThemeOptions.mode === 'dark' ? '#ffffff' : '#000000')!.alpha(0.6)!.toString(),
                    secondary: Color(createThemeOptions.mode === 'dark' ? '#ffffff' : '#000000')!.alpha(0.4)!.toString(),
                    disabled: Color(createThemeOptions.mode === 'dark' ? '#ffffff' : '#000000')!.alpha(0.3)!.toString(),
                },
                divider: '#e6e6e6',
                mode: createThemeOptions.mode,
            } as PaletteOptions,
        ),
        typography: {
            fontSize: 13,
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
                    color: 'secondary',
                },
                styleOverrides: {
                    root: createStyles((data: any) => {
                        const color = data.ownerState.color as keyof Palette;
                        const theme = data.theme as Theme;
                        let themeColor = (theme.palette[color] as PaletteColor)?.main || theme.palette.grey[300];
                        const mode = theme.palette.mode;
                        const {
                            changeLevel,
                            changeLevelStep,
                        } = createThemeOptions.presets;

                        if (color === 'secondary') {
                            themeColor = theme.palette.text.primary;
                        }

                        return {
                            backgroundColor: 'transparent',
                            borderRadius: createThemeOptions.presets.borderRadius,
                            padding: createThemeOptions.presets.padding,
                            color: themeColor,
                            '&:hover': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[900])!.lighten(changeLevel * changeLevelStep).toString()
                                    : theme.palette.grey[200],
                            },
                            '&:active': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[900])!.darken(changeLevel * changeLevelStep).toString()
                                    : theme.palette.grey[300],
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
                    color: 'secondary',
                },
                styleOverrides: {
                    root: createStyles((data: any) => {
                        const variant = data.ownerState.variant;
                        const color = data.ownerState.color as keyof Palette;
                        const theme = data.theme as Theme;
                        const backgroundColor = (theme.palette[color] as PaletteColor)?.main || theme.palette.grey[300];
                        const {
                            changeLevel,
                            changeLevelStep,
                        } = createThemeOptions.presets;
                        const mode = theme.palette.mode;

                        switch (variant) {
                            case 'contained': {
                                return {
                                    backgroundColor,
                                    '&:hover': {
                                        backgroundColor: Color(backgroundColor)!.darken(changeLevel).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor)!.darken(changeLevel * changeLevelStep).toString(),
                                    },
                                };
                            }
                            case 'outlined': {
                                return {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor)!.lighten(0.3).toString()
                                            : Color(backgroundColor)!.darken(0.3).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor)!.alpha(0.25)!.toString()
                                            : Color(backgroundColor)!.alpha(0.15)!.toString(),
                                    },
                                    '&:active': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor)!.lighten(0.3).toString()
                                            : Color(backgroundColor)!.darken(0.3).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor)!.alpha(0.15)!.toString()
                                            : Color(backgroundColor)!.alpha(0.25)!.toString(),
                                    },
                                };
                            }
                            case 'text': {
                                return {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor)!.lighten(0.3).toString()
                                            : Color(backgroundColor)!.darken(0.3).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor)!.alpha(0.25)!.toString()
                                            : Color(backgroundColor)!.alpha(0.15)!.toString(),
                                    },
                                    '&:active': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor)!.lighten(0.3).toString()
                                            : Color(backgroundColor)!.darken(0.3).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor)!.alpha(0.15)!.toString()
                                            : Color(backgroundColor)!.alpha(0.25)!.toString(),
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
                            color: 'secondary',
                        },
                        style: createStylesWithTheme((theme) => {
                            const primaryColor = theme.palette.text.primary;
                            const backgroundColor = theme.palette['secondary']?.main || theme.palette.grey[300];
                            const {
                                changeLevel,
                                changeLevelStep,
                            } = createThemeOptions.presets;

                            return {
                                color: primaryColor,
                                borderColor: primaryColor,
                                '&:hover': {
                                    backgroundColor: Color(backgroundColor)!.darken(changeLevel).toString(),
                                    borderColor: Color(primaryColor)!.alpha(0.9)!.toString(),
                                    color: Color(primaryColor)!.alpha(0.9)!.toString(),
                                },
                                '&:active': {
                                    backgroundColor: Color(backgroundColor)!.darken(changeLevel * changeLevelStep).toString(),
                                },
                            };
                        }),
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'contained',
                        },
                        style: createStylesWithTheme((theme) => {
                            const backgroundColor = theme.palette['secondary'].dark;
                            const {
                                changeLevel,
                                changeLevelStep,
                            } = createThemeOptions.presets;

                            if (theme.palette.mode !== 'dark') {
                                return {
                                    backgroundColor,
                                    '&:hover': {
                                        backgroundColor: Color(backgroundColor)!.darken(changeLevel).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor)!.darken(changeLevel * changeLevelStep).toString(),
                                    },
                                };
                            } else {
                                return {
                                    backgroundColor: Color(theme.palette.grey[800])!.darken(changeLevel * changeLevelStep).toString(),
                                    '&:hover': {
                                        backgroundColor: Color(theme.palette.grey[800])!.darken(changeLevel * changeLevelStep * 2).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(theme.palette.grey[900])!.lighten(changeLevel * changeLevelStep * changeLevelStep).toString(),
                                    },
                                };
                            }
                        }),
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'outlined',
                        },
                        style: createStylesWithTheme((theme) => {
                            if (theme.palette.mode !== 'dark') {
                                return {
                                    borderColor: theme.palette.secondary.dark,
                                    '&:hover': {
                                        borderColor: theme.palette.secondary.dark,
                                        backgroundColor: Color(theme.palette.secondary.main).alpha(0.4).toString(),
                                    },
                                    '&:active': {
                                        borderColor: Color(theme.palette.secondary.dark).darken(0.1).toString(),
                                        backgroundColor: Color(theme.palette.secondary.main).lighten(0.08).toString(),
                                    },
                                };
                            } else {
                                return {
                                    color: theme.palette.text.primary,
                                    borderColor: Color(theme.palette.secondary.dark).alpha(0.4).toString(),
                                    '&:hover': {
                                        borderColor: Color(theme.palette.secondary.dark).alpha(0.8).toString(),
                                        color: Color(theme.palette.text.primary)!.alpha(0.8)!.toString(),
                                        backgroundColor: Color(theme.palette.secondary.main).alpha(0.3).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(theme.palette.secondary.main).alpha(0.2).toString(),
                                    },
                                };
                            }
                        }),
                    },
                    {
                        props: {
                            color: 'secondary',
                            variant: 'text',
                        },
                        style: createStylesWithTheme((theme) => {
                            const { changeLevel } = createThemeOptions.presets;

                            if (theme.palette.mode !== 'dark') {
                                return {
                                    '&:hover': {
                                        backgroundColor: Color(theme.palette.secondary.main).lighten(0.1).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: theme.palette.secondary.main,
                                    },
                                };
                            } else {
                                return {
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        color: Color(theme.palette.text.primary)!.alpha(0.8)!.toString(),
                                        backgroundColor: theme.palette.grey[800],
                                    },
                                    '&:active': {
                                        backgroundColor: Color(theme.palette.grey[800])!.darken(changeLevel).toString(),
                                    },
                                };
                            }
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
                            borderColor: Color(createThemeOptions.presets.borderColor)!.alpha(0.1)!.toString(),
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
                                alignSelf: 'stretch',
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
                        const mode = theme.palette.mode;
                        return {
                            minHeight: 36,
                            borderRadius: createThemeOptions.presets.borderRadius,
                            padding: 2,
                            backgroundColor: mode === 'dark'
                                ? theme.palette.grey[900]
                                : theme.palette.grey[100],
                            alignItems: 'center',
                        };
                    }),
                    scroller: {
                        borderRadius: createThemeOptions.presets.borderRadius,
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
                        const mode = theme.palette.mode;
                        const { changeLevel } = createThemeOptions.presets;

                        return {
                            minHeight: 32,
                            padding: 4,
                            backgroundColor: 'transparent',
                            '&:hover': mode === 'dark'
                                ? {
                                    color: theme.palette.text.primary,
                                    backgroundColor: Color(theme.palette.grey[800])!.lighten(changeLevel).toString(),
                                }
                                : {
                                    backgroundColor: theme.palette.grey[300],
                                    color: theme.palette.text.primary,
                                },
                            '&:active': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[800])!.darken(changeLevel).toString()
                                    : theme.palette.grey[400],
                                color: theme.palette.text.primary,
                            },
                            '&.Mui-selected': {
                                borderRadius: createThemeOptions.presets.borderRadius,
                                color: theme.palette.text.primary,
                                ...(
                                    mode === 'dark'
                                        ? {
                                            backgroundColor: theme.palette.grey[800],
                                            boxShadow: `${theme.palette.grey[900]} 0px 2px 10px`,
                                        }
                                        : {
                                            backgroundColor: theme.palette.background.default,
                                            boxShadow: `${theme.palette.grey[200]} 0px 2px 10px`,
                                        }
                                ),
                            },
                        };
                    }),
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            color: theme.palette.text.primary,
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
                        OpenPickerIcon: () => React.createElement(CalendarTodayTwoTone, { fontSize: 'small' }),
                    },
                },
            },
            MuiYearPicker: {
                styleOverrides: {
                    root: {
                        '.PrivatePickersYear-root': {
                            '& > button': {
                                borderRadius: createThemeOptions.presets.borderRadius,
                            },
                        },
                    },
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        borderRadius: createThemeOptions.presets.borderRadius,
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
                    root: createStylesWithTheme((theme) => {
                        return {
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
                                border: `1px solid ${theme.palette.text.secondary}`,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        };
                    }),
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
                        '& input': {
                            paddingTop: 8,
                            paddingRight: 6,
                            paddingBottom: 8,
                            paddingLeft: 6,
                            fontSize: '0.8rem',
                        },
                    },
                    sizeSmall: {
                        '& input': {
                            padding: 6,
                            fontSize: '0.6rem',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const borderColor = theme.palette.text.secondary;
                        const borderHoverColor = theme.palette.primary.main;
                        const borderActiveColor = theme.palette.primary.main;

                        return {
                            boxSizing: 'border-box',
                            border: `1px solid ${Color(borderColor)!.alpha(0.3)!.toString()}`,

                            '&.Mui-focused': {
                                borderColor: borderActiveColor,
                                outline: `1px solid ${borderActiveColor}`,
                            },

                            '&.Mui-disabled': {
                                borderColor: Color(borderColor)!.alpha(0.15)!.toString(),
                            },

                            '&:not(.Mui-disabled):not(.Mui-focused):hover': {
                                borderColor: borderHoverColor,
                            },
                        };
                    }),
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
                            padding: 2,
                            backgroundColor: 'transparent',
                            color: Color(theme.palette.text.primary)!.alpha(0.4)!.toString(),
                            '&:hover': {
                                color: theme.palette.primary.main,
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
                    icon: React.createElement(
                        (props: any) => {
                            return React.createElement(
                                SvgIcon,
                                {
                                    ...props,
                                    viewBox: '-3 -3 24 24',
                                },
                                React.createElement(
                                    'path',
                                    {
                                        d: 'M16,17 L2,17 C1.44771525,17 1,16.5522847 1,16 L1,2 C1,1.44771525 1.44771525,1 2,1 L16,1 C16.5522847,1 17,1.44771525 17,2 L17,16 C17,16.5522847 16.5522847,17 16,17 Z M16,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,2 C18,0.9 17.1,0 16,0 Z',
                                    },
                                ),
                            );
                        },
                    ),
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            borderRadius: 0,
                            padding: 2,
                            backgroundColor: 'transparent',
                            color: Color(theme.palette.text.primary)!.alpha(0.4)!.toString(),
                            '&:hover': {
                                color: theme.palette.primary.main,
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
                    icon: React.createElement(
                        (props: any) => {
                            return React.createElement(
                                SvgIcon,
                                {
                                    ...props,
                                    viewBox: '-2 -2 24 24',
                                },
                                React.createElement(
                                    'path',
                                    {
                                        d: 'M10,0 C4.48,0 0,4.48 0,10 C0,15.52 4.48,20 10,20 C15.52,20 20,15.52 20,10 C20,4.48 15.52,0 10,0 Z M10,19 C5.0275,19 1,14.9725 1,10 C1,5.0275 5.0275,1 10,1 C14.9725,1 19,5.0275 19,10 C19,14.9725 14.9725,19 10,19 Z',
                                    },
                                ),
                            );
                        },
                    ),
                },
            },
            MuiCollapse: {
                defaultProps: {
                    timeout: 0,
                },
                styleOverrides: {
                    root: {
                        borderRadius: createThemeOptions.presets.borderRadius,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 8,
                        fontSize: '0.8rem',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    switchBase: createStylesWithTheme((theme) => {
                        return {
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&.Mui-checked': {
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                '&+.MuiSwitch-track': {
                                    boxSizing: 'border-box',
                                    backgroundColor: theme.palette.primary.main,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    opacity: 1,
                                },
                            },
                            '&.Mui-disabled': {
                                ...(
                                    theme.palette.mode === 'dark'
                                        ? {
                                            opacity: 0.3,
                                        }
                                        : {}
                                ),
                                '.MuiSwitch-thumb': {
                                    boxShadow: 'none',
                                },
                                '&.Mui-checked+.MuiSwitch-track': {
                                    'opacity': 0.24,
                                },
                            },
                        };
                    }),
                    thumb: {
                        boxShadow: 'none',
                        borderRadius: 2,
                        backgroundColor: 'white',
                    },
                    track: {
                        opacity: 0.2,
                    },
                    sizeMedium: {
                        padding: 10,
                        '.MuiSwitch-thumb': {
                            width: 14,
                            height: 14,
                        },
                        '.MuiSwitch-switchBase': {
                            padding: 12,
                        },
                        '.MuiSwitch-track': {
                            borderRadius: 3,
                        },
                    },
                    sizeSmall: {
                        padding: 4,
                        '.MuiSwitch-thumb': {
                            width: 12,
                            height: 12,
                        },
                        '.MuiSwitch-switchBase': {
                            padding: 6,
                        },
                        '.MuiSwitch-track': {
                            borderRadius: 3,
                        },
                    },
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return theme.palette.mode === 'dark'
                            ? {}
                            : {
                                opacity: '0.5 !important',
                            };
                    }),
                },
            },
            MuiDialogContent: {
                defaultProps: {
                    dividers: true,
                },
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        return mode === 'dark'
                            ? {
                                borderColor: theme.palette.background.default,
                                backgroundColor: theme.palette.grey[900],
                            }
                            : {};
                    }),
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        return {
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[100],

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
                        const mode = theme.palette.mode;
                        return {
                            backgroundColor: mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[100],
                            borderColor: theme.palette.background.default,
                        };
                    }),
                },
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        if (theme.palette.mode === 'light') {
                            return {
                                color: theme.palette.text.primary,
                            };
                        }

                        return {};
                    }),
                },
            },
            MuiList: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            padding: createThemeOptions.presets.padding,
                            color: theme.palette.text.secondary,
                        };
                    }),
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const { changeLevel } = createThemeOptions.presets;
                        const mode = theme.palette.mode;

                        return {
                            padding: '6px 10px',
                            border: 0,
                            backgroundColor: mode === 'dark'
                                ? theme.palette.grey[900]
                                : theme.palette.grey[300],
                            color: theme.palette.text.primary,
                            '&.Mui-disabled': {
                                border: 0,
                            },
                            '&.Mui-selected': mode === 'dark'
                                ? {
                                    backgroundColor: theme.palette.grey[800],
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[800],
                                    },
                                }
                                : {
                                    backgroundColor: theme.palette.grey[400],
                                    '&:hover': {
                                        backgroundColor: theme.palette.grey[400],
                                    },
                                },
                            '&:not(.Mui-selected):hover': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[800])!.lighten(changeLevel).toString()
                                    : Color(theme.palette.grey[400])!.lighten(changeLevel).toString(),
                            },
                            '&:not(.Mui-selected):active': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[800])!.darken(changeLevel).toString()
                                    : Color(theme.palette.grey[400])!.darken(changeLevel).toString(),
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
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const { changeLevel } = createThemeOptions.presets;
                        const backgroundHoverColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.lighten(changeLevel).toString()
                            : theme.palette.grey[200];
                        const backgroundActiveColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.darken(changeLevel).toString()
                            : theme.palette.grey[300];

                        return {
                            '&:not(.Mui-selected):hover': {
                                backgroundColor: backgroundHoverColor,
                            },
                            '&:not(.Mui-selected):active, &.Mui-selected': {
                                backgroundColor: backgroundActiveColor,
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: backgroundActiveColor,
                            },
                        };
                    }),
                },
            },
            MuiListItemText: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            fontSize: theme.typography.fontSize,
                            margin: 0,
                        };
                    }),
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const { changeLevel } = createThemeOptions.presets;
                        const backgroundHoverColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.lighten(changeLevel).toString()
                            : theme.palette.grey[200];
                        const backgroundActiveColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.darken(changeLevel).toString()
                            : theme.palette.grey[300];

                        return {
                            '&:not(.Mui-selected):hover': {
                                backgroundColor: backgroundHoverColor,
                            },
                            '&:not(.Mui-selected):active, &.Mui-selected': {
                                backgroundColor: backgroundActiveColor,
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: backgroundActiveColor,
                            },
                        };
                    }),
                },
            },
            MuiMenu: {
                defaultProps: {
                    transitionDuration: 0,
                },
                styleOverrides: {
                    list: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const {
                            changeLevel,
                            changeLevelStep,
                        } = createThemeOptions.presets;

                        return {
                            padding: 0,
                            paddingTop: 4,
                            paddingBottom: 4,
                            backgroundColor: mode === 'dark'
                                ? Color(theme.palette.grey[800])!.darken(changeLevel * changeLevelStep).toString()
                                : theme.palette.grey[100],
                        };
                    }),
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;

                        return mode === 'dark'
                            ? {
                                borderColor: theme.palette.grey[900],
                            }
                            : {};
                    }),
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const backgroundHoverColor = mode === 'dark'
                            ? theme.palette.grey[800]
                            : theme.palette.grey[300];
                        const backgroundActiveColor = mode === 'dark'
                            ? theme.palette.grey[800]
                            : theme.palette.grey[400];

                        return {
                            fontSize: theme.typography.fontSize,
                            borderRadius: 0,
                            '&:not(.Mui-selected):hover': {
                                backgroundColor: backgroundHoverColor,
                            },
                            '&:active, &.Mui-selected': {
                                backgroundColor: backgroundHoverColor,
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: backgroundActiveColor,
                            },
                        };
                    }),
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
                        OpenPickerIcon: () => React.createElement(CalendarTodayTwoTone, { fontSize: 'small' }),
                    },
                },
            },
            MuiTreeItem: {
                styleOverrides: {
                    root: {
                        overflow: 'hidden',
                        borderRadius: createThemeOptions.presets.borderRadius,
                    },
                    content: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;

                        return {
                            color: theme.palette.text.primary,
                            paddingTop: 6,
                            paddingBottom: 6,
                            boxSizing: 'border-box',
                            borderRadius: createThemeOptions.presets.borderRadius,
                            '&.Mui-selected, &:active, &:not(.Mui-selected):hover, &.Mui-selected:hover, &.Mui-selected.Mui-focused': {
                                backgroundColor: mode === 'dark'
                                    ? theme.palette.grey[900]
                                    : theme.palette.grey[300],
                            },
                        };
                    }),
                    group: {
                        marginLeft: 0,
                        '& .MuiTreeItem-content': {
                            paddingLeft: 17,
                        },
                    },
                    label: createStylesWithTheme((theme) => {
                        return {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: theme.typography.fontSize,
                        };
                    }),
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            fontSize: theme.typography.fontSize,
                            margin: 0,
                        };
                    }),
                },
            },
        },
        transitions: {
            duration: {
                shortest: 0.1,
                shorter: 0.15,
                short: 0.2,
                standard: 0.25,
                complex: 0.3,
                enteringScreen: 0.35,
                leavingScreen: 0.4,
            },
        },
    });
};

export default createMuiTheme;

export {
    createMuiTheme,
};
export type { CreateThemeOptions };
