import { Theme } from "./theme";

type ThemeInterface = typeof Theme;

declare module "styled-components/native" {
  interface DefaultTheme extends ThemeInterface {}
}
