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

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

const BarTimelineComp = ({ icon, circleBgColor, barColor, height }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: circleBgColor,
            borderRadius: 1000,
            height: 30,
            width: 30,
            borderWidth: 2,
            borderColor: barColor,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={icon} style={{ height: 18, width: 18 }} />
        </View>
        <View style={{ height: height, backgroundColor: barColor, width: 5 }} />
      </View>
    </>
  );
};

export default BarTimelineComp;
