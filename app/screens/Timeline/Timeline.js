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
  Header,
  RevDoneTimelineComp,
  RevViolateTimelineComp,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Timeline = () => {
  const timelineData = [
    {
      id: 1,
      timeStart: "05:49",
      timeEnd: "06:14",
      date: "19 May 2023",
      violation: true,
      violationType: 1,
    },
    {
      id: 2,
      timeStart: "05:49",
      timeEnd: "06:14",
      date: "19 May 2023",
      violation: false,
      violationType: 0,
    },
    {
      id: 3,
      timeStart: "05:49",
      timeEnd: "06:14",
      date: "25 May 2023",
      violation: true,
      violationType: 2,
    },
    {
      id: 4,
      timeStart: "05:49",
      timeEnd: "06:14",
      date: "29 May 2023",
      violation: false,
      violationType: 0,
    },
    {
      id: 4,
      timeStart: "05:49",
      timeEnd: "06:14",
      date: "29 May 2023",
      violation: true,
      violationType: 3,
    },
  ];

  const [timeline, setTimeline] = React.useState(timelineData);

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />

      {/* do flatlist, remove scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}></View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    flex: 1,
    paddingHorizontal: 15,
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

export default Timeline;
