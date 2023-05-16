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
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass4}
            style={[styles.image, { height: SIZES.height * 0.3 }]}
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
});

export default ForgotPassword4;
