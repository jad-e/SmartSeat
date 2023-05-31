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
const { faq8_1, faq8_2, faq8_3 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent8 = ({ route, navigation }) => {
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
            If you have encountered any problems with the SmartSeat app, you may
            submit your feedback to us by going to Profile &gt; Submit a
            Suggestion.
          </Text>
          <Image
            source={faq8_1}
            style={{
              marginBottom: 20,
              width: 550,
              height: 550,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            Alternatively, you can also click on Feedback Submission at the
            bottom of the FAQs and Support page.
          </Text>
          <Image
            source={faq8_2}
            style={{
              marginBottom: 20,
              width: 550,
              height: 550,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 10 }}>
            Submitting a Suggestion
          </Text>
          <Text
            style={{ ...FONTS.body4, color: COLORS.black, marginBottom: 20 }}
          >
            You will be required to provide a brief description of your problem
            in not more than 300 words. To help us understand your problem
            better, you may also choose to include some pictures that are
            related to your problem.
          </Text>
          <Image
            source={faq8_3}
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

export default FAQContent8;
