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
  NoReservation,
  PendingReservation,
  ConfirmedReservation,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Reservation = () => {
  // 0 : no reservation
  // 1: pending reservation
  // 2: confirmed reservation
  const [reservationState, setReservationState] = React.useState(2);

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      {reservationState == 0 ? (
        <NoReservation />
      ) : reservationState == 1 ? (
        <PendingReservation />
      ) : (
        <ConfirmedReservation />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
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

export default Reservation;
