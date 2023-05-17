import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import React from "react";

import { CustomButton1, Header } from "../../components";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass4 } = images;

import { useNavigation } from "@react-navigation/native";

const ForgotPassword4 = () => {
  const navigation = useNavigation();

  const onSignInPressed = (data) => {
    console.log(data);
    navigation.navigate("SignIn");
  };

  return (
    <>
      <View style={{ height: 55, backgroundColor: COLORS.white }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass4}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Password Changed</Text>

          <Text style={styles.text}>
            Your password has been reset succesfully. Please sign in with the
            new password.
          </Text>

          <CustomButton1
            text="Sign In"
            onPress={onSignInPressed}
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

export default ForgotPassword4;
