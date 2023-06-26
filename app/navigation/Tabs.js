import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

//Screens
import {
  Home,
  Notifications,
  Profile,
  NoReservation,
  PendingReservation,
  ConfirmedReservation,
} from "../screens";
import { COLORS, FONTS, icons } from "../constants";

//context
import { useStudentDataContext } from "../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../hooks/useStudentAuthContext";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();

  React.useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(
        "http://192.168.0.151:4000/api/studentData/1",
        {
          headers: {
            Authorization: `Bearer ${studentUser.token}`,
          },
        }
      ); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatch({ type: "SET_STUDENT", payload: json });
      }
    };

    fetchStudentData();
  }, [dispatch]); //only fires once when the Student page first renders

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.lightgray3,
          height: 55,
          paddingTop: 3,
          alignItems: "center",
        },
        headerShown: false,
      }}
      sceneContainerStyle={{ backgroundColor: COLORS.white }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.Gtabs : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.Gtabs : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Reservation"
        component={
          studentData && studentData.seatStat.includes("Pending Reservation")
            ? PendingReservation
            : studentData && studentData.seatStat.includes("Reserved")
            ? ConfirmedReservation
            : NoReservation
        }
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.list}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.Gtabs : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.Gtabs : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Reserve
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.bell}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.Gtabs : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.Gtabs : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Notifications
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.Gtabs : COLORS.black,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.Gtabs : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
