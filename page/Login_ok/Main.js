import { View,Text, Dimensions,Image,TouchableOpacity,ScrollView
    ,ImageBackground,Platform,PanResponder,Animated} from "react-native";
import { auth } from '../../firebase';
import React,{useState} from 'react'
import mainImage from '../../assets/mainImage2.png';
import banner from '../../assets/banner.jpg';
import back from '../../assets/back.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BackgroundImage } from "react-native-elements/dist/config";

const Main = ({navigation}) => {
    const widths = Dimensions.get("screen").width;
    const heights  = Dimensions.get("screen").height;
    const fadeAnim = React.useRef(new Animated.Value(heights)).current;

    const panResponder = React.useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => false,
          onPanResponderMove: (event, gestureState)=>{
                fadeAnim.setValue(gestureState.moveY-heights * 0.5);

          },
          onPanResponderRelease: (event, gestureState) => {
         
                if(gestureState.moveY > heights * 0.5 ||  gestureState.vy > 1.5) {
                    Down();
                }
        }
        }),
      ).current;

     const Up = () => {
      Animated.timing(fadeAnim, {
        toValue: heights * -0.23,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
    };

    const Down = () => {
      Animated.timing(fadeAnim, {
        toValue: heights,
        duration: 500,
        useNativeDriver: true,
      }).start();
     
    };
    return (
        <View style={{
            flex:1,
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

                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>   
                  
                    <TouchableOpacity activeOpacity={0.8} 
                        onPress={Up}
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

                    <Ionicons
                        name="chatbubbles-outline"
                        style={{
                            marginLeft: widths *0.05,
                            fontSize: widths* 0.1,
                            color:'gold'
                        }}
                        onPress={()=>{
                            navigation.push("ChatList");
                        }}
                    />
                </View>
            </View>

            <View style={{
 
              
                paddingTop: heights * 0.005,
                paddingBottom: heights * 0.005,
                flexDirection:'row',
                alignItems:'center'
            }}>
                    <Image source={{uri:auth.currentUser.photoURL}} style={{
                        width: widths*0.17,
                        height: widths * 0.17,
                        marginRight:widths * 0.04,
                        backgroundColor:'#eee',
                        borderRadius: widths,
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
                marginTop:heights * 0.035,
                marginBottom:heights * 0.045,
                backgroundColor:'#eee',
                borderWidth: 2,
                borderColor:'gold'
            }}/>


            <View 
                style={{
                   marginLeft: widths * -0.05, 
                   width: widths,
                   height: Platform.OS == "ios" ? heights * 0.45 : heights * 0.43,
                   marginBottom: Platform.OS == "ios" ? heights * 0 : heights * -0.01,
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
                    height: heights * 0.5,
                    paddingTop: Platform.OS == "ios" ? heights * 0.1 : heights * 0.09,

                }}>
                    <ScrollView horizontal={true} style={{
                        height: heights * 0.4
                    }}>
                      
                        <View style={{
                           
                            height: heights * 0.3,
                            marginLeft: widths * 0.05,
                            backgroundColor:'white',
                            borderRadius:10,
                            flexDirection:'row',
                            borderWidth:1,
                            borderColor:"#eee"
                        }}>
                            <Image source={banner} style={{
                                width: heights * 0.21,
                                height: heights * 0.3,
                                borderRadius:5,
                            }}/>      

                            
                            <View style={{
                                width: heights * 0.21,
                                height: heights * 0.3,
                                borderRadius: 5,
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center',
                            }}>
                                <Image source={{uri:auth.currentUser.photoURL}} style={{
                                    width: widths*0.17,
                                    height: widths * 0.17,
                                    backgroundColor:'#eee',
                                    borderRadius: widths,
                                }}/> 

                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize: widths * 0.05,
                                    marginTop: heights * 0.02,
                                    marginBottom: heights * 0.03,
                                }}>
                                    이규빈 선생님
                                </Text>


                                <TouchableOpacity onPress={()=>{alert('상세보기')}}>
                                    <Text style={{
                                            color:'gold',
                                            padding: 10,
                                            borderWidth: 1,
                                            borderColor: 'gold',
                                            borderRadius: widths * 0.05,
                                            fontSize: widths * 0.035,
                                            
                                    }}>
                                        이벤트 상세보기
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>    

                        <View style={{
                            height: heights * 0.3,
                            marginLeft: widths * 0.05,
                            marginRight: widths * 0.05,
                            backgroundColor:'white',
                            borderRadius:10,
                            flexDirection:'row',
                            borderWidth:1,
                            borderColor:"#eee"
                        }}>
                            <Image source={banner} style={{
                               width: heights * 0.21,
                               height: heights * 0.3,
                                borderRadius:5,
                            }}/>  

                            <View style={{
                                width: heights * 0.21,
                                borderRadius: 5,
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center',
                            }}>
                                <Image source={{uri:auth.currentUser.photoURL}} style={{
                                    width: widths*0.17,
                                    height: widths * 0.17,
                                    backgroundColor:'#eee',
                                    borderRadius: widths,
                                }}/> 

                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize: widths * 0.05,
                                    marginTop: heights * 0.02,
                                    marginBottom: heights * 0.03,
                                }}>
                                    이규빈 선생님
                                </Text>


                                <TouchableOpacity onPress={()=>{alert('상세보기')}}>
                                    <Text style={{
                                            color:'gold',
                                            padding: 10,
                                            borderWidth: 1,
                                            borderColor: 'gold',
                                            borderRadius: widths * 0.05,
                                            fontSize: widths * 0.035,
                                            
                                    }}>
                                        이벤트 상세보기
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            </View>    
                    </ScrollView>          
                </BackgroundImage>

                
                <Animated.View
                      {...panResponder.panHandlers}

                    style={{
                        width: widths,
                        backgroundColor:'#fff',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        padding:widths * 0.04,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: heights * 0.03,
                        borderWidth: 2,
                        borderBottomWidth:0,
                        borderColor: "#eee",
                        position:'absolute',
                        height: heights,
                        top: 0,
                        transform: [{
                            translateY: fadeAnim,
                          }],
                        
                    }}>
                        
                  
                        <View style={{
                            width: widths * 0.25,
                            height: heights * 0.012,
                            backgroundColor:'#ddd',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: widths,
                        }}></View>
                   
                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>1교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>2교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>3교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>4교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>5교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>6교시</Text>
                    </View>

                    <View style={{
                        padding: widths * 0.05,
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize: widths * 0.065,
                        }}>7교시</Text>
                    </View>
                </Animated.View >
            </View>
        </View>
        
    )
}



export default Main;