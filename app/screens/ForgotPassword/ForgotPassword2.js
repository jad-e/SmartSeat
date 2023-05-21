import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  TextInput,
  StatusBar,
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

import { useNavigation, useIsFocused } from "@react-navigation/native";

const CODE_REGEX = /^\d{4}$/;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

// start
const ForgotPassword2 = () => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  const onVerifyPressed = () => {
    //validation
    if (!CODE_REGEX.test(otp[1] + otp[2] + otp[3] + otp[4])) {
      console.log(otp[1] + otp[2] + otp[3] + otp[4]);
      setError(true);
    } else {
      //no error then navigate to next screen
      setError(false);
      console.log(otp);
      navigation.navigate("ForgotPassword3");
    }
  };

  const onResendPressed = () => {
    ToastAndroid.showWithGravity(
      "Resent verification code!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass2}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.title, { ...FONTS.h1 }]}>Verification</Text>

          <Text style={[styles.text, { ...FONTS.body3a }]}>
            Enter the 4-digit code that was sent to your student email address.
          </Text>

          <View style={styles.otp_container}>
            <View
              style={[
                styles.otp_box,
                { borderColor: error ? "red" : "#f0f0f0" },
              ]}
            >
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

            <View
              style={[
                styles.otp_box,
                { borderColor: error ? "red" : "#f0f0f0" },
              ]}
            >
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

            <View
              style={[
                styles.otp_box,
                { borderColor: error ? "red" : "#f0f0f0" },
              ]}
            >
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

            <View
              style={[
                styles.otp_box,
                { borderColor: error ? "red" : "#f0f0f0" },
              ]}
            >
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

          {error && (
            <Text style={styles.error}>
              Verification code should contain 4 numbers.
            </Text>
          )}

          <CustomButton1
            text="Verify"
            onPress={onVerifyPressed}
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
    color: "#051C60",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    color: "gray",
    marginBottom: 50,
  },
  otp_container: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otp_box: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderColor: "#f0f0f0",
    borderWidth: 0.5,
  },
  otp_text: {
    fontSize: 25,
    fontFamily: "Roboto-Regular",
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  error: {
    color: "red",
    alignSelf: "stretch",
    marginLeft: 13,
    marginTop: 5,
  },
});

export default ForgotPassword2;
