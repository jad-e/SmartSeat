import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { back_arrow } = icons;

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={back_arrow} style={styles.header_arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    width: SIZES.width,
  },
  header_arrow: {
    width: 22,
    height: 22,
    marginLeft: 25,
    marginTop: 12,
    marginBottom: 12,
  },
});

export default Header;
