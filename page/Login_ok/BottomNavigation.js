import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import ChatList from './ChatList';
import Chat from './Chat';
import UserList from './UserList';
import Person from './MyPage';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


function MyTabs({navigation}) {
    return (
      <Tab.Navigator initialRouteName='Main' screenOptions={({ route }) => ({
        headerShown:false,
        tabBarLabelStyle:{
            display:'none'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          iconName = "home"
          if (route.name === 'Person') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'UserList'){
            iconName = focused ? 'people' : 'people-outline';
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
        <Tab.Screen name="Main" component={Main} navigation={navigation} />
        <Tab.Screen name="UserList" component={UserList} />
        <Tab.Screen name="Person" component={Person} navigation={navigation} />
      </Tab.Navigator>
    );
  }

export default MyTabs;