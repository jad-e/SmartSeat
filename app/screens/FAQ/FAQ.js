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

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
  Header,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FAQ = () => {
  const FAQsData = [
    {
      id: 1,
      title: "I have an issue with my bill payment",
    },
    {
      id: 2,
      title: "Why is my transaction listed as processing",
    },
    {
      id: 3,
      title: "What is BillPay",
    },
    {
      id: 4,
      title: "How do I check the status of my bill payment",
    },
    {
      id: 5,
      title: "How can I add friends?",
    },
    {
      id: 6,
      title: "How can I change my profile picture?",
    },
    {
      id: 7,
      title: "How can I change the language?",
    },
    {
      id: 8,
      title: "What is the coin reward formula?",
    },
    {
      id: 9,
      title: "How can I set up break time?",
    },
    {
      id: 10,
      title: "How can I set up tags?",
    },
  ];

  const navigation = useNavigation();

  // on press functions
  const onFAQItemPressed = () => {
    console.log("FAQ item pressed");
  };

  //states
  const [FAQs, setFAQs] = React.useState(FAQsData);

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />
      <Header />
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
});

export default FAQ;
