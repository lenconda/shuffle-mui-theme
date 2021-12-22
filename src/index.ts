import {
    createTheme,
    createStyles,
} from '@mui/material';
import {
    // BUTTON_DEFAULT_BACKGROUND_COLOR,
    COLOR_CHANGE_LEVEL,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    SECONDARY_TEXT_COLOR,
} from './constants';
import Color from 'color';

const createMuiTheme = () => {
    return createTheme({
        palette: {
            primary: {
                main: PRIMARY_COLOR,
                light: Color(PRIMARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString(),
                dark: Color(PRIMARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString(),
            },
            secondary: {
                main: SECONDARY_COLOR,
                light: Color(SECONDARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString(),
                dark: Color(SECONDARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString(),
                contrastText: SECONDARY_TEXT_COLOR.toString(),
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
                            // TODO
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'red',
                            },
                        }),
                    },
                ],
            },
        },
    });
};

export default createMuiTheme();
