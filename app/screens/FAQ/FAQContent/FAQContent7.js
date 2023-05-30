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
const { faq10_1, faq10_2, faq10_3 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent7 = ({ route, navigation }) => {
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
            As of now, users are unable to change the default language of the
            SmartSeat app as it currently only supports the English language.
            Support for other languages such as Chinese, Korean, Japanese, and
            more will be provided in the near future.
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

export default FAQContent7;
