import React from 'react';
import createTheme, {
    Theme,
    ThemeOptions,
} from '@mui/material/styles/createTheme';
import createStyles from '@mui/material/styles/createStyles';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import DateTimePickerToolbar from '@mui/lab/DateTimePicker/DateTimePickerToolbar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import SvgIcon from '@mui/material/SvgIcon';
import Color from 'color';
import '@mui/lab/themeAugmentation';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';
import clone from 'lodash/clone';
import {
    Palette,
    PaletteColor,
    PaletteColorOptions,
    PaletteOptions,
    PaletteTonalOffset,
} from '@mui/material/styles/createPalette';
import { CSSInterpolation } from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import { PaletteMode } from '@mui/material';

const createStylesWithTheme = (creator: (theme: Theme) => CSSInterpolation) => {
    return createStyles((data: any) => creator(data.theme));
};

const parseTonalOffset = (tonalOffset: PaletteTonalOffset, mode: PaletteMode) => {
    if (typeof tonalOffset === 'number') {
        return tonalOffset;
    }

    return tonalOffset[mode];
};

export interface ShuffleThemeOptions {
    textButtonHoverOpacity?: number;
    opacityOffset?: number;
    outlinedBaseOpacity?: number;
}

export interface Options {
    muiTheme?: ThemeOptions;
    shuffleTheme?: ShuffleThemeOptions;
}

const createShuffleTheme = ({
    muiTheme: options = {},
    shuffleTheme: userShuffleOptions = {},
}: Options = {}) => {
    let HOVER_TONAL_STEP = 1;
    let ACTIVE_TONAL_STEP = 2;
    const defaultShuffleOptions: Required<ShuffleThemeOptions> = {
        textButtonHoverOpacity: 0.2,
        opacityOffset: 3.5,
        outlinedBaseOpacity: 0.24,
    };
    const shuffleOptions = merge({}, defaultShuffleOptions, userShuffleOptions);
    const defaultTheme = createTheme();
    const variants = uniq(Object.keys(options?.palette || {}).concat([
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
    ]));
    const defaultPaletteMap = {
        primary: '#0070ba',
        secondary: '#ced4da',
        error: '#d32f2f',
        info: '#0288d1',
        success: '#2e7d32',
        warning: '#ec7211',
    } as Record<string, string>;
    const mode = options?.palette?.mode || defaultTheme.palette.mode;
    const customizedPalette = (options?.palette || {}) as Partial<PaletteOptions>;
    const black = options?.palette?.common?.black || defaultTheme?.palette?.common?.black;
    const white = options?.palette?.common?.black || defaultTheme?.palette?.common?.white;
    const presetPaletteOptions = {
        text: {
            primary: Color(mode === 'dark' ? white : black).alpha(0.6).toString(),
            secondary: Color(mode === 'dark' ? white : black).alpha(0.4).toString(),
            disabled: Color(mode === 'dark' ? white : black).alpha(0.3).toString(),
        },
        divider: Color(mode === 'dark' ? white : black).alpha(0.12).toString(),
        mode,
        action: {
            hoverOpacity: 0.10,
            selectedOpacity: 0.14,
            activatedOpacity: 0.04,
            focusOpacity: 0.04,
        },
        tonalOffset: 0.15,
    } as PaletteOptions;
    const tonalOffset = parseTonalOffset(
        options?.palette?.tonalOffset || presetPaletteOptions?.tonalOffset || defaultTheme.palette.tonalOffset,
        mode,
    );

    shuffleOptions.textButtonHoverOpacity = mode === 'dark'
        ? shuffleOptions.textButtonHoverOpacity * 1.6
        : shuffleOptions.textButtonHoverOpacity;

    return createTheme(deepmerge({
        palette: merge(
            {},
            options?.palette || {},
            variants.reduce<Partial<PaletteOptions>>((result: Partial<PaletteOptions>, variant: string) => {
                const currentVariant = customizedPalette?.[variant as keyof PaletteOptions] as PaletteColor;
                const mainColor = currentVariant?.main || defaultPaletteMap[variant];

                if (!mainColor) {
                    return result;
                }

                return {
                    ...result,
                    [variant]: {
                        ...currentVariant,
                        main: mainColor,
                        light: currentVariant?.light || Color(mainColor).lighten(tonalOffset).toString(),
                        dark: currentVariant?.dark || Color(mainColor).darken(tonalOffset).toString(),
                    } as PaletteColorOptions,
                };
            }, {} as Partial<PaletteOptions>),
            presetPaletteOptions,
        ),
        shape: {
            borderRadius: 3,
        },
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
                        let activatedOpacity = theme.palette.action.activatedOpacity;
                        let { textButtonHoverOpacity } = clone(shuffleOptions);

                        if (color === 'secondary') {
                            themeColor = theme.palette.text.secondary;
                            textButtonHoverOpacity = textButtonHoverOpacity / 2;
                        }

                        return {
                            backgroundColor: 'transparent',
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(1),
                            color: themeColor,
                            '&:hover': {
                                backgroundColor: Color(themeColor).alpha(textButtonHoverOpacity).toString(),
                            },
                            '&:active': {
                                backgroundColor: Color(themeColor)
                                    .alpha(
                                        mode === 'dark'
                                            ? textButtonHoverOpacity - activatedOpacity
                                            : textButtonHoverOpacity + activatedOpacity,
                                    )
                                    .toString(),
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
                            borderRadius: theme.shape.borderRadius,
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
                        const mode = theme.palette.mode;
                        let hoverOpacity = theme.palette.action.hoverOpacity;
                        let activatedOpacity = theme.palette.action.activatedOpacity;
                        const { outlinedBaseOpacity } = shuffleOptions;

                        switch (variant) {
                            case 'contained': {
                                return {
                                    backgroundColor: backgroundColor,
                                    '&:hover': {
                                        backgroundColor: Color(backgroundColor).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                    },
                                    '&:disabled, &.Mui-disabled': {
                                        backgroundColor: Color(mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]).alpha(theme.palette.action.disabledOpacity).toString(),
                                    },
                                };
                            }
                            case 'outlined': {
                                return {
                                    backgroundColor: 'transparent',
                                    borderColor: Color(backgroundColor).alpha(mode === 'dark' ? 1 - outlinedBaseOpacity * (1 + tonalOffset) : outlinedBaseOpacity * (1 + tonalOffset)).toString(),
                                    color: Color(backgroundColor).alpha(1 - (hoverOpacity + activatedOpacity)).toString(),
                                    '&:hover': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor).lighten(tonalOffset).toString()
                                            : Color(backgroundColor).darken(tonalOffset).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor).alpha(outlinedBaseOpacity + hoverOpacity).toString()
                                            : Color(backgroundColor).alpha(outlinedBaseOpacity - hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor).lighten(tonalOffset).toString()
                                            : Color(backgroundColor).darken(tonalOffset).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor).alpha(outlinedBaseOpacity + activatedOpacity).toString()
                                            : Color(backgroundColor).alpha(outlinedBaseOpacity - activatedOpacity).toString(),
                                    },
                                    '&:disabled, &.Mui-disabled': {
                                        borderColor: Color(mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400]).alpha(theme.palette.action.disabledOpacity).toString(),
                                    },
                                };
                            }
                            case 'text': {
                                return {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor).lighten(tonalOffset).toString()
                                            : Color(backgroundColor).darken(tonalOffset).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor).alpha(outlinedBaseOpacity + hoverOpacity).toString()
                                            : Color(backgroundColor).alpha(outlinedBaseOpacity - hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        color: mode === 'dark'
                                            ? Color(backgroundColor).lighten(tonalOffset).toString()
                                            : Color(backgroundColor).darken(tonalOffset).toString(),
                                        backgroundColor: mode === 'dark'
                                            ? Color(backgroundColor).alpha(outlinedBaseOpacity + activatedOpacity).toString()
                                            : Color(backgroundColor).alpha(outlinedBaseOpacity - activatedOpacity).toString(),
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
                            variant: 'contained',
                        },
                        style: createStylesWithTheme((theme) => {
                            const backgroundColor = theme.palette['secondary'].dark;
                            let hoverOpacity = theme.palette.action.hoverOpacity;
                            let activatedOpacity = theme.palette.action.activatedOpacity;
                            const primaryColor = theme.palette.text.primary;

                            if (theme.palette.mode !== 'dark') {
                                return {
                                    '&:hover': {
                                        backgroundColor: Color(backgroundColor).alpha(1 - hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor).alpha(1 - activatedOpacity).toString(),
                                    },
                                };
                            } else {
                                return {
                                    backgroundColor: Color(theme.palette.grey[800]).toString(),
                                    color: Color(theme.palette.common.white).toString(),
                                    '&:hover': {
                                        backgroundColor: Color(theme.palette.grey[800]).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(theme.palette.grey[800]).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
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
                            let hoverOpacity = theme.palette.action.hoverOpacity;
                            let activatedOpacity = theme.palette.action.activatedOpacity;
                            const { outlinedBaseOpacity } = shuffleOptions;
                            if (theme.palette.mode !== 'dark') {
                                const backgroundColor = theme.palette['secondary'].dark;
                                return {
                                    color: theme.palette.text.primary,
                                    borderColor: theme.palette.secondary.dark,
                                    '&:hover': {
                                        color: Color(theme.palette.text.primary).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                        borderColor: Color(theme.palette.secondary.dark).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity - hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        color: Color(theme.palette.text.primary).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                        borderColor: Color(theme.palette.secondary.dark).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity - activatedOpacity).toString(),
                                    },
                                };
                            } else {
                                const backgroundColor = theme.palette.text.secondary;
                                return {
                                    color: theme.palette.text.primary,
                                    borderColor: Color(theme.palette.secondary.dark).alpha(outlinedBaseOpacity).toString(),
                                    '&:hover': {
                                        borderColor: Color(theme.palette.secondary.dark).alpha(outlinedBaseOpacity + hoverOpacity).toString(),
                                        color: Color(theme.palette.text.primary).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity + hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        borderColor: Color(backgroundColor).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity + activatedOpacity).toString(),
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
                            let hoverOpacity = theme.palette.action.hoverOpacity;
                            let activatedOpacity = theme.palette.action.activatedOpacity;
                            const { outlinedBaseOpacity } = shuffleOptions;

                            if (theme.palette.mode !== 'dark') {
                                const backgroundColor = theme.palette['secondary'].dark;
                                return {
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        color: Color(theme.palette.text.primary).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity - hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        color: Color(theme.palette.text.primary).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                        borderColor: Color(theme.palette.secondary.dark).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity - activatedOpacity).toString(),
                                    },
                                };
                            } else {
                                const backgroundColor = theme.palette.secondary.main;
                                return {
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        color: Color(theme.palette.text.primary).toString(),
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity + hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        backgroundColor: Color(backgroundColor).alpha(outlinedBaseOpacity + activatedOpacity).toString(),
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
                    groupedContained: createStylesWithTheme((theme) => {
                        return {
                            '&:not(:last-of-type)': {
                                borderColor: theme.palette.divider,
                                '&:hover': {
                                    borderRightColor: 'transparent',
                                },
                                '&:disabled': {
                                    borderRightColor: Color(theme.palette.divider).toString(),
                                },
                            },
                        };
                    }),
                    groupedOutlined: createStyles((data: any) => {
                        const color = data?.ownerState?.color as keyof Palette;
                        const theme = data.theme as Theme;
                        let themeColor = (theme.palette[color] as PaletteColor)?.main || 'red';
                        const mode = theme.palette.mode;
                        const { outlinedBaseOpacity } = shuffleOptions;
                        let hoverOpacity = theme.palette.action.hoverOpacity;
                        let activatedOpacity = theme.palette.action.hoverOpacity;

                        if (color === 'secondary') {
                            if (mode === 'dark') {
                                themeColor = theme.palette.text.secondary;
                                return {
                                    '&:disabled': {
                                        borderRightColor: 'red',
                                    },
                                    '&:hover': {
                                        borderColor: Color(themeColor).alpha(outlinedBaseOpacity + hoverOpacity).toString(),
                                    },
                                    '&:active': {
                                        borderColor: Color(themeColor).alpha(outlinedBaseOpacity + activatedOpacity).toString(),
                                    },
                                };
                            } else {
                                return {
                                    '&:disabled': {
                                        borderRightColor: 'red',
                                    },
                                    '&:hover': {
                                        borderColor: Color(theme.palette.secondary.dark).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                                    },
                                    '&:active': {
                                        borderColor: Color(theme.palette.secondary.dark).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                    },
                                };
                            }
                        }

                        return {
                            '&:not(:last-of-type)': {
                                '&:hover': {
                                    borderRightColor: themeColor,
                                },
                            },
                        };
                    }),
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
                            borderRadius: theme.shape.borderRadius,
                            padding: 2,
                            backgroundColor: mode === 'dark'
                                ? theme.palette.grey[900]
                                : theme.palette.grey[100],
                            alignItems: 'center',
                        };
                    }),
                    scroller: createStylesWithTheme((theme) => {
                        return {
                            borderRadius: theme.shape.borderRadius,
                        };
                    }),
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

                        return {
                            minHeight: 32,
                            padding: 4,
                            backgroundColor: 'transparent',
                            '&:hover': mode === 'dark'
                                ? {
                                    color: theme.palette.text.primary,
                                    backgroundColor: Color(theme.palette.grey[800])!.lighten(tonalOffset).toString(),
                                }
                                : {
                                    backgroundColor: theme.palette.grey[300],
                                    color: theme.palette.text.primary,
                                },
                            '&:active': {
                                backgroundColor: mode === 'dark'
                                    ? Color(theme.palette.grey[800])!.darken(tonalOffset).toString()
                                    : theme.palette.grey[400],
                                color: theme.palette.text.primary,
                            },
                            '&.Mui-selected': {
                                borderRadius: theme.shape.borderRadius,
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            '.PrivatePickersYear-root': {
                                '& > button': {
                                    borderRadius: theme.shape.borderRadius,
                                },
                            },
                        };
                    }),
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            borderRadius: theme.shape.borderRadius,
                        };
                    }),
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            '& > fieldset': {
                                display: 'none',
                            },
                            '& input': {
                                paddingTop: theme.spacing(1),
                                paddingRight: theme.spacing(0.75),
                                paddingBottom: theme.spacing(1),
                                paddingLeft: theme.spacing(0.75),
                                fontSize: '0.8rem',
                            },
                        };
                    }),
                    sizeSmall: createStylesWithTheme((theme) => {
                        return {
                            '& input': {
                                padding: theme.spacing(0.75),
                                fontSize: '0.6rem',
                            },
                        };
                    }),
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const borderColor = theme.palette.text.primary;
                        const borderActiveColor = theme.palette.primary.main;
                        const mode = theme.palette.mode;

                        return {
                            boxSizing: 'border-box',
                            border: `1px solid ${Color(borderColor)!.alpha(mode === 'dark' ? 0.35 : 0.2)!.toString()}`,

                            '&.Mui-focused': {
                                borderColor: borderActiveColor,
                                outline: `1px solid ${borderActiveColor}`,
                            },

                            '&.Mui-disabled': {
                                borderColor: Color(borderColor)!.alpha(mode === 'dark' ? 0.2 : 0.1)!.toString(),
                            },

                            '&:not(.Mui-disabled):not(.Mui-focused):hover': {
                                borderColor: Color(borderColor)!.alpha(mode === 'dark' ? 0.5 : 0.35)!.toString(),
                            },
                        };
                    }),
                    input: createStylesWithTheme((theme) => {
                        return {
                            padding: theme.spacing(1.25),
                        };
                    }),
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const { outlinedBaseOpacity } = shuffleOptions;
                        const {
                            hoverOpacity,
                            activatedOpacity,
                        } = theme.palette.action;
                        const backgroundColor = theme.palette.grey[600];
                        return {
                            borderRadius: theme.shape.borderRadius / 2,
                            padding: theme.spacing(1),
                            width: '1em',
                            height: '1em',
                            border: '1px solid',
                            borderColor: Color(theme.palette.text.primary).alpha(outlinedBaseOpacity).toString(),
                            marginRight: theme.spacing(1),
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: Color(backgroundColor).alpha(mode === 'dark' ? outlinedBaseOpacity + hoverOpacity : outlinedBaseOpacity - hoverOpacity).toString(),
                                borderColor: Color(theme.palette.text.primary).alpha(mode === 'dark' ? outlinedBaseOpacity - hoverOpacity : outlinedBaseOpacity + hoverOpacity).toString(),
                            },
                            '&:active': {
                                backgroundColor: Color(backgroundColor).alpha(mode === 'dark' ? outlinedBaseOpacity + activatedOpacity : outlinedBaseOpacity - activatedOpacity).toString(),
                            },
                            '&.Mui-disabled': {
                                opacity: 0.5,
                            },
                            '& > svg': {
                                width: '0.75em',
                                height: '0.75em',
                                color: theme.palette.text.primary,
                            },
                        };
                    }),
                    indeterminate: {
                        '& > svg': {
                            width: '0.6em',
                            height: '0.6em',
                        },
                    },
                },
                defaultProps: {
                    checkedIcon: React.createElement(
                        (props) => {
                            return React.createElement(
                                SvgIcon,
                                {
                                    ...props,
                                    viewBox: '0 0 24 24',
                                },
                                React.createElement(
                                    'path',
                                    {
                                        d: 'M9 16.17 5.53 12.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L9 16.17z',
                                    },
                                ),
                            );
                        },
                    ),
                    indeterminateIcon: React.createElement(SquareRoundedIcon),
                    icon: React.createElement(() => null),
                },
            },
            MuiRadio: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const { outlinedBaseOpacity } = shuffleOptions;
                        const {
                            hoverOpacity,
                            activatedOpacity,
                        } = theme.palette.action;
                        const backgroundColor = theme.palette.grey[600];
                        return {
                            width: '1em',
                            height: '1em',
                            borderRadius: '0.6em',
                            padding: theme.spacing(1),
                            border: '1px solid',
                            borderColor: Color(theme.palette.text.primary).alpha(outlinedBaseOpacity).toString(),
                            marginRight: theme.spacing(1),
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: Color(backgroundColor).alpha(mode === 'dark' ? outlinedBaseOpacity + hoverOpacity : outlinedBaseOpacity - hoverOpacity).toString(),
                                borderColor: Color(theme.palette.text.primary).alpha(mode === 'dark' ? outlinedBaseOpacity - hoverOpacity : outlinedBaseOpacity + hoverOpacity).toString(),
                            },
                            '&:active': {
                                backgroundColor: Color(backgroundColor).alpha(mode === 'dark' ? outlinedBaseOpacity + activatedOpacity : outlinedBaseOpacity - activatedOpacity).toString(),
                            },
                            '&.Mui-disabled': {
                                opacity: 0.5,
                            },
                            '&.Mui-checked': {
                                '& > svg': {
                                    width: '0.5em',
                                    height: '0.5em',
                                },
                            },
                            '& > svg': {
                                width: '0.75em',
                                height: '0.75em',
                                color: theme.palette.text.primary,
                            },
                        };
                    }),
                },
                defaultProps: {
                    checkedIcon: React.createElement(CircleRoundedIcon),
                    icon: React.createElement(() => null),
                },
            },
            MuiCollapse: {
                defaultProps: {
                    timeout: 0,
                },
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        return {
                            borderRadius: theme.shape.borderRadius,
                        };
                    }),
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: createStylesWithTheme((theme) => {
                        return {
                            paddingTop: theme.spacing(0.75),
                            paddingBottom: theme.spacing(0.75),
                            paddingLeft: theme.spacing(1),
                            fontSize: '0.8rem',
                        };
                    }),
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
                        borderRadius: '50%',
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
                            borderRadius: 10,
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
                            borderRadius: 8,
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
                            backgroundColor: mode === 'dark' ? theme.palette.grey[900] : 'transparent',
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
                            padding: theme.spacing(1),
                            color: theme.palette.text.secondary,
                        };
                    }),
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: createStyles((data: any) => {
                        const color = data.ownerState.color as string;
                        const theme = data.theme as Theme;
                        const mode = theme.palette.mode;
                        let activatedOpacity = theme.palette.action.activatedOpacity;
                        let disabledOpacity = theme.palette.action.disabledOpacity;
                        let themeColor = (theme.palette[color as keyof Palette] as PaletteColor)?.main || theme.palette.grey[300];

                        if (color === 'standard') {
                            themeColor = mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[400];
                        }

                        let textColor = Color(theme.palette.getContrastText(themeColor)).alpha(1 - activatedOpacity).toString();

                        return {
                            backgroundColor: themeColor,
                            color: textColor,
                            border: 0,
                            '&.Mui-disabled': {
                                border: 0,
                                color: Color(textColor).alpha(disabledOpacity).toString(),
                            },
                            '&.Mui-selected': {
                                '&, &:hover': {
                                    color: Color(textColor).alpha(1).toString(),
                                    backgroundColor: Color(themeColor).darken(tonalOffset * ACTIVE_TONAL_STEP).toString(),
                                },
                            },
                            '&:hover': {
                                color: Color(textColor).alpha(1).toString(),
                                backgroundColor: Color(themeColor).darken(tonalOffset * HOVER_TONAL_STEP).toString(),
                            },
                        };
                    }),
                    sizeSmall: createStylesWithTheme((theme) => {
                        return {
                            padding: `${theme.spacing(0.5)} ${theme.spacing(0.875)}`,
                            fontSize: '0.025rem',
                        };
                    }),
                    sizeMedium: createStylesWithTheme((theme) => {
                        return {
                            padding: `${theme.spacing(0.75)} ${theme.spacing(1.25)}`,
                        };
                    }),
                    sizeLarge: createStylesWithTheme((theme) => {
                        return {
                            padding: `${theme.spacing(1)} ${theme.spacing(1.75)}`,
                        };
                    }),
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;
                        const backgroundHoverColor = mode === 'dark'
                            ? Color(theme.palette.grey[800]).toString()
                            : theme.palette.grey[200];
                        const backgroundActiveColor = mode === 'dark'
                            ? Color(theme.palette.grey[800]).toString()
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
                        const backgroundHoverColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.lighten(tonalOffset).toString()
                            : theme.palette.grey[200];
                        const backgroundActiveColor = mode === 'dark'
                            ? Color(theme.palette.grey[800])!.darken(tonalOffset).toString()
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

                        return {
                            padding: 0,
                            paddingTop: 4,
                            paddingBottom: 4,
                            backgroundColor: mode === 'dark'
                                ? Color(theme.palette.grey[800])!.darken(tonalOffset).toString()
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
                    root: createStylesWithTheme((theme) => {
                        return {
                            overflow: 'hidden',
                            borderRadius: theme.shape.borderRadius,
                        };
                    }),
                    content: createStylesWithTheme((theme) => {
                        const mode = theme.palette.mode;

                        return {
                            color: theme.palette.text.primary,
                            paddingTop: 6,
                            paddingBottom: 6,
                            boxSizing: 'border-box',
                            borderRadius: theme.shape.borderRadius,
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
    }, omit(options, ['palette'])));
};

export default createShuffleTheme;

export {
    createShuffleTheme,
};
