import { ThemeProps } from "styled-components";
import { Theme } from "@mui/material";

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { palette: any };
};
