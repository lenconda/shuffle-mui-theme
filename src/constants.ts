import Color from 'color';

export const COLOR_CHANGE_LEVEL = 0.075;
export const COLOR_ACTIVE_LEVEL = 0.175;

export const PRIMARY_COLOR = '#2185d0';
export const SECONDARY_COLOR = '#3e3f40';
export const BUTTON_DEFAULT_BACKGROUND_COLOR = '#ededed';
export const BUTTON_DEFAULT_TEXT_COLOR = Color.rgb(0, 0, 0).alpha(0.6).toString();
export const OUTLINED_BUTTON_BORDER_COLOR = Color.rgb(34, 36, 38).alpha(0.15).toString();
export const OUTLINED_BUTTON_BORDER_HOVER_COLOR = Color(OUTLINED_BUTTON_BORDER_COLOR).alpha(0.35).toString();
export const ICON_BUTTON_HOVER_BG_COLOR = Color.rgb(90, 93, 94).alpha(0.1).toString();

export const PRIMARY_COLOR_LIGHT = Color(PRIMARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString();
export const PRIMARY_COLOR_DARK = Color(PRIMARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_COLOR_LIGHT = Color(SECONDARY_COLOR).lighten(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_COLOR_DARK = Color(SECONDARY_COLOR).darken(COLOR_CHANGE_LEVEL).toString();
export const SECONDARY_TEXT_COLOR = BUTTON_DEFAULT_TEXT_COLOR;

export const OUTLINED_BUTTON_ACTIVE_SHADOW_COLOR = Color.rgb(34, 36, 38).alpha(0.1).toString();
export const TAB_ACTIVE_SHADOW_COLOR = Color.rgb(0, 0, 0).alpha(0.08).toString();
