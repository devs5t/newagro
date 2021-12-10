interface ImportMetaEnv {
  readonly VITE_MOBILE_BREAKPOINT_SIZE: string;
  readonly VITE_ASIDE_MINIMIZE_BREAKPOINT_SIZE: string;
  readonly VITE_META_DESC: string;

  readonly VITE_MODERN_DESGIN: string;
  readonly VITE_ASIDE_TOUCH_STATUS: string;

  readonly VITE_DARK_MODE: string;

  readonly VITE_ASIDE_WIDTH_PX: string;
  readonly VITE_SPACER_PX: string;

  readonly VITE_PRIMARY_COLOR: string;
  readonly VITE_SECONDARY_COLOR: string;
  readonly VITE_SUCCESS_COLOR: string;
  readonly VITE_INFO_COLOR: string;
  readonly VITE_WARNING_COLOR: string;
  readonly VITE_DANGER_COLOR: string;
  readonly VITE_LIGHT_COLOR: string;
  readonly VITE_DARK_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
