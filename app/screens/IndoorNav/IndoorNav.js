import { View, Text } from "react-native";
import React from "react";

const IndoorNav = ({ route, navigation }) => {
  const { seat } = route.params;
  return (
    <View>
      <Text>IndoorNav: {JSON.parse(JSON.stringify(seat))}</Text>
    </View>
  );
};

export default IndoorNav;
