import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

const CreateAccountScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreateAccount = () => {
    console.log("Create Account button pressed.");
  };

  return (
    <View style={styles.view1}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleCreateAccount}
      >
        <Text style={styles.text}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    margin: "auto",
    padding: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    marginTop: 18,
  },
  input: {
    height: 40,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontFamily: "Inter, sans-serif",
  },
});

export default CreateAccountScreen;
