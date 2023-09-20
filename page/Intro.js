import { View,Image,Dimensions } from "react-native";
import Logo from "../assets/GIF.gif";
import { useEffect } from "react";



export default function App({navigation}){
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;

    useEffect(()=>{
        setTimeout(()=>{
            navigation.push('Login');
        },2500);
    },[])


    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#FFD900',
      
        }}>
            <Image
                style={{
                    borderWidth: 0,
                    width: widths * 0.8
                }}
                source={Logo}
            />
        </View>
    )
}