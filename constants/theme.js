import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#25cf7a",
    background: "#FFF",
    text: "#000",
    card: "#F2F2F7",
    accent: "#81D4FA",
    purple: "#BE9FE1",
    green: "#25cf7a", 
    red: "#F95A2C",
    gray: "#737582", 
    extraLightGray: "#F2F2F7", 
    lightGray: "#DCDCE2", 
    mediumGray: "#A3A3A3",
    border: "#F2F2F7",
    white: "#fff",
    black: "#000",
    opposite: "#18191F",
    blue:"#1f8bcc",
    lightGreen:'#46c9bb',
    yellow:'#fbbc04'
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#25cf7a",
    background: "#18191F",
    text: "#FFFFFF",
    card: "#222",
    accent: "#81D4FA",
    purple: "#BE9FE1",
    green: "#25cf7a", 
    red: "#F95A2C",
    gray: "#737582", 
    extraLightGray: "#F2F2F7", 
    lightGray: "#DCDCE2", 
    mediumGray: "#A3A3A3",
    border: "#222",
    white: "#fff",
    black: "#000",
    opposite: "#FFF",
        blue:"#1f8bcc",
    lightGreen:'#46c9bb',
    yellow:'#fbbc04'

  },
};
