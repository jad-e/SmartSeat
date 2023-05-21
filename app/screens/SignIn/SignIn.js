import { View, Image, StyleSheet, ScrollView, StatusBar } from "react-native";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import React, { useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Constants
import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { applogo1, applogo2 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

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
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={applogo2} style={styles.logo} resizeMode="contain" />

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
            text="Sign In"
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 35,
    width: SIZES.width,
    height: SIZES.height,
  },
  logo: {
    marginTop: 50,
    marginBottom: 25,
    width: 250,
    height: 250,
  },
});

export default SignIn;
