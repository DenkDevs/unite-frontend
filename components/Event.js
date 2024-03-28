import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import NavBar from "./NavBar";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";

const EventDetails = ({ date, location }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsText}>
      {date} {"\n"} {location}
    </Text>
  </View>
);

const EventScreen = ({ navigation, route }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const { eventId } = route.params;

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

  const handleRSVP = () => {
    // Handle RSVP logic here
  };

  return (
    <View style={styles.mainContainer}>
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
              onPress={() => console.log("The Hive Location Clicked")}
              title="The Hive"
              color="#000"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => console.log("Save Event to Calendar")}
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
        <View style={styles.rsvpContainer}>
          <Button
            onPress={() => console.log("RSVP Button Clicked")}
            title="RSVP HERE!"
            color="#000"
          />
        </View>
      </View>
      <NavBar />
    </View>
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
});

export default EventScreen;
