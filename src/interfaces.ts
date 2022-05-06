export interface CreateThemeOptions {
    mode?: 'light' | 'dark';
    variants?: {
        primary?: string;
        secondary?: string;
        error?: string;
        info?: string;
        success?: string;
        warning?: string;
    };
    presets?: {
        borderColor?: string;
        changeLevel?: number;
        changeLevelStep?: number;
        borderRadius?: number;
        padding?: number;
    };
}
