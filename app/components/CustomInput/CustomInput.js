import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

import { COLORS } from "../../constants";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  marginTop,
  marginBottom,
  keyboardType = "default",
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              {
                borderColor: error ? "red" : "#f0f0f0",
                marginTop: marginTop,
                marginBottom: marginBottom,
              },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text style={styles.error}>{error.message || "Error."}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: 45,
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 25,
  },
  input: {
    paddingTop: 7,
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 20,
  },
  error: {
    color: "red",
    alignSelf: "stretch",
    marginLeft: 13,
    marginTop: 5,
  },
});

export default CustomInput;
