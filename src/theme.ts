import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

import {
  primaryColor,
  primaryLightColor,
  secondaryColor,
} from "./utils/consts";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
// const styles = {
//   global: (props: any) => ({
//     body: {
//       color: mode('gray.800', 'whiteAlpha.900')(props),
//       bg: mode('#040404', '#141214')(props),
//     },
//   }),
// };
const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: any) => ({
      dialog: {
        // bg: mode('gray.600', '#141214')(props),
        color: mode('gray.600', '#141214')(props),

      },
    }),
  },
};
const theme = extendTheme({
  config,
  // styles,
  components,
  colors: {
    primary: {
      50: primaryColor,
      100: primaryLightColor,
      200: primaryColor,
      300: primaryColor,
      400: primaryColor,
      500: primaryColor,
      600: primaryColor,
      700: primaryColor,
      800: primaryColor,
      900: primaryColor,
    },
    seconday: {
      50: secondaryColor,
      100: secondaryColor,
      200: secondaryColor,
      300: secondaryColor,
      400: secondaryColor,
      500: secondaryColor,
      600: secondaryColor,
      700: secondaryColor,
      800: secondaryColor,
      900: secondaryColor,
    },
  },
});

export default theme;
