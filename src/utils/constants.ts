export const asideMinimizeBreakpointSize = parseInt(
  import.meta.env.VITE_ASIDE_MINIMIZE_BREAKPOINT_SIZE,
  10
);
export const asideWidthPx = parseInt(import.meta.env.VITE_ASIDE_WIDTH_PX, 10);
export const mobileBreakpointSize = parseInt(
  import.meta.env.VITE_MOBILE_BREAKPOINT_SIZE,
  10
);
export const isModernDesign = import.meta.env.VITE_MODERN_DESGIN === "true";
export const isDarkMode = import.meta.env.VITE_DARK_MODE === "true";
export const spacerPx = parseInt(import.meta.env.VITE_SPACER_PX, 10);
export const storybookURL = import.meta.env.VITE_STORYBOOK_URL;

export const primaryColor = import.meta.env.VITE_PRIMARY_COLOR;
export const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR;
export const successColor = import.meta.env.VITE_SUCCESS_COLOR;
export const infoColor = import.meta.env.VITE_INFO_COLOR;
export const warningColor = import.meta.env.VITE_WARNING_COLOR;
export const dangerColor = import.meta.env.VITE_DANGER_COLOR;
export const asideTouchStatus =
  import.meta.env.VITE_ASIDE_TOUCH_STATUS === "true";
