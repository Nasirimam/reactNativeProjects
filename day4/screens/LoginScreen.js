import { StatusBar } from "expo-status-bar";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import { Button, Image, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = () => {
    if (email && password) {
      setSubLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user + "Line25");
          updateProfile(user, { displayName: user.displayName })
            .then(() => {
              clearInput();
              setSubLoading(false);
            })
            .catch((err) => {
              alert(err.message);
              setSubLoading(false);
            });
        })
        .catch((err) => {
          alert(err.message);
          setSubLoading(false);
        });
    } else {
      alert("All fields are mandatory");
      setSubLoading(false);
    }
  };

  const clearInput = () => {
    alert("Login Successfull");
    navigation.navigate("Home");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace("Home");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Loading...",
    });
    if (!loading) {
      navigation.setOptions({
        title: "Login",
      });
    }
  }, [navigation, loading]);

  return (
    <>
      {!loading ? (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/8662/8662284.png",
            }}
            style={{
              height: 200,
              width: 200,
              marginBottom: 50,
            }}
          />
          <View style={styles.inputContainer}>
            <Input
              type="email"
              placeholder="Email"
              onChangeText={(ele) => setEmail(ele)}
            />
            <Input
              type="password"
              placeholder="Password"
              secureTextEntry
              onChangeText={(ele) => setPassword(ele)}
            />
            <Button
              title="Login"
              containerStyle={styles.button}
              onPress={signIn}
            />
            <Button
              title="Register"
              containerStyle={styles.button}
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/9821/9821346.png",
            }}
            style={{
              height: 200,
              width: 200,
              marginBottom: 50,
            }}
          />
          <Text h4>Loding...</Text>
        </View>
      )}
    </>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
