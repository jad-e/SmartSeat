import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton1 = ({ onPress, text, marginTop, marginBottom }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { marginTop: marginTop, marginBottom: marginBottom },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#FFDE59",
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
});

export default CustomButton1;
