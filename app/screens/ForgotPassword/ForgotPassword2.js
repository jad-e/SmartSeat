import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";

import {
  CustomButton1,
  CustomButton3,
  CustomInput,
  Header,
} from "../../components";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass2 } = images;

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const CODE_REGEX = /^\d{4}$/;

const ForgotPassword2 = () => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });

  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onVerifyPressed = (data) => {
    console.log(data);

    console.log(otp);

    navigation.navigate("ForgotPassword3");
  };

  const onResendPressed = (data) => {
    console.log("resend pressed");

    ToastAndroid.showWithGravity(
      "Resent verification code!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass2}
            style={[styles.image, { height: SIZES.height * 0.3 }]}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verification</Text>

          <Text style={styles.text}>
            Enter the 4 digit code that was sent to your student email address.
          </Text>

          <CustomInput
            name="code"
            control={control}
            placeholder="Verification Code"
            secureTextEntry={false}
            rules={{
              required: "Verification code is required.",
              minLength: {
                value: 4,
                message: "Verification code should be 4 numbers long.",
              },
              maxLength: {
                value: 4,
                message: "Verification code should be 4 numbers long.",
              },
              pattern: {
                value: CODE_REGEX,
                message: "Verification code should contain numbers only.",
              },
            }}
            marginTop={0}
            marginBottom={0}
            keyboardType="numeric"
          />

          <View style={styles.otp_container}>
            <View style={styles.otp_box}>
              <TextInput
                style={styles.otp_text}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                }}
              />
            </View>

            <View style={styles.otp_box}>
              <TextInput
                style={styles.otp_text}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>

            <View style={styles.otp_box}>
              <TextInput
                style={styles.otp_text}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>

            <View style={styles.otp_box}>
              <TextInput
                style={styles.otp_text}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  !text && thirdInput.current.focus();
                }}
              />
            </View>
          </View>

          <CustomButton1
            text="Verify"
            onPress={handleSubmit(onVerifyPressed)}
            marginTop={35}
            marginBottom={20}
          />

          <CustomButton3
            text="Resend code"
            onPress={onResendPressed}
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
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 35,
    width: SIZES.width,
    height: SIZES.height,
  },
  image: {
    marginTop: 10,
    marginBottom: 25,
    width: "80%",
    maxWidth: 500,
    height: 100,
    maxHeight: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 10,
  },
  text: {
    alignSelf: "stretch",
    color: "gray",
    paddingLeft: 16,
    marginBottom: 50,
  },
  otp_container: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otp_box: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
  otp_text: {
    fontSize: 25,
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});

export default ForgotPassword2;
