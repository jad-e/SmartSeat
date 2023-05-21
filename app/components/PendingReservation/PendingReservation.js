import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
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

const PendingReservation = () => {
  const navigation = useNavigation();

  const onDelayPressed = (data) => {
    console.log("delay");
  };

  const onCancelPressed = (data) => {
    console.log("cancel");
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      {/* map view */}
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height,
          backgroundColor: COLORS.lightgray3,
        }}
      ></View>

      {/* reservation options */}
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 150,
          borderRadius: 20,
          marginHorizontal: 15,
          marginTop: -(SIZES.height / 3),
          paddingTop: 20,
          paddingBottom: 15,
          paddingLeft: 17,
          paddingRight: 17,
          flexDirection: "row",
        }}
      >
        {/* Rev Information, delay, cancel */}
        <View
          style={{
            width: "70%",
            // backgroundColor: COLORS.gray
          }}
        >
          {/* rev info */}
          <View style={{ flexDirection: "column", marginBottom: 25 }}>
            <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 3 }}>
              Peking Library (F2, Seat 4009)
            </Text>

            <Text style={{ color: COLORS.gray }}>
              Check-in your seat by 15:01
            </Text>
          </View>

          {/* delay & cancel buttons */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <CustomButton1
              text="Delay"
              onPress={onDelayPressed}
              marginTop={0}
              marginBottom={0}
              borderRadius={5}
              width="40%"
            />
            <View style={{ width: 17 }} />
            <CustomButton1
              text="Cancel"
              onPress={onCancelPressed}
              marginTop={0}
              marginBottom={0}
              borderRadius={5}
              width="40%"
            />
          </View>
        </View>
        {/* Check in */}
        <View
          style={{
            width: "30%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            // backgroundColor: COLORS.darkgray,
          }}
        >
          <Pressable
            onPress={() => console.log("check-in")}
            style={{
              borderWidth: 7.5,
              borderColor: "#fffdaf",
              borderRadius: 1000,
              backgroundColor: COLORS.primary,
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={icons.scan} style={{ height: 20, width: 20 }} />
          </Pressable>
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

export default PendingReservation;
