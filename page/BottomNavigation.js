import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
      <Tab.Navigator initialRouteName='Main' screenOptions={({ route }) => ({
        headerShown:false,
        tabBarLabelStyle:{
            display:'none'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          iconName = "home"
          if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === '통계'){
            iconName = focused ? 'podium' : 'podium-outline';
          } else if (route.name === '설정'){
            iconName = focused ? 'settings' : 'settings-outline';
          }

     

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size}  color={color}/>;
        },
      })}
      
    
      tabBarOptions={{
      
        activeTintColor: '#ffd954',
        inactiveTintColor: '#ddd',
      }}>
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="Chat" component={Main} />
      </Tab.Navigator>
    );
  }

export default MyTabs;