import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  //MAIN THEME 1 - FOREST APP
  Fprimary: "",
  Fsecondary: "",

  //MAIN THEME 2 -  GRAB APP

  appmain: "#35C073", //app icon, logo, onboarding, etc....

  Gsplashlight: "#DCFDDF",
  Gsplashmain: "#1BC061",
  Gsplashheartlight: "#0EB250",
  Gsplashheartdark: "#0A804A",

  Gheader: "#35C073",

  Gfeaturebackground: "#CBEEDB",

  Gtabs: "#35C073",

  Gnotitabselected: "#005239",
  Gnotitabunselected: "#EEF8FA",
  Giconorangefore: "#F4670B",
  Giconorangeback: "#FFF4EA",
  gicongreenfore: "#02B14F",
  Gicongreenback: "#DAFBDD",

  Gbuttonbackground1_positiveback: "#35C073", //type 1 (full btn)
  Gbuttonbackground1_positivefore: "#FFFFFF", //type 1 (full btn)
  Gbuttonbackground1_negativeback: "#EEF8FA", //type 1 (full btn)
  Gbuttonbackground1_negativefore: "#00533B", //type 1 (full btn)

  Gbuttonbackground2: "", //type 2
  Gbuttonbackground3_green: "#0ECF72", //type 3 (link btn)
  Gbuttonbackground3_blue: "#0870DF", //type 3 (link btn)

  Glightbluebackground: "#EBF9FF",
  Gblue: "#0D70D5",
  Gdarkerblue: "#3464C3",

  Gnewtagred: "#ED6252",

  // GENERAL COLORS
  gray: "#a6a6a6",
  lightgray1: "#FAFAFA",
  lightgray2: "#F5F5F5",
  lightgray3: "#ECECEC",
  lightgray4: "#DEDEDE",
  lightgray5: "#D4D4D4",
  darkgray: "#5f5f5f",

  orange: "#FFA500",

  purple: "#6B3CE9",
  lightpurple: "#F3EFFF",

  black: "#1E1F20",
  white: "#FFFFFF",

  green: "#24C16B",
  lightGreen: "#E6FEF0",

  lime: "#00BA63",
  emerald: "#2BC978",

  red: "#FF4134",
  lightRed: "#FFF1F0",

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
  body3a: 15,
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
  body3a: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3a,
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
