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
const { faq5_1, faq5_2 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent5 = ({ route, navigation }) => {
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
            If you require the librarian's assistance (e.g., removal of
            unattended personal belongings), you may tap on the Assist Me
            feature on the Home page. Within the pop up dialog box's input
            field, supply your seat number then tap on the OK button.
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 20 }}>
            Note: You can find your seat number on the table.
          </Text>

          <Image
            source={faq5_1}
            style={{
              marginBottom: 20,
              width: 550,
              height: 550,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />

          <Image
            source={faq5_2}
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
            The librarian will attend to you as soon as possible after receiving
            your request for help.
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

export default FAQContent5;
