import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import axios from "axios";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [selectedCourses, setSelectedCourses] = useState([]);
	const navigation = useNavigation();

	const db = FIREBASE_DB;
	const auth = FIREBASE_AUTH;

	const handleUpdateCourses = async () => {
		if (auth.currentUser) {
			const userDoc = doc(db, "users", auth.currentUser.uid);
			await updateDoc(userDoc, {
				courses: arrayUnion(...selectedCourses),
				hasLoggedInBefore: true, // Add this line
			});
		} else {
			console.log("No user is logged in");
		}

		navigation.navigate("Home");
	};

	// const testUser = "dDEGxgIWu8eFS6DldxhadgpNH4p2"

	useEffect(() => {
		axios
			.get("http://172.16.40.13:3333/courses") // NOTE Until we host the backend, use the IP address you are on
			.then((response) => setCourses(response.data))
			.catch((error) => console.error(error));
	}, []);

	const filteredCourses = courses.filter((course) =>
		course.toLowerCase().includes(searchText.toLowerCase())
	);

	const selectCourse = (course) => {
		setSelectedCourses((prev) => {
			const newSelectedCourses = prev.includes(course)
				? prev.filter((c) => c !== course)
				: [...prev, course];
			return newSelectedCourses;
		});
	};
	// Print out selected courses to console
	useEffect(() => {
		console.log(selectedCourses);
	}, [selectedCourses]);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={searchText}
				onChangeText={setSearchText}
				placeholder="Search and select course to add"
			/>
			<ScrollView style={styles.scroll}>
				{searchText.length > 0 &&
					filteredCourses.map((course) => (
						<TouchableOpacity
							key={course}
							style={selectedCourses.includes(course) ? styles.selected : null}
							onPress={() => selectCourse(course)}>
							<Text>{course}</Text>
						</TouchableOpacity>
					))}
			</ScrollView>
			<TouchableOpacity
				style={styles.updateButton}
				onPress={handleUpdateCourses}>
				<Text>Update Courses</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		textAlign: "center", // To center the text
	},
	selected: {
		backgroundColor: "#f9c2ff",
		borderWidth: 1, // To add border
		borderColor: "#000", // Set border color
		textAlign: "center", // To center the text
	},
	scroll: {
		marginBottom: 0, // Adjust this value as needed
	},
	updateButton: {
		position: "absolute",
		right: 10,
		bottom: 10,
		padding: 10,
		backgroundColor: "#d5e3ff",
		borderRadius: 5,
	},
});

export default CourseList;
