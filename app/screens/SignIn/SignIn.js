import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from "react-native";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Constants
import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { applogo1, applogo2 } = images;

//hooks
import { useStudentLogin } from "../../hooks/useStudentLogin";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const SignIn = () => {
  const navigation = useNavigation();

  const { login, error, isLoading } = useStudentLogin();
  const { studentUser } = useStudentAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  //check if already signed in last time
  useEffect(() => {
    if (studentUser) {
      //if studentUser is NOT null
      console.log("Check if user is already logged in: " + studentUser);
      reset();
      navigation.navigate("Home");
    }
  }, [studentUser]);

  const onSignInPressed = async (data, e) => {
    e.preventDefault();

    await login(data.username, data.password);
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
            disabled={isLoading}
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
