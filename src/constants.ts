import Color from 'color';

export const COLOR_CHANGE_LEVEL = 0.1;
export const COLOR_ACTIVE_LEVEL = 0.3;

export const PRIMARY_COLOR = '#2185d0';
export const SECONDARY_COLOR = '#3e3f40';

export const PRIMARY_COLOR_LIGHT = Color(PRIMARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString();
export const PRIMARY_COLOR_DARK = Color(PRIMARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_COLOR_LIGHT = Color(SECONDARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_COLOR_DARK = Color(SECONDARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_TEXT_COLOR = Color.rgb(0, 0, 0).alpha(0.6).toString();
export const BUTTON_DEFAULT_BACKGROUND_COLOR = '#ededed';
