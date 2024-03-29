import React, { useState } from "react";

import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Alert,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { PostHogProvider, usePostHog } from "posthog-react-native";

// TODO Add validation for email to only GT email addresses
const CreateAccountScreen = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [fname, setFname] = React.useState("");
	const [lname, setLname] = React.useState("");
	const posthog = usePostHog();

	const auth = FIREBASE_AUTH;
	const navigation = useNavigation();

	const handleCreateAccount = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await setDoc(doc(FIREBASE_DB, "users", userCredential.user.uid), {
				email: userCredential.user.email,
				fname: fname,
				lname: lname,
				courses: [],
				organizations: [],
				hasLoggedInBefore: false,
				rsvps: 0,
			});

			const user = userCredential.user;
			Alert.alert("Account Created", `Welcome, ${user?.email}`);
			// Get the user document from Firestore
			const userDocRef = doc(FIREBASE_DB, "users", user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();

				if (userData.hasLoggedInBefore === false) {
					navigation.navigate("CourseList");
				} else {
					navigation.navigate("Home");
				}
			} else {
				console.log("No such user!");
			}
			posthog.capture("user_signed_up");
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			Alert.alert(
				"Account Creation Error",
				`Error: ${errorCode} - ${errorMessage}`
			);
		}
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
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setFname}
					value={fname}
					placeholder="First Name"
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setLname}
					value={lname}
					placeholder="Last Name"
				/>
			</View>

			<TouchableOpacity
				style={styles.buttonContainer}
				onPress={handleCreateAccount}>
				<Text>Create Account</Text>
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
});

export default CreateAccountScreen;
