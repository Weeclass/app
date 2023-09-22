import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity,Dimensions, Text , Keyboard,KeyboardAvoidingView,TextInput ,Platform,Image} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from 'firebase/auth';



const UserImage = ({navigation,route}) => {
    const asset = "../../assets/";
    const [avatar, setAvatar] = useState('user1.png');
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;

    const actionCodeSettings = {
        url: 'https://www.example.com/?email=' + route.params.email,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        handleCodeInApp: true,
        // When multiple custom dynamic link domains are defined, specify which
        // one to use.
        dynamicLinkDomain: "example.page.link"
    };
      
    const register = async () => {

    
        await createUserWithEmailAndPassword(auth, route.params.email, route.params.password)
        .then((userCredential) => {
            // Registered
            
            const user = userCredential.user;
       
            updateProfile(user, {
                displayName: route.params.name,
                photoURL: avatar,
            })
            .then(() => {
                alert('회원가입이 완료되었습니다.');
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.message);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == "auth/invalid-password"){
                alert('비밀번호는 6자리 이상이여야 합니다.');
            }
            else if(errorCode == "auth/invalid-email"){
                alert("존재하지 않는 이메일입니다.")
            }
            alert(error);
            
        });

        await sendEmailVerification(auth.currentUser)
        .then(() => {
            
            alert("인증 이메일을 보냈습니다.")
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error)
        });
        
       
    }

    return (
        <TouchableOpacity 
        style={{
            width:widths,
            height:heights,
            
        }}
        onPress={()=>{
            Keyboard.dismiss();
        }}
        activeOpacity={1}   
    >
            <KeyboardAvoidingView 
                flex={1}
                behavior={"padding"}
            
                style={{
                    alignItems: 'flex-start',
                    padding: widths * 0.08,
                    paddingTop: Platform.OS == "ios" ?  widths * 0.15 : widths * 0.1 ,
                    backgroundColor:'white',
                    justifyContent:'flex-start',
                    
                    }}
            >
                
                <View style={{
                     width: widths - widths * 0.16,
                     display:'flex',
                     marginBottom: heights * 0.05,
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'space-between',
                }}>
                    <Ionicons 
                        style={{
                            color:'#ffd954',
                            fontSize:50,
                            marginLeft: widths * -0.04
                        }}

                        onPress={() => {
                            navigation.pop();
                        }}
                        
                        name={"chevron-back-outline"}
                    />

                    <Text style={{
                        color:'#ffd954',
                        fontSize: widths* 0.05,
                        fontWeight:'bold',
                       
                    }}>
                        프로필 이미지
                    </Text>
                </View>

                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'space-around'
                }}>
                    <TouchableOpacity onPress={()=>{
                        setAvatar("user1.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user1.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                    }}
                    >
                        <Image source={require(asset+"user1.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user2.png");
                    }} 
                    activeOpacity={0.7}
                     style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user2.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                    }}
                    >
                        <Image source={require(asset+"user2.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user3.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user3.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                    }}
                    >
                        <Image source={require(asset+"user3.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user4.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user4.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user4.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user5.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user5.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user5.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user6.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user6.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user6.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user7.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user7.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user7.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user8.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user8.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user8.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />

                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>{
                        setAvatar("user9.png");
                    }}
                    activeOpacity={0.7}
                    style={{
                        borderRadius:10,
                        backgroundColor: avatar == "user9.png" ? '#ffd954' : "transparent",
                        padding: widths * 0.01,
                        marginBottom:heights * 0.03
                       
                    }}
                    >
                        <Image source={require(asset+"user9.png")} style={{
                            width:widths * 0.2,
                            height:widths * 0.2,
                           
                    }} />

                    </TouchableOpacity>
                </View>

        
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        width:widths - widths * 0.16,
                        marginTop: heights * 0.05,
                    }}
                >
                    
                    <TouchableOpacity 
                        onPress={register}

                        style={{
                            backgroundColor:'#ffd954',
                            width:widths - widths * 0.16,
                            paddingLeft:widths * 0.05,
                            paddingRight:widths * 0.05,
                            paddingTop:heights * 0.02,
                            paddingBottom:heights * 0.02,
                            borderRadius:5 ,
                        
                        }}>
                        <Text style={{
                            color:'white',
                            fontWeight:'bold',
                            fontSize:widths * 0.05,
                            textAlign:'center',
                        }}>
                            가입하기
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
     </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingTop: 60,
        backgroundColor:'white',
        alignItems:'flex-start'
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

export default UserImage;