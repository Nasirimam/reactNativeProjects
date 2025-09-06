// Screens/Home.js
import React from "react";
import { Layout, Text, Button, useTheme } from "react-native-rapi-ui";

export default function Home({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <Layout>
      <Text>This is Home</Text>
      <Button
        text={isDarkmode ? "Switch to Light" : "Switch to Dark"}
        onPress={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
    </Layout>
  );
}
