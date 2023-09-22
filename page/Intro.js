import { View,Image,Dimensions } from "react-native";
import Logo from "../assets/Logo.jpg";
import { useEffect } from "react";
import { signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from '../firebase';



export default function App({navigation}){
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;

   
    const getData = async () => {
        let id = null;
        let pw = null;
       
        try {
            id = await AsyncStorage.getItem("id");     
            pw = await AsyncStorage.getItem("pw"); 
            
           
            if(id != null){
                signInWithEmailAndPassword(auth, id, pw)
                .then((userCredential) => {
                  if(auth.currentUser.emailVerified){
                        navigation.navigate('BottomNavigation');
                  }
                  else{
                      alert("이메일 인증이 되지 않음")
                  }
                 
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(errorMessage);
                });
                
                
            }
            else{
                navigation.navigate('Login');
            }
        } catch (error) {
            alert(error);
        }
     
    }

    getData();


    

    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff',
      
        }}>
            <Image
                style={{
                    borderWidth: 0,
                    width: widths * 0.6,
                    height: widths * 0.6
                }}
                source={Logo}
            />
        </View>
    )
}