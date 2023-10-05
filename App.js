import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './page/Login';
import Password from './page/Register/Password';
import NameEmail from './page/Register/NameEmail';
import UserImage from './page/Register/UserImage';
import IntroScreen from './page/Intro';
import MyTabs from './page/Login_ok/BottomNavigation';
import FriendUserList from './page/Login_ok/MyPageSub/FriendUserList';
import ChatList from './page/Login_ok/ChatList';
import Chat from './page/Login_ok/Chat';


const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='Intro' screenOptions={
        {
          headerShown:false
        }
      }>
        <Stack.Screen name='Intro' component={IntroScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='BottomNavigation' component={MyTabs} />
        <Stack.Screen name='NameEmail' component={NameEmail} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='UserImage' component={UserImage} />
        <Stack.Screen name='FriendUserList' component={FriendUserList} />
        <Stack.Screen name='ChatList' component={ChatList} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;