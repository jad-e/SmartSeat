import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { useEffect } from "react";

import SplashScreen from "react-native-splash-screen";

//Screens
import {
  OnBoarding,
  SignIn,
  ForgotPassword1,
  ForgotPassword2,
  ForgotPassword3,
  ForgotPassword4,
  SeatMap,
  ProfileDetail,
} from "./app/screens";

import { Tabs } from "./app/navigation";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
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
          name="ProfileDetail"
          component={ProfileDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
