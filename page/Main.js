import { View,Text, Dimensions,Image,TouchableOpacity,ScrollView,ImageBackground} from "react-native";
import { auth } from '../firebase';
import {useState} from 'react'
import mainImage from '../assets/mainImage2.png';
import banner from '../assets/banner.jpg';
import back from '../assets/back.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BackgroundImage } from "react-native-elements/dist/config";

const Main = () => {
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;
    
    const dynamicImage = `https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/${auth.currentUser.photoURL}?alt=media&token=fa7f85f5-e8fd-4553-b214-838a6a0cac77`
    return (
        <View style={{
            flex:1,
            paddingTop: heights * 0.06,
            backgroundColor:'white',
            paddingLeft: widths * 0.05,
            paddingRight: widths * 0.05,
            justifyContent:'flex-end'
        }}>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingTop: heights * 0.01,
                paddingBottom: heights * 0.01,
                marginBottom:heights * 0.01,
            }}>
                <Text style={{
                    fontSize: widths * 0.09,
                    fontWeight:"bold",
                    color: 'black',
                }}>
                WeeClass</Text>

                <TouchableOpacity activeOpacity={0.8} 
                    onPress={()=>{
                        alert("상담예약")
                    }}
                    
                >
                    <Text style={{
                        color:'gold',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: 'gold',
                        borderRadius: widths * 0.05,
                        fontSize: widths * 0.04,
                    }}>상담예약</Text>
                </TouchableOpacity>
            </View>

            <View style={{
 
              
                paddingTop: heights * 0.005,
                paddingBottom: heights * 0.005,
                flexDirection:'row',
                alignItems:'center'
            }}>
                    <Image source={{uri:dynamicImage}} style={{
                        width: widths*0.17,
                        height: widths * 0.17,
                        marginRight:widths * 0.04,
                        
                    }}/> 
                  <View>
                    <Text style={{
                            fontSize: widths * 0.065,
                        }}>
                            <Text style={{
                                fontWeight:'bold',
                            }}>
                                {auth.currentUser.displayName}
                            </Text>
                            님
                    </Text>

                    <Text style={{
                        fontSize:widths * 0.04,
                        color: "#ccc",
                        marginTop: heights * 0.005,
                        fontWeight:'bold'
                    }}>
                        힘나는 한 줄의 글을 써보세요.
                    </Text>
                  </View>
            </View>

            <Image source={mainImage} style={{
                width: widths - widths * 0.1,
                height : (widths - widths * 0.1) * 0.35,
                borderRadius: widths * 0.03,
                marginTop:heights * 0.03,
                marginBottom:heights * 0.05,
                backgroundColor:'red',
                borderWidth:2,
                borderColor:'#f5f5f5'
            }}/>


            <View 
                style={{
                   marginLeft: widths * -0.05, 
                   width: widths,
                   height: heights * 0.45,
                }}
            >
                {/* <Text style={{
                    fontWeight:'bold',
                    fontSize: widths * 0.055,
                    marginBottom: heights * 0.02,
                    marginLeft: widths * 0.05, 
                }}>
                위클래스 이벤트</Text>
 */}

                <BackgroundImage source={back} style={{
                    widths: widths,
                    height: heights * 0.45,
                    paddingTop:heights * 0.1,

                }}>
                    <ScrollView horizontal={true} style={{
                        height: heights * 0.4
                    }}>
                        <View style={{
                            width: (widths - widths * 0.1) / 2,
                            height: heights * 0.3,
                            alignItems:'center',
                            marginLeft: widths * 0.05,
                        
                        }}>
                            <Image source={banner} style={{
                                width: widths * 0.45,
                                height: heights * 0.3,
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius:5,
                            }}/>    
                        </View>    
                        
                        <View style={{
                            width: (widths - widths * 0.1) / 2,
                            height: heights * 0.3,
                            marginLeft: widths * 0.05,
                        }}>
                            <Image source={banner} style={{
                                width: widths * 0.45,
                                height: heights * 0.3,
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius:5,
                            }}/>      
                        </View>    

                        <View style={{
                        width: (widths - widths * 0.1) / 2,
                            height: heights * 0.3,
                            marginLeft: widths * 0.05,
                            marginRight: widths * 0.05,
                        }}>
                            <Image source={banner} style={{
                                width: widths * 0.45,
                                height: heights * 0.3,
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius:5,
                            }}/>  

                            </View>    
                    </ScrollView>          
                </BackgroundImage>
            </View>
        </View>
        
    )
}



export default Main;