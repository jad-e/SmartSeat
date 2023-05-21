import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton3 = ({
  onPress,
  text,
  marginTop,
  marginBottom,
  fontSize = 15,
  fontFamily = "Roboto-Bold",
  lineHeight = 22,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { marginTop: marginTop, marginBottom: marginBottom },
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
    width: "100%",
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    color: "grey",
  },
});

export default CustomButton3;
