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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loadAsync } from "expo-font";

const Login = ({ navigation }) => {
  const auth = getAuth();
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loding, setLoding] = useState(false);

  const login = async () => {
    setLoding(true);
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      var errorMessage = error.message;
      setLoding(false);
      alert(errorMessage);
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
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
              Login
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
            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              placeholder="Enter Your Password"
              autoCapitalize="none"
              autoComplete="off"
              value={password}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loding ? "Loding..." : "Continue"}
              style={{ marginTop: 20 }}
              onPress={() => {
                login();
              }}
              disabled={loding}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Don't have an accout? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text size="md" fontWeight="bold">
                  Register
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
              <Text size="md">Don't Remember Your Password! </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" style={{ marginLeft: 5 }} fontWeight="bold">
                  Forget Password
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

export default Login;
