import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import format from "date-fns/format";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/datePicker.css";
import { collection, addDoc } from "firebase/firestore";

const AddScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false); // ✅ control Android/iOS picker
  const [mode, setMode] = useState("date");
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selected, setSelected] = useState("expense"); // ✅ added for picker

  // ✅ close picker after select/cancel
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Expense",
    });
  }, [navigation]);

  const createExpense = async () => {
    if (input && amount && date && selected && auth.currentUser) {
      try {
        setSubmitLoading(true);

        await addDoc(collection(db, "expense"), {
          email: auth.currentUser.email,
          text: input,
          price: amount,
          type: selected,
          date: date, // Firestore stores it as Timestamp
          createdAt: new Date(),
        });

        clearInput();
      } catch (error) {
        console.error("Error adding expense: ", error);
        alert("Something went wrong while saving.");
      } finally {
        setSubmitLoading(false);
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const clearInput = () => {
    setInput("");
    setAmount("");
    setDate(new Date());
    setSelected("expense");
    alert("Expense added successfully!");
  };

  const result = format(date, "dd/MM/yyyy");

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Text"
          value={input}
          onChangeText={(ele) => setInput(ele)}
        />

        {Platform.OS === "web" ? (
          // ✅ Web date picker
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            dateFormat="dd/MM/yyyy"
            className="custom-datepicker"
            wrapperClassName="custom-datepicker-wrapper"
          />
        ) : (
          <>
            {/* ✅ Android/iOS button to open date picker */}
            <Button title="Pick Date" onPress={() => setShow(true)} />
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
              Selected: {result}
            </Text>
          </>
        )}

        {/* ✅ Amount input */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Add Amount"
          value={amount}
          onChangeText={(ele) => setAmount(ele)}
        />

        {/* ✅ Expense/Income Picker */}
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>
        <Button
          title={submitLoading ? "Adding..." : "Add Expense"}
          onPress={createExpense}
          disabled={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
