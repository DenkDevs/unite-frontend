import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

function AddEventSuccessScreen() {
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
      <Button text="Go To Calendar" onPress={() => {}} />
      <Button text="View More Events" onPress={() => {}} />
      <Text>This page is a work in progress...</Text>
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
    fontFamily: "Inter, sans-serif",
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
    fontFamily: "Inter, sans-serif",
  },
});

export default AddEventSuccessScreen;
