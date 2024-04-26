import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	CLIENT_ID,
	ANDROID_CLIENT_ID,
	API_KEY,
	DISCOVERY_DOC,
	SCOPES,
	IOS_CLIENT_ID,
} from "../GoogleAPI"; // Make sure this is correctly imported
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useParseDateForGoogleCalendar from "./DateForGoogleCalendar";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();
function Button({ text, onPress }) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	);
}

const AddEventSuccessScreen = ({ navigation, route }) => {
	const { eventId } = route.params;
	const [eventDetails, setEventDetails] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: ANDROID_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
		scopes: SCOPES,
	});

	async function handleSignInWithGoogle() {
		const user = await AsyncStorage.getItem("@user");
		if (!user) {
			console.log("!user");
			if (response?.type === "success") {
				alert("success");
				await getUserInfo(response.authentication.accessToken);
				alert("getuserinfo finished");
				await addEventToGoogleCalendar(response.authentication.accessToken);
				alert("finished adding event to calendar");
			}
		} else {
			alert("user");
			setUserInfo(JSON.parse(user));
			await addEventToGoogleCalendar(response.authentication.accessToken);
			alert("finished adding event to calendar!");
		}
	}

	const getUserInfo = async (token) => {
		if (!token) return;
		try {
			const response = await fetch(
				"https://www.googleapis.com/userinfo/v2/me",
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			const user = await response.json();
			await AsyncStorage.setItem("@user", JSON.stringify(user));
			setUserInfo(user);
			console.log("successfully retrieved userinfo");
		} catch (error) {
			console.log("daknda");
			console.log(error);
		}
	};
	React.useEffect(() => {
		fetchEventDetails();
	}, []);
	const fetchEventDetails = async () => {
		try {
			const eventDocRef = doc(FIREBASE_DB, "events", eventId.toString());
			const eventDocSnap = await getDoc(eventDocRef);
			if (eventDocSnap.exists()) {
				const eventData = eventDocSnap.data();
				setEventDetails(eventData); // This will trigger a re-render
			} else {
				console.error("Event not found");
			}
		} catch (error) {
			console.error("Error fetching event details:", error);
		}
	};

	const addEventToGoogleCalendar = async (accessToken) => {
		alert("enter add event function");
		await fetchEventDetails();
		alert(eventDetails);
		const { startDateTime, endDateTime } = useParseDateForGoogleCalendar(
			eventDetails.startTime,
			eventDetails.endTime
		);
		alert(startDateTime);
		alert(endDateTime);
		const event = {
			summary: eventDetails.title,
			location: eventDetails.location,
			description: eventDetails.description,
			start: {
				dateTime: startDateTime,
				timeZone: "America/Los_Angeles",
			},
			end: {
				dateTime: endDateTime,
				timeZone: "America/Los_Angeles",
			},
		};

		try {
			const response = await fetch(
				"https://www.googleapis.com/calendar/v3/calendars/primary/events",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(event),
				}
			);
			const result = await response.json();
			alert("Event added: " + JSON.stringify(result));
		} catch (error) {
			alert("Error adding event to Google Calendar: " + error);
		}
	};

	React.useEffect(() => {
		handleSignInWithGoogle();
	}, [response]);

	return (
		<View style={styles.container}>
			<View style={styles.messageBox}>
				<Text style={styles.messageText}>
					You have saved{"\n"}
					<Text style={styles.eventName}>
						{eventDetails ? eventDetails.title : "Loading event..."}
					</Text>
					{"\n"}to your calendar!
				</Text>
			</View>
			<Button
				text="Go To Calendar"
				onPress={() => {
					promptAsync();
					console.log("complete");
					console.log(userInfo);
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
};

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
