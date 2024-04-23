import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { CLIENT_ID } from "../GoogleAPI"; // Make sure this is correctly imported
import axios from "axios"; // Make sure axios is installed

function Button({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

function AddEventSuccessScreen() {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = React.useState(null);

  // Using makeRedirectUri with useProxy: true ensures that you use Expo’s proxy
  const redirectUri = makeRedirectUri({
    useProxy: true, // This ensures that the auth.expo.io is used
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: "https://auth.expo.io/@djliu9049890/unite-frontend", // Explicitly set the redirect URI here
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      // Use the ID token as needed
    }
    console.log(response);
    console.log(request);
  }, [response]);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setAccessToken(authentication.accessToken); // Store access token in state
    }
  }, [response]);

  const addEventToGoogleCalendar = async () => {
    if (!accessToken) {
      Alert.alert("Error", "Must authenticate with Google first!");
      return;
    }

    // Replace this object with your event details
    const eventDetails = {
      summary: "Valentine’s Day Soldering Workshop",
      // Add more details like start and end times, location, etc.
      // Refer to the Google Calendar API documentation for more options
    };

    try {
      await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        eventDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Alert.alert("Success", "Event added to your calendar!");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "There was an error adding the event to your calendar."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          You have saved{"\n"}
          <Text style={styles.eventName}>
            Valentine’s Day Soldering Workshop
          </Text>
          {"\n"}to your calendar!
        </Text>
      </View>
      <Button
        text="Go To Calendar"
        onPress={() => {
          promptAsync();
        }}
      />
      <Button
        text="View More Events"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    maxWidth: 480,
    width: "100%",
    margin: "0 auto",
  },
  messageBox: {
    marginTop: 185,
    alignItems: "center",
  },
  messageText: {
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#000",
  },
  eventName: {
    fontWeight: "700",
  },
  button: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 1,
    width: 285,
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: "sans-serif",
  },
});

export default AddEventSuccessScreen;
