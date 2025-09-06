import React from "react";
import { useTheme, themeColor, Text } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

const TabBarTaxt = (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Text
      style={{ marginBottom: 5 }}
      color={
        props.focused
          ? isDarkmode
            ? themeColor.white100
            : primary
          : "rgb(143,155,179)"
      }
    >
      {props.title}
    </Text>
  );
};

export default TabBarTaxt;
