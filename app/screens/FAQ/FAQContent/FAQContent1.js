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
const { faq1_1 } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQContent1 = ({ route, navigation }) => {
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
            On the Home page, you will be able to see a list of cards that
            display the real-time seat availability information for different
            types of campus libraries. To reserve a library seat, locate your
            desired library's card. Then, tap on the "Click here for seat map"
            button.
          </Text>

          <Image
            source={faq1_1}
            style={{
              marginBottom: 20,
              width: 550,
              height: 550,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />

          <Text style={{ ...FONTS.h2, color: COLORS.red, marginBottom: 20 }}>
            TO BE CONTINUED
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

export default FAQContent1;
