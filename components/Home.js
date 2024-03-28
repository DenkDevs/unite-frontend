import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import NavBar from "./NavBar";
import { FIREBASE_APP, FIREBASE_DB } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({
  title,
  clubName,
  time,
  location,
  description,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.eventCard}>
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle}>
        {title}
        {"\n"}
        <Text style={styles.clubName}>{clubName}</Text>
      </Text>
      <Text style={styles.eventDetails}>
        {time}
        {"\n"}
        {location}
        {"\n"}
        {"\n"}
        {description}
      </Text>
    </View>
    <View style={styles.eventImage}></View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [eventData, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch events from your database when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsCollectionRef = collection(FIREBASE_DB, "events");
      const snapshot = await getDocs(eventsCollectionRef);
      const eventData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(eventData);
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return [];
    }
  };

  const navigateToEvent = (eventId) => {
    // Navigate to event details page, passing the event key as a parameter
    navigation.navigate("Event", { eventId });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.discoverEventsSection}>
          <Text style={styles.discoverTitle}>Discover Events</Text>
          <View style={styles.tabs}>
            <View style={styles.tabActive}>
              <Text>All Events</Text>
            </View>
            <View style={styles.tab}>
              <Text>For Me</Text>
            </View>
          </View>
          <View style={styles.searchBox}>
            <Text>Search...</Text>
          </View>
          <Text style={styles.dateHeader}>DATE</Text>
          {/* Check if eventData is not empty */}
          {eventData.length > 0 ? (
            // If eventData is not empty, map through it and render EventCard components
            eventData.map((event, index) => (
              <EventCard
                key={event.id}
                title={event.title}
                clubName={event.clubName}
                time={event.time}
                location={event.location}
                description={event.description}
                onPress={() => navigateToEvent(event.id)}
              />
            ))
          ) : (
            // If eventData is empty, display a message indicating no events
            <Text>No events found</Text>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 0, // Adjust this value according to your NavBar height
  },
  discoverEventsSection: {
    flex: 1,
    padding: 20,
  },
  discoverTitle: {
    alignSelf: "center",
    fontWeight: "400",
    fontSize: 20,
    fontFamily: "sans-serif",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    marginTop: 20,
    fontWeight: "400",
  },
  tabActive: {
    fontFamily: "sans-serif",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#D4D4D4",
    padding: 10,
    marginRight: 10,
  },
  tab: {
    fontFamily: "sans-serif",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
  searchBox: {
    fontFamily: "sans-serif",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 15,
    fontWeight: "400",
    whiteSpace: "nowrap",
    padding: 10,
  },
  dateHeader: {
    fontFamily: "sans-serif",
    fontWeight: "400",
    marginTop: 20,
  },
  eventCard: {
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#FFF",
    display: "flex",
    marginTop: 30,
    alignItems: "stretch",
    gap: 20,
    fontSize: 12,
    justifyContent: "space-between",
    padding: 22,
  },
  eventContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  eventTitle: {
    fontFamily: "sans-serif",
    fontWeight: "700",
  },
  clubName: {
    fontWeight: "400",
  },
  eventDetails: {
    fontFamily: "sans-serif",
    fontWeight: "400",
    marginTop: 16,
  },
  eventImage: {
    backgroundColor: "#9F9F9F",
    borderRadius: 30,
    width: 69,
    flexShrink: 0,
    height: 69,
    margin: "auto 0",
  },
  featuredImage: {
    position: "relative",
    marginTop: 34,
    width: "100%",
    aspectRatio: "5.56",
  },
});

export default HomeScreen;
