import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton1 = ({
  onPress,
  text,
  marginTop,
  marginBottom,
  borderRadius = 25,
  backgroundColor = "#FFDE59",
  fontSize = 15,
  fontFamily = "Roboto-Bold",
  lineHeight = 22,
  width = "100%",
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
          styles.text,
          {
            fontSize: fontSize,
            fontFamily: fontFamily,
            lineHeight: lineHeight,
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
    backgroundColor: "#FFDE59",
  },
  text: {
    color: "black",
  },
});

export default CustomButton1;
