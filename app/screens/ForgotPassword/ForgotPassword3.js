import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import React from "react";

import {
  CustomButton1,
  CustomButton3,
  CustomInput,
  Header,
} from "../../components";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass3 } = images;

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^-_ ])[A-Za-z\d#$@!%&*?^-_ ]{8,30}$/;

const ForgotPassword3 = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("new-password"); //watch the new password field

  const onResetPasswordPressed = (data) => {
    console.log(data);

    // reset password back to sign in screen

    navigation.navigate("ForgotPassword4");
  };

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass3}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.text}>
            The new password must be 8-30 characters long and should include a
            combination of uppercase and lowercase letters, numbers, and special
            characters.
          </Text>

          <CustomInput
            name="new-password"
            control={control}
            placeholder="New Password"
            secureTextEntry={true}
            rules={{
              required: "New password is required.",
              pattern: {
                value: PASS_REGEX,
                message: "New password does not match the stated requirements.",
              },
            }}
            marginTop={0}
            marginBottom={0}
          />

          <CustomInput
            name="confirm-password"
            control={control}
            placeholder="Confirm Password"
            secureTextEntry={true}
            rules={{
              required: "Password confirmation is required.",
              validate: (value) => value === pwd || "Passwords do not match.",
            }}
            marginTop={20}
            marginBottom={0}
          />

          <CustomButton1
            text="Reset Password"
            onPress={handleSubmit(onResetPasswordPressed)}
            marginTop={35}
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
  image: {
    width: 250,
    height: 250,
    marginTop: -40,
    marginBottom: -5,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    marginBottom: 50,
  },
});

export default ForgotPassword3;
