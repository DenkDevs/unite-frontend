import React from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const InputField = ({ placeholder, secureTextEntry = false, onChangeText }) => (
	<TextInput
		style={styles.inputField}
		placeholder={placeholder}
		secureTextEntry={secureTextEntry}
		onChangeText={onChangeText}
	/>
);

const Button = ({ label, onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.buttonText}>{label}</Text>
	</TouchableOpacity>
);

// TODO Add persistent login state so that users don't have to log in every time they open the app
const LoginScreen = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const navigation = useNavigation();
	const auth = FIREBASE_AUTH;

	const handleLogin = async () => {
		// Ideally, you would validate the credentials here or send them to your backend for validation
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				username,
				password
			);
			// Signed in
			const user = userCredential.user;
			Alert.alert("Login Success", `Welcome, ${user?.email}`);

			if (user.hasLoggedInBefore === false) {
				{
					navigation.navigate("CourseList");
				}
			} else {
				{
					navigation.navigate("Home");
				}
			}
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			Alert.alert("Login Error", `Error: ${errorCode} - ${errorMessage}`);
		}
	};

	const navigateToCreateAccount = () => {
		navigation.navigate("CreateAccount");
		// navigation.navigate("CreateAccount");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Unite</Text>
			<InputField placeholder="Username" onChangeText={setUsername} />
			<InputField
				placeholder="Password"
				secureTextEntry={true}
				onChangeText={setPassword}
			/>
			<Button label="Login" onPress={handleLogin} />
			<Text style={styles.signupText}>Don’t have an account yet?</Text>
			<TouchableOpacity onPress={navigateToCreateAccount}>
				<Text style={styles.createAccountText}>Create Account</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		marginBottom: 50,
		fontSize: 50,
		fontFamily: "sans-serif",
	},
	inputField: {
		fontFamily: "sans-serif",
		alignSelf: "stretch",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderWidth: 1,
		marginBottom: 20,
		padding: 10,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "stretch",
		borderRadius: 30,
		backgroundColor: "#000",
		padding: 10,
		marginBottom: 20,
	},
	buttonText: {
		color: "#FFF",
		fontFamily: "sans-serif",
	},
	signupText: {
		fontFamily: "sans-serif",
		marginBottom: 10,
	},
	createAccountText: {
		fontFamily: "sans-serif",
		fontWeight: "700",
	},
});

export default LoginScreen;
