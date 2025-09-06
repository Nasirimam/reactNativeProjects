import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../firebase";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = () => {
    if (name && email && password) {
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, { displayName: name })
            .then(() => {
              clearInput();
              setLoading(false);
            })
            .catch((err) => {
              alert(err.message);
              setLoading(false);
            });
        })
        .catch((err) => {
          alert(err.message);
          setLoading(false);
        });
    } else {
      alert("All fields are mandatory");
      setLoading(false);
    }
  };

  const clearInput = () => {
    alert("Account Created");
    setLoading(false);
    navigation.navigate("Home");
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/256/7246/7246425.png",
        }}
        style={{
          height: 200,
          width: 200,
          marginBottom: 50,
        }}
      />
      <View style={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Name"
          onChangeText={(ele) => setName(ele)}
        />
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
          title="Register"
          containerStyle={styles.button}
          onPress={signUp}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
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
