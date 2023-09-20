import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity ,Text, Dimensions,Image,Keyboard,KeyboardAvoidingView,TextInput,Platform} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';
import Logo from "../assets/Logo.jpg";

const Login = ({navigation}) => {
    
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // navigation.push('Chat');

            if(auth.currentUser.emailVerified){
                
                alert('로그인 성공')
            
                navigation.navigate('Main');
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
      };

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
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              
                style={{
                    alignItems: 'center',
                    paddingLeft: widths * 0.075,
                    paddingRight: widths * 0.075,
                    backgroundColor:'white',
                    justifyContent:'center',
                    
                     }}
            >
                <Image
                    style={{
                        width: widths * 0.8,
                        height: widths * 0.8,
                        marginBottom : heights * 0.03,
                        marginTop: heights * -0.1,
                    }}
                    source={Logo}
                />
              <View>
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
                            width: widths * 0.85,
                            padding: widths * 0.035,
                            borderRadius: 5,
                            fontSize:20,
                            color: "#555",
                            fontWeight:'bold',
                            backgroundColor:'#f8f8f8',
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
                        width: widths * 0.85,
                        padding: widths * 0.035,
                        borderRadius: 5,
                        fontSize:20,
                        color: "#555",
                        fontWeight:'bold',
                        backgroundColor:'#f8f8f8',
                    }}
                    placeholder='비밀번호를 입력하세요'
                    onChangeText={text => setPassword(text)}
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
                            onPress={signin}

                            style={{
                                backgroundColor:'#ffd954',
                                width:widths * 0.41,
                                paddingLeft:widths * 0.05,
                                paddingRight:widths * 0.05,
                                paddingTop:heights * 0.022,
                                paddingBottom:heights * 0.022,
                           
                                borderRadius: 5
                            }}>
                            <Text style={{
                                color:'white',
                                fontWeight:'bold',
                                fontSize:widths * 0.05,
                                textAlign:'center',
                            }}>
                                로그인
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={()=> {
                                navigation.push("Register")
                            }}

                            style={{
                                backgroundColor:'#ffd954',
                                width:widths * 0.41,
                                paddingLeft:widths * 0.05,
                                paddingRight:widths * 0.05,
                                paddingTop:heights * 0.022,
                                paddingBottom:heights * 0.022,
                               
                                borderRadius:5,
                            
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
    input: {

    }
})
export default Login;