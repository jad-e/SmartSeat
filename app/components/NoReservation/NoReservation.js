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
const { park, bench, windy } = images;

const NoReservation = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Image
        source={park}
        style={{ height: 150, width: 150, marginBottom: 20, marginTop: -50 }}
      />
      <Text
        style={{
          ...FONTS.body4,
          color: COLORS.black,
          width: 250,
          textAlign: "center",
        }}
      >
        You currently don't have a pending seat reservation.
      </Text>
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

export default NoReservation;
