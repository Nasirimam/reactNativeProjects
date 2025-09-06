import React from "react";
import { View } from "react-native";
import {
  Layout,
  Section,
  SectionContent,
  Button,
  Text,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

const SecondScreen = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white : themeColor.dark}
          />
        }
        leftAction={() => {
          navigation.navigate("MainTabs");
        }}
        middleContent="Second Screen"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text fontWeight="bold" style={{ textAlign: "center" }}>
          SecondScreen
        </Text>
      </View>
    </Layout>
  );
};

export default SecondScreen;
