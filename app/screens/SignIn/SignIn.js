import { View, Image, StyleSheet, ScrollView } from "react-native";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Constants
import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { applogo1, applogo2 } = images;

const SignIn = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = (data) => {
    console.log(data);

    navigation.navigate("Home");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword1");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={applogo2}
          style={[styles.logo, { height: SIZES.height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="Username"
          secureTextEntry={false}
          control={control}
          rules={{ required: "Username is required." }}
          marginTop={0}
          marginBottom={0}
        />

        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry={true}
          rules={{ required: "Password is required." }}
          marginTop={20}
          marginBottom={0}
        />

        <CustomButton1
          text="SIGN IN"
          onPress={handleSubmit(onSignInPressed)}
          marginTop={35}
          marginBottom={20}
        />

        <CustomButton3
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          marginTop={0}
          marginBottom={0}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 35,
    width: SIZES.width,
    height: SIZES.height,
  },
  logo: {
    marginTop: 60,
    marginBottom: 25,
    width: "80%",
    maxWidth: 500,
    height: 100,
    maxHeight: 200,
  },
});

export default SignIn;
