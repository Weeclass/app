import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './page/Login';
import RegisterScreen from './page/Register';
import IntroScreen from './page/Intro';
import ChatScreen from './page/Chat';
import MainScreen from './page/Main';


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
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;