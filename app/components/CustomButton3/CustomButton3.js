import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton3 = ({ onPress, text, marginTop, marginBottom }) => {
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
    alignItems: "center",
    borderRadius: 25,
  },
  text: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 15,
  },
});

export default CustomButton3;
