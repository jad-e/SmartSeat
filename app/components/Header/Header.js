import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { back_arrow } = icons;

const Header = ({ title = "", backgroundColor = COLORS.white }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={back_arrow} style={styles.header_arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 55,
    width: SIZES.width,
    alignItems: "center",
  },
  header_arrow: {
    width: 20,
    height: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 19,
  },
});

export default Header;
