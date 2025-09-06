import React from "react";
import { useTheme, themeColor, Text } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

const TabBarIcon = (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Ionicons
      name={props.icon}
      size={24}
      color={
        props.focused
          ? isDarkmode
            ? themeColor.white100
            : primary
          : "rgb(143,155,179)"
      }
    />
  );
};

export default TabBarIcon;
