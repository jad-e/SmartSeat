import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#FFDE59", // logo color yellow
  secondary: "#ffffdc", // lighter yellow

  black: "#1E1F20",
  white: "#FFFFFF",

  green: "#24C16B",
  lightGreen: "#E6FEF0",

  lime: "#00BA63",
  emerald: "#2BC978",

  red: "#FF4134",
  lightRed: "#FFF1F0",

  orange: "#FFA500",

  purple: "#6B3CE9",
  lightpurple: "#F3EFFF",

  gray: "#a6a6a6",
  lightgray1: "#FAFAFA",
  lightgray2: "#F5F5F5",
  lightgray3: "#ECECEC",
  lightgray4: "#DEDEDE",
  lightgray5: "#D4D4D4",
  darkgray: "#5f5f5f",

  blue: "#0682FE",

  transparent: "transparent",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h2a: 20,
  h2b: 19,
  h2c: 18,
  h2d: 17,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14, // normal text
  body4a: 13,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h2a: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2a, lineHeight: 30 },
  h2b: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2b, lineHeight: 30 },
  h2c: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2c, lineHeight: 30 },
  h2d: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2d, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body4a: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4a,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
