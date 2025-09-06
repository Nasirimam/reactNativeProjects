import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const reset = async () => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        alert("Your password reset link send to you email");
        navigation.navigate("Login");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }} s>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 220, width: 220 }}
              source={require("../../../assets/Login.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
              gap: 10,
            }}
          >
            <Text style={{ alignSelf: "center", padding: 30 }} size="h3">
              ForgotPassword
            </Text>
            <Text>Email</Text>
            <TextInput
              placeholder="Enter Your Email"
              autoCapitalize="none"
              autoComplete="off"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              text="Continue"
              style={{ marginTop: 20 }}
              onPress={() => {
                reset();
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an accout?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text size="md" fontWeight="bold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text size="md" style={{ marginLeft: 5 }}>
                  {isDarkmode ? "Light Theme" : "Dark Theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
