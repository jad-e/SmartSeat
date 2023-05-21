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
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ProfileDetail = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              marginBottom: 15,
              backgroundColor: COLORS.white,
            }}
          >
            <Image
              source={profilepictest}
              style={{
                height: 100,
                width: 100,
                borderRadius: 1000,
                marginRight: 5,
              }}
            />
          </View>

          {/* Profile Information Section */}

          {/* name */}
          <View style={{ backgroundColor: COLORS.white }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>Name</Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                Khoo Hui Ying
              </Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* username */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                Username
              </Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                P19010770
              </Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* Email */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>Email</Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                p19010770@student.newinti.edu.my
              </Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* Phone Number */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                Phone Number
              </Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                +60175860818
              </Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* Gender */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                Gender
              </Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>Female</Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* Birthday */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                Birthday
              </Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                2001-06-25
              </Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>

            {/* School */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                School
              </Text>

              <Text style={{ ...FONTS.body4, color: COLORS.gray }}>BCSCU</Text>
            </View>

            {/* break line */}
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightgray2,
              }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
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

export default ProfileDetail;
