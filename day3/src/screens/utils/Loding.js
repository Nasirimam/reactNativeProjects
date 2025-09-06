import React from "react";
import { ActivityIndicator } from "react-native";
import { LayoutAnimation, Text, View } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

const Loding = () => {
  return (
    <Layout>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
};

export default Loding;
