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

const RevViolateTimelineComp = ({ time, date, violation }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 6,
          marginTop: 5,
          width: 304,
        }}
      >
        <Text style={{ ...FONTS.body4a, color: COLORS.white }}>
          {time}
          {"    "}
          {date}
        </Text>
        <Text
          style={{
            ...FONTS.body4a,
            color: COLORS.white,
            marginBottom: 10,
          }}
        >
          Violation Record:{" "}
          {violation == 1
            ? "Failure to check-in at a library seat within the prescribed reservation time limit."
            : violation == 2
            ? "Failure to return to a library seat within the prescribed break time limit."
            : "Did not select a break option or tap on the seat withdrawal button when leaving a reserved library seat."}
        </Text>
      </View>
    </>
  );
};

export default RevViolateTimelineComp;
