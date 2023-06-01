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

const Reservation = () => {
  // 0 : no reservation
  // 1: pending reservation
  // 2: confirmed reservation
  const [reservationState, setReservationState] = React.useState(1);

  return (
    <>
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

export default Reservation;
