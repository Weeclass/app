import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity,Dimensions, Text , Keyboard,KeyboardAvoidingView,TextInput ,Platform} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from 'firebase/auth';
const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;

    const actionCodeSettings = {
        url: 'https://www.example.com/?email=' + email,
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

        if(password != checkPassword) {
      
            alert('비밀번호가 맞지 않습니다.')
            Keyboard.dismiss()
        }
        else{
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registered
                
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    // photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                    job: "student",
                })
                .then(() => {
                    alert('Registered, please login.');
                // navigation.pop();
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
                
                alert("인증메일 발송")
            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(error)
            });
        }
       
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
            <View style={{
             marginTop:heights * 0.03,
            }}>
            <Text style={{
                fontWeight:'bold',
                color:"#ffd954",
                fontSize:15,
                marginBottom:heights * 0.01
            }}>
                이름
            </Text>
            <TextInput
                
                style={{
                    width: widths * 0.8,
                    padding: widths * 0.035,
                    borderRadius: 5,
                    fontSize:widths * 0.05,
                    color: "#555",
                    fontWeight:'bold',
                   backgroundColor:'#f5f5f5',
                }}
                placeholder='이름을 입력하세요'
                onChangeText={text => setName(text)}
           
            />

        </View>
        
        

          <View 
            style={{
                marginTop:heights * 0.03
            }}
          >
            <Text style={{
                fontWeight:'bold',
                color:"#ffd954",
                fontSize:15,
                marginBottom:heights * 0.01
            }}>
                이메일
            </Text>
            <TextInput
                    style={{
                        width: widths * 0.8,
                        padding: widths * 0.035,
                        borderRadius: 5,
                        fontSize:widths * 0.05,
                        color: "#555",
                        fontWeight:'bold',
                       backgroundColor:'#f5f5f5',
                    }}
                    placeholder='이메일을 입력하세요'
                    onChangeText={text => setEmail(text)}
                />
          </View>


        <View style={{
             marginTop:heights * 0.03
        }}>
            <Text style={{
                fontWeight:'bold',
                color:"#ffd954",
                fontSize:15,
                marginBottom:heights * 0.01
            }}>
                비밀번호
            </Text>
            <TextInput
                
                style={{
                    width: widths * 0.8,
                    padding: widths * 0.035,
                    borderRadius: 5,
                    fontSize:widths * 0.05,
                    color: "#555",
                    fontWeight:'bold',
                   backgroundColor:'#f5f5f5',
                }}
                placeholder='비밀번호를 입력하세요'
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

        </View>

        <View style={{
             marginTop:heights * 0.03
        }}>
            <Text style={{
                fontWeight:'bold',
                color:"#ffd954",
                fontSize:15,
                marginBottom:heights * 0.01
            }}>
                비밀번호 확인
            </Text>
            <TextInput
                
                style={{
                    width: widths * 0.8,
                    padding: widths * 0.035,
                    borderRadius: 5,
                    fontSize:widths * 0.05,
                    color: "#555",
                    fontWeight:'bold',
                   backgroundColor:'#f5f5f5',
                }}
                placeholder='비밀번호를 입력하세요'
                onChangeText={text => setCheckPassword(text)}
                secureTextEntry
            />

        </View>


        
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        width:widths * 0.85,
                        marginTop: heights * 0.03,
                    }}
                >
                    
                    <TouchableOpacity 
                        onPress={register}

                        style={{

                            backgroundColor:'#ffd954',
                            width:widths * 0.8,
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
                            회원가입
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

export default Register;