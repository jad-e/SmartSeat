import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { useEffect } from "react";

import SplashScreen from "react-native-splash-screen";

import { ModalPortal } from "react-native-modals";

//Screens
import {
  OnBoarding,
  SignIn,
  ForgotPassword1,
  ForgotPassword2,
  ForgotPassword3,
  ForgotPassword4,
  SeatMap,
  Timeline,
  ProfileDetail,
  FAQ,
  FAQContent1,
  FAQContent2,
  FAQContent3,
  FAQContent4,
  FAQContent5,
  FAQContent6,
  FAQContent7,
  FAQContent8,
  FAQContent9,
  FeedbackSubmission,
} from "./app/screens";

import { images, icons, theme, COLORS, SIZES, FONTS } from "./app/constants";

import { Tabs } from "./app/navigation";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"OnBoarding"}
        >
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword1"
            component={ForgotPassword1}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword2"
            component={ForgotPassword2}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword3"
            component={ForgotPassword3}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword4"
            component={ForgotPassword4}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SeatMap"
            component={SeatMap}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Timeline"
            component={Timeline}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQ"
            component={FAQ}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FeedbackSubmission"
            component={FeedbackSubmission}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent1"
            component={FAQContent1}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent2"
            component={FAQContent2}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent3"
            component={FAQContent3}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent4"
            component={FAQContent4}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent5"
            component={FAQContent5}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent6"
            component={FAQContent6}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent7"
            component={FAQContent7}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent8"
            component={FAQContent8}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FAQContent9"
            component={FAQContent9}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal />
    </>
  );
}
