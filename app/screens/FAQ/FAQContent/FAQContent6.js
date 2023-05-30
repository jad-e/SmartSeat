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
const { faq6_1 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent6 = ({ route, navigation }) => {
  //states
  const [vioCount, setVioCount] = React.useState(3);
  const [blackPeriod, setBlackPeriod] = React.useState(4);

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
            To ensure the fair use of the library seat resources, violation
            records and blacklists will be supplied to students who intend to
            misuse the SmartSeat system.
          </Text>

          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Violation Records
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 10 }}
          >
            A student will be supplied with a violation record if he/she was
            found guilty of either one of the following behaviours:
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 5 }}
          >
            1. Failure to check-in at a library seat within the prescribed
            reservation time limit.
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 5 }}
          >
            2. Failure to return to a library seat within the prescribed break
            time limit.
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            3. Did not select a break option or tap on the seat withdrawal
            button when leaving a reserved library seat.
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Blacklists
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            For students who have accumulated a total of {vioCount} violation
            records, he/she will be blacklisted by the librarian. A blacklisted
            student will be barred from using the SmartSeat application for{" "}
            {blackPeriod} weeks.
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Violation and Blacklist Count
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            To keep track of your total number of violation records and
            blacklists, you may head to your Profile page.
          </Text>
          <Image
            source={faq6_1}
            style={{
              marginBottom: 20,
              width: 550,
              height: 550,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
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

export default FAQContent6;
