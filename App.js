import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/Login";
import CreateAccountScreen from "./components/CreateAccount";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Home";
import ProfileScreen from "./components/Profile";
import StatisticsScreen from "./components/Statistics";
import ScheduleScreen from "./components/Schedule";
import EventScreen from "./components/Event";
import AddEventSuccessScreen from "./components/AddEventSuccess";
import CourseList from "./components/CourseList";
import MessagesScreen from "./components/Messages";
import { PostHogProvider } from "posthog-react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PostHogProvider
        apiKey="phc_xRrOygZfl72Ev1xjTlUiFncCYHeji8dPIxsfmq1YlWj"
        options={{
          host: "https://app.posthog.com",
        }}
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="CourseList" component={CourseList} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          {/* <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Success" component={AddEventSuccessScreen} />
          {/*<Stack.Screen name="Edit Profile" component={EditProfileScreen} /> */}
        </Stack.Navigator>
      </PostHogProvider>
    </NavigationContainer>
  );
}
