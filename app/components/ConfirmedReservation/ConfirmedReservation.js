import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";

import DropShadow from "react-native-drop-shadow";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

const ConfirmedReservation = () => {
  const navigation = useNavigation();

  const onLunchPressed = (data) => {
    console.log("lunch");
  };

  const onDinnerPressed = (data) => {
    console.log("dinner");
  };

  const onShortPressed = (data) => {
    console.log("short");
  };

  const onWithdrawPressed = (data) => {
    console.log("withdraw");
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
          alignItems: "center",
        },
      ]}
    >
      {/* seat info */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: 20,
          height: 70,
          width: "85%",
          marginTop: 20,
          marginBottom: 35,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 17,
          paddingRight: 17,
        }}
      >
        <Text>Title</Text>
        <Text>description</Text>
      </View>
      <Text style={{ ...FONTS.body3, marginBottom: 20 }}>Studying ...</Text>
      <Image
        source={profilepic}
        style={{ height: 200, width: 200, marginBottom: 50 }}
      />

      <View style={{ flexDirection: "column", width: "85%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <CustomButton2
            text="Lunch Break"
            onPress={onLunchPressed}
            marginTop={20}
            marginBottom={0}
            width="40%"
          />
          <CustomButton2
            text="Dinner Break"
            onPress={onDinnerPressed}
            marginTop={20}
            marginBottom={0}
            width="40%"
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <CustomButton2
            text="Short Break"
            onPress={onShortPressed}
            marginTop={10}
            marginBottom={0}
            width="40%"
          />
          <CustomButton2
            text="Withdraw"
            onPress={onWithdrawPressed}
            marginTop={10}
            marginBottom={0}
            width="40%"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default ConfirmedReservation;
