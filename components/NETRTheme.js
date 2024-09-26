import { StyleSheet } from "react-native";

export const NETRTheme = {
  dark: false,
  colors: {
    primary: "#1B998B",
    background: "#DCE2C8",
    card: "#DCE2C8",
    text: "#000",
    border: "#DCE2C8",
    notification: "#000",
  },
};

export const HONEYDEW = "#f8ffef";
export const PURPLE = "#675671";
export const TEAL = "#1B998B";
export const GREY = "#6B818C";
export const RED = "#C83E4D";
export const PEACH = "#F4D6CC";
export const YELLOW = "#F4B860";
export const EGGPLANT = "#713E5A";
export const CORAL = "#EF767A";

export const colorSelect = [
  { key: "1", value: "Honeydew", color: HONEYDEW },
  { key: "2", value: "Purple", color: PURPLE },
  { key: "3", value: "Teal", color: TEAL },
  { key: "4", value: "Grey", color: GREY },
  { key: "5", value: "Red", color: RED },
  { key: "6", value: "Peach", color: PEACH },
  { key: "7", value: "Yellow", color: YELLOW },
  { key: "8", value: "Coral", color: CORAL },
];

export function getColorByValue(value) {
  const selectedColor = colorSelect.find((item) => item.value === value);
  // If no color is found, default to a color or log an error
  if (!selectedColor) {
    console.error(`No color found for value: ${value}`);
    return GREY; // Default to GREY or any other fallback color
  }
  return selectedColor.color;
}

export function colorChanger(color) {
  if (color === "Purple") {
    colorChanged = styles.purpleBC;
  } else if (color === "Teal") {
    colorChanged = styles.tealBC;
  } else if (color === "Grey") {
    colorChanged = styles.greyBC;
  } else if (color === "Red") {
    colorChanged = styles.redBC;
  } else if (color === "Peach") {
    colorChanged = styles.peachBC;
  } else if (color === "Yellow") {
    colorChanged = styles.yellowBC;
  } else if (color === "Coral") {
    colorChanged = styles.coralBC;
  } else {
    colorChanged = styles.honeydewBC;
  }
  return colorChanged;
}

const styles = StyleSheet.create({
  honeydewBC: {
    backgroundColor: HONEYDEW,
  },
  purpleBC: {
    backgroundColor: PURPLE,
    color: HONEYDEW,
  },
  tealBC: {
    backgroundColor: TEAL,
  },
  greyBC: {
    backgroundColor: GREY,
  },
  redBC: {
    backgroundColor: RED,
  },
  peachBC: {
    backgroundColor: PEACH,
  },
  yellowBC: {
    backgroundColor: YELLOW,
  },
  coralBC: {
    backgroundColor: CORAL,
  },
});
