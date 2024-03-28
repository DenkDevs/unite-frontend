import LoginScreen from "./components/Login";
import CreateAccountScreen from "./components/CreateAccount";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Home";
import ProfileScreen from "./components/Profile";
import StatisticsScreen from "./components/Statistics";
import ScheduleScreen from "./components/Schedule";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Schedule">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        {/*<Stack.Screen name="Edit Profile" component={EditProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
