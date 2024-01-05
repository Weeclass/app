import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./page/Login";
import Password from "./page/Register/Password";
import NameEmail from "./page/Register/NameEmail";
import UserImage from "./page/Register/UserImage";
import IntroScreen from "./page/Intro";
import MyTabs from "./page/Login_ok/BottomNavigation";
import FriendUserList from "./page/Login_ok/MyPageSub/FriendUserList";
import ChatList from "./page/Login_ok/ChatList";
import Chat from "./page/Login_ok/Chat";
import Consultation from "./page/Login_ok/MyPageSub/Consultation";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Diary from "./page/Login_ok/MyPageSub/Diary";
import PostDesc from "./page/Login_ok/MyPageSub/PostDesc";
import PostDetail from "./page/Login_ok/MyPageSub/PostDetail";
import History from "./page/Login_ok/MyPageSub/History";
import HistoryDetail from "./page/Login_ok/MyPageSub/HistoryDetail";
import SangdamList from "./page/Login_ok/MyPageSub/sangdamList";
import SangdamOkNo from "./page/Login_ok/MyPageSub/sangdamOkNo";
import EventCreate from "./page/Login_ok/MyPageSub/eventCreate";
import Coment from "./page/Login_ok/Coment";

const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("./assets/font/Pretendard-Regular.otf"),
    "Pretendard-Bold": require("./assets/font/Pretendard-Bold.otf"),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomNavigation" component={MyTabs} />
          <Stack.Screen name="NameEmail" component={NameEmail} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="UserImage" component={UserImage} />
          <Stack.Screen name="FriendUserList" component={FriendUserList} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Consultation" component={Consultation} />
          <Stack.Screen name="Diary" component={Diary} />
          <Stack.Screen name="PostDesc" component={PostDesc} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
          <Stack.Screen name="SangdamList" component={SangdamList} />
          <Stack.Screen name="SangdamOkNo" component={SangdamOkNo} />
          <Stack.Screen name="EventCreate" component={EventCreate} />
          <Stack.Screen name="Coment" component={Coment} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
