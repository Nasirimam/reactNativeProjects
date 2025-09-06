import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  // Ask for permission

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Enable notifications to proceed");
    }
  }

  const getNotifications = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification at Your Disposal",
        body: "This is my first Notification",
        data: { user: "Nasir" },
      },
      trigger: { seconds: 2 },
    });
  };

  // When user click on notification
  useEffect(() => {
    requestPermissions();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const user = response.notification.request.content.data.user;
        Alert.alert("Notification Clicked", `User: ${user}`);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={getNotifications} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
