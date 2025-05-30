// theme/themeConfig.ts
import { theme as antdTheme, type ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#0ac9c2",
    colorInfo: "#0ac9c2",
    sizeUnit: 4,
    sizeStep: 4,
    borderRadius: 4,
  },
  algorithm: antdTheme.compactAlgorithm,
};

export default theme;
