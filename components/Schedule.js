import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import NavBar from "./NavBar";

const CourseCard = ({ time, period, courseCode, room }) => (
  <View style={styles.courseCardContainer}>
    <View style={styles.courseTimeContainer}>
      <Text style={styles.courseTime}>{time}</Text>
      <Text style={styles.coursePeriod}>{period}</Text>
    </View>
    <View style={styles.courseDetailContainer}>
      <Text style={styles.courseCode}>{courseCode}</Text>
      <Text style={styles.courseRoom}>{room}</Text>
    </View>
  </View>
);

const coursesData = [
  { time: "10", period: "AM", courseCode: "CS 2340", room: "Room 101" },
  { time: "11", period: "AM", courseCode: "CS 1332", room: "Room 101" },
  { time: "12", period: "PM", courseCode: "CS 2110", room: "Room 101" },
  { time: "01", period: "PM", courseCode: "PSYC 1101", room: "Room 101" },
  { time: "02", period: "PM", courseCode: "CS 2340", room: "Room 101" },
];

function ScheduleScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          resizeMode="auto"
          source={{ uri: "headerIconUri" }}
          style={styles.headerIcon}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>My Courses</Text>
        </View>
        <View style={styles.privacyIcon}>
          <Image
            resizeMode="cover"
            source={{ uri: "privacyIconUri" }}
            style={styles.privacyIconImage}
          />
          <Text style={styles.privacyText}>Private</Text>
        </View>
      </View>
      <Image
        resizeMode="auto"
        source={{ uri: "bannerUri" }}
        style={styles.bannerImage}
      />
      <View style={styles.coursesListContainer}>
        {coursesData.map((course, index) => (
          <CourseCard
            key={index}
            time={course.time}
            period={course.period}
            courseCode={course.courseCode}
            room={course.room}
          />
        ))}
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    maxWidth: 480,
    width: "100%",
    paddingTop: 33,
    alignItems: "center",
    color: "#010618",
  },
  headerContainer: {
    width: "100%",
    maxWidth: 390,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerIcon: {
    width: 28,
    aspectRatio: 1,
    tintColor: "#545454",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 29,
    fontFamily: "sans-serif",
  },
  privacyIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyIconImage: {
    width: 28,
    aspectRatio: 1,
  },
  privacyText: {
    fontSize: 14,
    fontFamily: "sans-serif",
  },
  bannerImage: {
    width: "100%",
    maxWidth: 390,
    aspectRatio: 3.13,
  },
  coursesListContainer: {
    width: "100%",
    maxWidth: 390,
    paddingHorizontal: 9,
  },
  courseCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  courseTimeContainer: {
    backgroundColor: "#4AD2C9",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  courseTime: {
    fontSize: 12,
    fontWeight: "700",
  },
  coursePeriod: {
    fontSize: 8,
    fontWeight: "400",
    marginTop: 2,
  },
  courseDetailContainer: {
    backgroundColor: "#4AD2C9",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: "700",
  },
  courseRoom: {
    fontSize: 8,
    fontWeight: "400",
    marginTop: 2,
  },
  footerIcon: {
    width: "100%",
    aspectRatio: 5.56,
    marginTop: 182,
  },
});

export default ScheduleScreen;
