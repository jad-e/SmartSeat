import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";

import { CustomButton1, CustomInput, Header } from "../../components";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass1 } = images;

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const ForgotPassword1 = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onSendPressed = (data) => {
    console.log(data);
    navigation.navigate("ForgotPassword2");
  };

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass1}
            style={[styles.image, { height: SIZES.height * 0.3 }]}
            resizeMode="contain"
          />
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.text}>
            Enter your account username and we will send a verification code to
            your student email address.
          </Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            secureTextEntry={false}
            rules={{ required: "Username is required." }}
            marginTop={0}
            marginBottom={0}
          />

          <CustomButton1
            text="Send"
            onPress={handleSubmit(onSendPressed)}
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

export default ForgotPassword1;
