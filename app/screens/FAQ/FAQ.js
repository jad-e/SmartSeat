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
      title: "How do I make a seat reservation?",
    },
    {
      id: 2,
      title:
        "Can I occupy a library seat without making a reservation beforehand?",
    },
    {
      id: 3,
      title: "How do long and short break buttons work?",
    },
    {
      id: 4,
      title:
        "Am I required to press the withdrawal button when I temporarily leave my reserved seat?",
    },
    {
      id: 5,
      title: "What does the Assist Me feature do?",
    },
    {
      id: 6,
      title: "What are violation records and blacklists?",
    },
    {
      id: 7,
      title: "How do I change the app's language?",
    },
    {
      id: 8,
      title: "How do I change the app's theme?",
    },
    {
      id: 9,
      title: "Where can I submit a suggestion?",
    },
  ];

  const navigation = useNavigation();

  //states
  const [FAQs, setFAQs] = React.useState(FAQsData);

  function renderFAQ() {
    const HeaderComponent = () => <View>{renderFAQHeader()}</View>;
    const FooterComponent = () => <View>{renderFooterHeader()}</View>;

    const renderFAQHeader = () => (
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          backgroundColor: COLORS.white,
          // width: SIZES.width / 1.125,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingLeft: 15,
          paddingTop: 13,
          paddingBottom: 10,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>Frequently Asked Questions</Text>
      </View>
    );

    const renderFooterHeader = () => (
      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          backgroundColor: COLORS.white,
          // width: SIZES.width / 1.125,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 15,
          marginBottom: 50,
        }}
      />
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingRight: 15,
          paddingLeft: 15,
          justifyContent: "space-between",
          backgroundColor: COLORS.white,
        }}
        onPress={() =>
          navigation.navigate("FAQContent" + item.id, {
            title: item.title,
          })
        }
      >
        {/* title */}
        <Text
          style={{
            ...FONTS.body4,
            backgroundColor: COLORS.white,
          }}
        >
          {item.title}
        </Text>
        {/* image */}
        <Image
          source={icons.right_arrow}
          style={{
            width: 10,
            height: 10,
            tintColor: COLORS.gray,
          }}
        />
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={FAQs}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={FooterComponent}
      />
    );
  }

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.lightgray2}
      />
      <Header backgroundColor={COLORS.lightgray2} />
      <View style={styles.container}>
        {renderFAQ()}

        {/* feedback submission area */}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
            justifyContent: "center",
            height: 50,
          }}
          onPress={() => navigation.navigate("FeedbackSubmission")}
        >
          <Image
            source={icons.writing}
            style={{
              tintColor: COLORS.black,
              width: 17,
              height: 17,
              marginRight: 5,
            }}
          />
          <Text style={{ ...FONTS.body3a }}>Feedback Submission</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightgray2,
    flex: 1,
  },
});

export default FAQ;
