import React from "react";
import { View, Linking } from "react-native";
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
import { getAuth, signOut } from "firebase/auth";

const Home = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Component Made With Rapi UI
            </Text>
            <Button
              status="info"
              text="Rapi Docs"
              style={{ marginTop: 10 }}
              onPress={() => {
                Linking.openURL("https://rapi-ui.kikiding.space/docs");
              }}
            />
            <Button
              text="Go To Second Screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{ marginTop: 10 }}
              status="success"
            />
            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              style={{ marginTop: 10 }}
              status={isDarkmode ? "primary" : "info"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else setTheme("dark");
              }}
            />
            <Button
              text="Log Out"
              style={{ marginTop: 10 }}
              status="danger"
              onPress={() => {
                signOut(auth);
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
};

export default Home;
