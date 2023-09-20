    import React, { useCallback, useState, useLayoutEffect } from 'react';
    import { View, Text, StyleSheet, TouchableOpacity ,Platform,KeyboardAvoidingView,Dimensions} from 'react-native';
    import { Avatar } from 'react-native-elements';
    import { auth, db } from '../firebase';
    import { signOut } from 'firebase/auth';
    import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
    import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
    import Ionicons from '@expo/vector-icons/Ionicons';

    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;

    const renderSend = (props) => {
        return (
          <Send {...props}>
            <Ionicons
                name="navigate-circle-outline"
                style={{
                    fontSize: widths* 0.1,
                    color:'#f2ab39'
                }}
            />
          </Send>
        );
      };
    

    const CustomBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f2ab39',
              },
              right: {
                backgroundColor:'#ffd954' ,
              },
            }}
          />
        );
      };


    const Chat = ({ navigation }) => {
        const [messages, setMessages] = useState([]);
        const signOutNow = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                navigation.replace('Login');
            }).catch((error) => {
                // An error happened.
            });
        }
        useLayoutEffect(() => {
            navigation.setOptions({
                headerShown:true,
                headerLeft: () => (
                    <View style={{ marginLeft: 20 }}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL,
                            }}
                        />
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{  
                        marginRight: 10
                    }}
                        onPress={signOutNow}
                    >
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                )
            })
            
            const q = query(collection(db, 'chats'),where("user._id","in",["chanbin5634@gmail.com","chanbin5634@naver.com"]),orderBy("createdAt","desc"));
    
            const unsubscribe = onSnapshot(q, (snapshot) => setMessages(

                snapshot.docs.map(doc => (

                    {
                        _id:  doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                    }
                )
                    
                )
            ));

            return () => {
            unsubscribe();
            };

        }, [navigation]);

        const onSend = useCallback((messages = []) => {
            const { _id, createdAt, text, user,} = messages[0]

            addDoc(collection(db, 'chats'), { _id, createdAt,  text, user, });
        }, []);


        
        return (
            <KeyboardAvoidingView
        
            style={{
                paddingLeft:widths * 0.05,
                paddingRight:widths * 0.05,
                paddingTop:heights * 0.02,
                paddingBottom:heights * 0.02,
                           
                backgroundColor:'white',
            }}
            flex={1}
            
        >


                <GiftedChat
                    placeholder='메세지를 입력하세요.'
                    textStyle={{ color: '#ffd954' }}
                    showUserAvatar={true}
                    messages={messages ? messages : []}
                    showAvatarForEveryMessage={true}
                    alignTop={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.displayName,
                        avatar: auth?.currentUser?.photoURL
                    }}
                    renderBubble={props => (
                        <CustomBubble
                          {...props}
                          user={auth?.currentUser} // 현재 사용자 정보 전달
                        />
                      )}

                      renderSend={renderSend}

                    
                />
            </KeyboardAvoidingView>
        );
    }

    export default Chat;