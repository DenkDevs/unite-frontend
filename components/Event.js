import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Alert,
	Text,
	Button,
	Modal,
	ScrollView,
	FlatList,
} from "react-native";
import NavBar from "./NavBar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";

const EventDetails = ({ date, location }) => (
	<View style={styles.detailsContainer}>
		<Text style={styles.detailsText}>
			{date} {"\n"} {location}
		</Text>
	</View>
);

const EventScreen = ({ navigation, route }) => {
	const [eventDetails, setEventDetails] = useState(null);
	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const { eventId } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [rsvpList, setRsvpList] = useState([]);

	useEffect(() => {
		fetchEventDetails();
	}, []);

	const fetchEventDetails = async () => {
		try {
			const eventDocRef = doc(FIREBASE_DB, "events", eventId.toString());
			const eventDocSnap = await getDoc(eventDocRef);
			if (eventDocSnap.exists()) {
				const eventData = eventDocSnap.data();
				setEventDetails(eventData);
			} else {
				console.error("Event not found");
			}
		} catch (error) {
			console.error("Error fetching event details:", error);
		}
	};

	const handleRSVP = async () => {
		const currentUser = FIREBASE_AUTH.currentUser;
		if (currentUser) {
			const userId = currentUser.uid;
			try {
				//get the rsvpList for the event
				const eventDocRef = doc(FIREBASE_DB, "events", eventId);
				const eventDoc = await getDoc(eventDocRef);
				const eventData = eventDoc.data();
				const rsvpList = eventData.rsvpList || [];
				let alertMessage = "";
				if (rsvpList.includes(userId)) {
					// check if the userId already exists in the array
					// if it does, remove it from the array
					const index = rsvpList.indexOf(userId);
					if (index > -1) {
						rsvpList.splice(index, 1);
					}
					alertMessage = "You have successfully cancelled your RSVP.";
				} else {
					// if the userId does not exist in the array, add it
					rsvpList.push(userId);
					alertMessage = "You have successfully RSVP'd to the event.";
				}
				//update the rsvp list
				await updateDoc(eventDocRef, {
					rsvpList: rsvpList,
				});
				Alert.alert("RSVP Status", alertMessage);
			} catch (error) {
				console.error("Error fetching data from Firestore:", error);
				return [];
			}
		} else {
			console.log("No user is logged in");
		}
		setIsButtonClicked(true);
	};

	const viewRSVPList = async () => {
		try {
			const eventDocRef = doc(FIREBASE_DB, "events", eventId);
			const eventDoc = await getDoc(eventDocRef);
			if (eventDoc.exists()) {
				const eventData = eventDoc.data();
				const rsvpList = [];
				const promises = eventData.rsvpList.map(async (userId) => {
					const userDocRef = doc(FIREBASE_DB, "users", userId);
					const userDoc = await getDoc(userDocRef);
					if (userDoc.exists()) {
						console.log("user exists");
						const userData = userDoc.data();
						return userData.fname + " " + userData.lname;
					} else {
						console.log("No such user!");
					}
				});
				const resolvedRsvpList = await Promise.all(promises);
				setRsvpList(resolvedRsvpList);
				setModalVisible(true);
			} else {
				console.log("Event not found");
			}
		} catch (error) {
			console.error("Error fetching RSVP list:", error);
		}
	};

	return (
		<>
			<View style={styles.mainContainer}>
				<ScrollView style={styles.scrollContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.eventTitleContainer}>
							<Text style={styles.eventTitleText}>
								{eventDetails ? eventDetails.title : "Loading..."}
							</Text>
						</View>
						<View style={styles.graphicContainer}>
							<Text style={styles.graphicText}>graphic for event</Text>
						</View>
						<View style={styles.infoContainer}>
							<View style={styles.buttonContainer}>
								<Button
									onPress={() => console.log("The Location Clicked")}
									title={
										eventDetails
											? `Go to ${eventDetails.clubName}`
											: "Loading..."
									}
									color="#000"
								/>
							</View>
							<View style={styles.buttonContainer}>
								<Button
									onPress={() => navigation.navigate("Success", { eventId })}
									title="+ Save event to calendar"
									color="#000"
								/>
							</View>
						</View>
						<EventDetails
							date={eventDetails ? eventDetails.time : "Loading..."}
							location={eventDetails ? eventDetails.location : "Loading..."}
						/>
						<View style={styles.descriptionContainer}>
							<Text style={styles.descriptionText}>
								{eventDetails ? eventDetails.description : "Loading..."}
							</Text>
						</View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>RSVP List</Text>
									<ScrollView style={styles.scrollView}>
										{rsvpList.map((userId, index) => (
											<Text key={index} style={styles.itemText}>
												{userId}
											</Text>
										))}
									</ScrollView>
									<Button
										title="Close"
										onPress={() => setModalVisible(false)}
									/>
								</View>
							</View>
						</Modal>
						<View style={styles.rsvpContainer}>
							<Button
								onPress={() => {
									handleRSVP();
									console.log("RSVP Button Clicked");
								}}
								title="RSVP HERE!"
								color="#000"
							/>
						</View>
						<View style={styles.rsvpListContainer}>
							<Button
								onPress={viewRSVPList}
								title="See RSVP List"
								color="#000"
							/>
						</View>
					</View>
				</ScrollView>
			</View>
			<NavBar />
		</>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#FFF",
		alignItems: "center",
		maxWidth: 480,
		width: "100%",
		flexDirection: "column",
		marginHorizontal: "auto",
		flex: 1,
		justifyContent: "space-between",
	},
	contentContainer: {
		paddingHorizontal: 49,
		width: "100%",
	},
	eventImage: {
		height: 150,
		marginBottom: 10,
	},
	eventTitleContainer: {
		alignItems: "center",
	},
	eventTitleText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	graphicContainer: {
		backgroundColor: "#D9D9D9",
		marginTop: 10,
		alignItems: "center",
		paddingVertical: 120,
	},
	graphicText: {
		fontSize: 12,
	},
	infoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		paddingHorizontal: 0,
	},
	buttonContainer: {
		flex: 1,
		marginHorizontal: 5,
		backgroundColor: "#9e9b9b",
	},
	detailsContainer: {
		marginTop: 30,
	},
	detailsText: {
		fontSize: 14,
	},
	descriptionContainer: {
		marginTop: 20,
	},
	descriptionText: {
		fontSize: 12,
	},
	rsvpContainer: {
		marginTop: 40,
		backgroundColor: "#D9D9D9",
		padding: 10,
	},
	rsvpListContainer: {
		marginTop: 10,
		backgroundColor: "#D9D9D9",
		padding: 10,
		marginBottom: 10,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "80%", // Control the width of the modal
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18, // Increase font size for better readability
		fontWeight: "bold", // Making the text bold
	},
	scrollView: {
		width: "100%", // Ensure the ScrollView takes the full width of the modal
	},
	itemText: {
		padding: 10,
		fontSize: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	scrollContainer: {
		flex: 1, // Ensures the ScrollView takes up the full space above the NavBar
	},
});

export default EventScreen;
