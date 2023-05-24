import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CustomButton1 = ({
  onPress,
  text,
  marginTop,
  marginBottom,
  borderRadius = 25,
  backgroundColor = COLORS.Gbuttonbackground1_positiveback,
  fontSize = 15,
  fontFamily = "Roboto-Bold",
  lineHeight = 22,
  width = "100%",
  color = COLORS.Gbuttonbackground1_positivefore,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          width: width,
        },
      ]}
    >
      <Text
        style={[
          {
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
            color: color,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: COLORS.Gbuttonbackground1_positiveback,
  },
});

export default CustomButton1;
