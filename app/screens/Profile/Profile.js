import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={[
            styles.shadow,
            { backgroundColor: COLORS.white, marginBottom: 10 },
          ]}
        >
          <Text>Header</Text>
        </View>

        {/* Content Options */}
        <View style={[styles.shadow, { backgroundColor: COLORS.white }]}>
          <Text>Content</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray1,
    flex: 1,
    paddingHorizontal: 10,
    width: SIZES.width,
    height: SIZES.height,
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
});

export default Profile;
