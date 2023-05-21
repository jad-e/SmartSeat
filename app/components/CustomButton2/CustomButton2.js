import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton2 = ({
  onPress,
  text,
  marginTop,
  marginBottom,
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
        { marginTop: marginTop, marginBottom: marginBottom, width: width },
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
    borderColor: "#FFDE59",
    borderWidth: 2,
    backgroundColor: "#ffffdc",
  },

  text: {
    color: "#FFDE59",
  },
});

export default CustomButton2;
