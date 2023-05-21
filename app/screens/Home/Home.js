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

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { appname } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Home = () => {
  const navigation = useNavigation();

  // Acceptable Behaviours
  // 1: Can talk, 10: cannot talk
  // 2: food allowed, 20: food not allowed
  // 3: drinks allowed, 30: drinks not allowed

  const studySpacesData = [
    {
      id: 1,
      title: "Peking Library",
      address: "5 Yiheyuan Rd, Haidian District",
      freeSeats: 718,
      totalSeats: 918,
      floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
      status1: "Open",
      operatingHours: "24 hours",
      acceptableBehaviours: [1, 2, 30],
    },
    {
      id: 2,
      title: "Tsinghua Library",
      address: "30 Shuangqing Rd, Haidian District",
      freeSeats: 0,
      totalSeats: 918,
      floorsData: [{ 0: 0 }, { 1: 0 }, { 2: 0 }, { 3: 0 }],
      status1: "Closed",
      operatingHours: "24 hours",
      acceptableBehaviours: [10, 20, 30],
    },
    {
      id: 3,
      title: "Fudan Study Space",
      address: "220 Handan Rd, Yangpu District",
      freeSeats: 29,
      totalSeats: 100,
      floorsData: [
        { 0: 195 },
        { 1: 169 },
        { 2: 167 },
        { 3: 178 },
        { 4: 72 },
        { 5: 10 },
      ],
      status1: "Open",
      operatingHours: "08:30 - 22:30",
      acceptableBehaviours: [10, 2, 30],
    },
    {
      id: 4,
      title: "UCL Science Library",
      address: "Malet Place, Gower Street, WC1E 6BT",
      freeSeats: 30,
      totalSeats: 100,
      floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
      status1: "Open",
      operatingHours: "10:30 - 18:00",
      acceptableBehaviours: [1, 2, 3],
    },
    {
      id: 5,
      title: "Student Centre 1",
      address: "27-28 Gordon Square, WC1H 0PP",
      freeSeats: 59,
      totalSeats: 100,
      floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
      status1: "Open",
      operatingHours: "24 hours",
      acceptableBehaviours: [10, 2, 3],
    },
    {
      id: 6,
      title: "Student Centre 2",
      address: "29-30 Gordon Square, WC1H 0PP",
      freeSeats: 60,
      totalSeats: 100,
      floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
      status1: "Open",
      operatingHours: "24 hours",
      acceptableBehaviours: [1, 20, 3],
    },
  ];

  const [studySpaces, setStudySpaces] = React.useState(studySpacesData);

  function renderHeader() {
    return (
      <>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={COLORS.primary}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            backgroundColor: COLORS.primary,
            height: 100,
            width: "100%",
          }}
        >
          <Image
            source={appname}
            style={{ height: 30, resizeMode: "contain", marginTop: 12 }}
          />
        </View>

        {/* Features section */}

        <DropShadow style={styles.shadowProp}>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: COLORS.white,
                height: 75,
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 20,
                marginTop: -60,
                marginBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
              },
            ]}
          >
            {/* Assist Me */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={() => console.log("assist me")}
            >
              <Image
                source={icons.hand}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.primary,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                Assist Me
              </Text>
            </TouchableOpacity>

            {/* Reservation History */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={() => console.log("history")}
            >
              <Image
                source={icons.history}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.primary,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                History
              </Text>
            </TouchableOpacity>

            {/* FAQs */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={() => console.log("faqs")}
            >
              <Image
                source={icons.question_sign}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.primary,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                FAQs
              </Text>
            </TouchableOpacity>

            {/* More */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={() => console.log("more")}
            >
              <Image
                source={icons.application}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.primary,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                More
              </Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </>
    );
  }

  function renderHome() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderStudySpaceHeader()}
      </View>
    );

    const renderStudySpaceHeader = () => (
      <View style={{ marginLeft: 20, marginBottom: 10 }}>
        <Text style={{ ...FONTS.h2c }}>Study Space Availability</Text>
      </View>
    );

    //render the study space information's views
    const renderItem = ({ item }) => (
      <View
        style={[
          styles.shadow,
          {
            marginLeft: 20,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            width: SIZES.width / 1.125,
            borderWidth: 1,
            borderColor: COLORS.lightgray3,
          },
        ]}
      >
        {/* study space title */}
        <Text
          style={{
            marginTop: 10,
            marginLeft: 15,
            ...FONTS.h3,
            marginRight: 15,
          }}
        >
          {item.title}
        </Text>

        {/* address */}
        <Text
          style={{
            marginLeft: 15,
            ...FONTS.body4,
            marginRight: 15,
          }}
        >
          {item.address}
        </Text>

        {/* study space behaviours */}

        <View
          style={{
            flexDirection: "row",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Image
            source={
              item.acceptableBehaviours[0] == 1 ? icons.chat : icons.no_chat
            }
            style={{
              tintColor:
                item.acceptableBehaviours[0] == 1 ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
          <Image
            source={
              item.acceptableBehaviours[1] == 2 ? icons.food : icons.no_food
            }
            style={{
              tintColor:
                item.acceptableBehaviours[1] == 2 ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
          <Image
            source={
              item.acceptableBehaviours[2] == 3 ? icons.drink : icons.no_drink
            }
            style={{
              tintColor:
                item.acceptableBehaviours[2] == 3 ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* seats information */}
        {/* 
        
        [Notes]

        1. seats status (based on percentage)

        if the number of seats left is 
        // 60% - 100% = green (not busy)
        // 30% - 59% = yellowish orange (moderate)
        // 0% - 29% = red (busy)

         */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 15,
            paddingRight: 120,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor:
                (item.freeSeats / item.totalSeats) * 100 >= 60
                  ? COLORS.green
                  : (item.freeSeats / item.totalSeats) * 100 >= 30 &&
                    (item.freeSeats / item.totalSeats) * 100 <= 59
                  ? COLORS.orange
                  : COLORS.red,
              borderRadius: 5,
              width: 100,
              height: 24,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Text
              style={{ color: COLORS.white, marginLeft: 10, ...FONTS.body4a }}
            >
              Seats
            </Text>
          </View>

          <Text style={{ ...FONTS.body4 }}>
            {item.freeSeats} free out of {item.totalSeats} (Floor: Free - 0:
            195, 1: 169, 2: 167, 3: 178, 4: 82)
          </Text>
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* study space status information */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.gray,
              borderRadius: 5,
              width: 100,
              height: 24,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Text
              style={{ color: COLORS.white, marginLeft: 10, ...FONTS.body4a }}
            >
              Status
            </Text>
          </View>

          <Text style={{ ...FONTS.body4 }}>
            <Text
              style={{
                color: item.status1 == "Open" ? COLORS.green : COLORS.red,
                ...FONTS.body4,
              }}
            >
              {item.status1}
            </Text>{" "}
            now
          </Text>
          <Text style={{ marginLeft: 10, color: COLORS.gray, ...FONTS.body4 }}>
            {item.operatingHours}
          </Text>
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* seat map clickable section */}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("SeatMap")}
        >
          <Text style={{ ...FONTS.body4 }}>Click here for seat map</Text>
          <Image
            source={icons.right_arrow}
            style={{ width: 10, height: 10, tintColor: COLORS.gray }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={studySpaces}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 65 }}></View>}
      />
    );
  }

  return <View style={styles.container}>{renderHome()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});

export default Home;
