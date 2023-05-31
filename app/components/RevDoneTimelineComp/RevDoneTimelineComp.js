import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const {
  timelinecardcircle,
  studycomplete1,
  studycomplete2,
  studycomplete3,
  studycomplete4,
  studycomplete5,
  studycomplete6,
} = images;

const RevDoneTimelineComp = ({
  date,
  timeStart,
  timeEnd,
  libraryName,
  seatNum,
}) => {
  //supporting funcs
  const randomImg = () => {
    let randomNum = Math.floor(Math.random() * 6) + 1;

    if (randomNum == 1) {
      return studycomplete1;
    } else if (randomNum == 2) {
      return studycomplete2;
    } else if (randomNum == 3) {
      return studycomplete3;
    } else if (randomNum == 4) {
      return studycomplete4;
    } else if (randomNum == 5) {
      return studycomplete5;
    } else return studycomplete6;
  };

  const calcDuration = (start, end) => {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
      (hours <= 9 ? "0" : "") +
      hours +
      " hr " +
      (minutes <= 9 ? "0" : "") +
      minutes +
      " min"
    );
  };

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
          {timeEnd}
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
          Successfully completed a study session.
        </Text>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: COLORS.Ftimeline_cardbackground,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 140,
            width: 290,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 7,
            }}
          >
            <Text
              style={{ ...FONTS.body5, color: COLORS.white, marginRight: 15 }}
            >
              {timeStart} - {timeEnd}
            </Text>
            <Image
              source={icons.time}
              style={{
                height: 13.5,
                width: 13.5,
                tintColor: COLORS.white,
                marginRight: 7,
              }}
            />
            <Text style={{ ...FONTS.body5, color: COLORS.white }}>
              {calcDuration(timeStart, timeEnd)}
            </Text>
          </View>
          <ImageBackground
            source={timelinecardcircle}
            style={{
              height: 85,
              width: 85,
              borderRadius: 1000,
              marginTop: 10,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={randomImg()}
              style={{
                height: 52,
                width: 52,
              }}
            />
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.white,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            height: 35,
            width: 290,
            alignItems: "center",
          }}
        >
          <Image
            source={icons.placeholder4}
            style={{ height: 15, width: 15, marginRight: 5, marginLeft: 10 }}
          />
          <Text
            style={{
              ...FONTS.h4,
              fontSize: 12,
              color: COLORS.black,
              marginRight: 10,
            }}
          >
            {libraryName}
          </Text>
          <Image
            source={icons.armchair}
            style={{ height: 15, width: 15, marginRight: 5 }}
          />
          <Text style={{ ...FONTS.h4, fontSize: 12, color: COLORS.black }}>
            {seatNum}
          </Text>
        </View>
      </View>
    </>
  );
};

export default RevDoneTimelineComp;
