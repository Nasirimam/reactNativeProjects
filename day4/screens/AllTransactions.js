import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import CustomListItem from "../components/CustomListItem";

const AllTransaction = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Only fetch if user exists
    if (!auth.currentUser) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "expense"),
      where("email", "==", auth.currentUser.email),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
      setTransactions([]); // ✅ clear state when user logs out
    };
  }, [auth.currentUser]);

  if (loading) {
    return (
      <SafeAreaView style={styles.containerNull}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10, color: "gray" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (transactions.length === 0) {
    return (
      <SafeAreaView style={styles.containerNull}>
        <Text>No transactions yet</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomListItem info={item} navigation={navigation} id={item.id} />
        )}
      />
    </SafeAreaView>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 0,
    marginTop: 0,
  },
  containerNull: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
