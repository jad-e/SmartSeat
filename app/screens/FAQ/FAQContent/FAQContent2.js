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

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
  Header,
} from "../../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../../constants";
const { faq6_1, faq6_2 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent2 = ({ route, navigation }) => {
  //states
  const [shortBreakTimeLimit, setShortBreakTimeLimit] = React.useState(20);
  const [longBreakTimeLimit, setLongBreakTimeLimit] = React.useState(60);
  const [shortBreakCount, setShortBreakCount] = React.useState(10);

  const [lunchHourStart, setLunchHourStart] = React.useState("11:00");
  const [lunchHourEnd, setLunchHourEnd] = React.useState("13:00");

  const [dinnerHourStart, setDinnerHourStart] = React.useState("18:00");
  const [dinnerHourEnd, setDinnerHourEnd] = React.useState("20:00");

  const { title } = route.params;
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />
      <Header backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 25 }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.Gsplashheartdark,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {JSON.parse(JSON.stringify(title))}
          </Text>

          {/* divider */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: COLORS.lightgray3,
              marginBottom: 15,
            }}
          ></View>

          {/* CONTENT */}
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            When you plan to temporarily leave your reserved library seat, you
            are required to select either one of the provided break options.
            There are two main types of break options: long break and short
            break.
          </Text>

          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Long Breaks
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 10 }}
          >
            There are two types of long breaks, namely lunch break and dinner
            break. Each type of long break has a time limit of{" "}
            {longBreakTimeLimit} minutes and can only be used once during the
            specified hours:
          </Text>

          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 5 }}
          >
            1. Lunch hours are from {lunchHourStart} to {lunchHourEnd}.
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            2. Dinner hours are from {dinnerHourStart} to {dinnerHourEnd}.
          </Text>

          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            Additionally, when you are on a long break, the color of your seat
            (in the seat map) will change from{" "}
            <Text style={{ ...FONTS.h4, color: COLORS.red }}>red</Text> to{" "}
            <Text style={{ ...FONTS.h4, color: COLORS.Gblue }}>blue</Text>. This
            means that other students are entitled to temporarily occupy your
            seat while you are away. Thus, please make sure to pack your stuff
            away before leaving for a meal break.
          </Text>

          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Short Breaks
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            In terms of the short break option, it is suitable to be used when
            you only plan to leave the library for a short study break, toilet
            break, or any activity that can be completed within a short amount
            of time. The short break option can be used for a maximum of{" "}
            {shortBreakCount} times during your entire seat reservation period.
            Each short break has a time limit of {shortBreakTimeLimit} minutes.
          </Text>

          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 20 }}>
            Note: To avoid loosing your reserved library seat, you are required
            to return to your seat before the prescribed long/short break time
            limit ends.
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});

export default FAQContent2;
