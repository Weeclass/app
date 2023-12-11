import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import ChatList from "./ChatList";
import Chat from "./Chat";
import UserList from "./UserList";
import Person from "./MyPage";
import Community from "./Community";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }) {
  const check = async () => {
    const arr = ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"];

    if (
      (await AsyncStorage.getItem("date")) == new Date().getDate().toString()
    ) {
    } else {
      arr.forEach(async (element) => {
        await AsyncStorage.removeItem(element);
      });
      await AsyncStorage.setItem("date", new Date().getDate().toString());
    }
  };

  check();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          iconName = "home";
          if (route.name === "Person") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "UserList") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "설정") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name == "Community") {
            iconName = focused ? "grid" : "grid-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#a7c957",
        inactiveTintColor: "#ddd",
      }}
    >
      <Tab.Screen name="Main" component={Main} navigation={navigation} />
      <Tab.Screen name="UserList" component={UserList} />
      <Tab.Screen
        name="Community"
        component={Community}
        navigation={navigation}
      />
      <Tab.Screen name="Person" component={Person} navigation={navigation} />
    </Tab.Navigator>
  );
}

export default MyTabs;
