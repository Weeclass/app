import {View,Dimensions,Text,TextInput,Image,Platform,TouchableOpacity,ScrollView} from 'react-native'
import { auth, db } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserList = () => {

    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;
    const [user,setUser] = useState([]);
    const [search,setSearch] = useState("");
    const [alreadyUser,setAlreadyUser] = useState([]);
    let userData = []; 
    let addFriendsData = [];
    let already = [];
    
    useEffect(()=>{
        const q = query(collection(db, 'users'));
        const q2 = query(collection(db, 'add_friends'), where('secondUserEmail', '==', auth.currentUser.email));
    
        const unsubscribe2 = onSnapshot(q2, (snapshot) => {
            addFriendsData = [];
            snapshot.docs.forEach((doc) => {
                addFriendsData.push(doc.data().firstUserEmail);
            });
       

          
            onSnapshot(q, (snapshot) => {
                userData = [];
                already = [];
                snapshot.docs.forEach((doc) => {
                    if(addFriendsData.includes(doc.data().email)){
                        already.push(doc.data().email);
                    }
                    
                    userData.push(doc.data());
                });
         
                setAlreadyUser(already);
                userData = userData.filter((it) => it.email != auth.currentUser.email);
                setUser(userData);
            })
        }); 
    

        return () => {
            unsubscribe2();
        };
    },[])
    const getData = () => {
        return search == "" ?  user : user.filter((it) => (it.name).includes(search))
    }

    return(
        <View style={{
            flex:1,
            backgroundColor:'white',
            paddingTop: Platform.OS == "ios" ? heights * 0.07 : heights * 0.05,
            alignItems:'center',
           
        }}>
            
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginBottom:heights * 0.02,
                width: widths * 0.85,
                fontSize: widths * 0.05,
                color: "#222",
                paddingLeft:widths * 0.04,
                fontWeight:'bold',
                borderColor: 'gold',
                borderWidth:2,
                borderRadius:10,
            }}>
                <Ionicons name='search-outline' 
                    style={{
                        color:'gold',
                    }}
                    size={widths * 0.06}
                />
                <TextInput
                    style={{
                        width:widths * 0.75,
                        paddingLeft: widths * 0.03,
                        paddingRight: widths * 0.04,
                        paddingTop: heights * 0.015,
                        paddingBottom: heights * 0.015,
                        fontSize:widths * 0.05,
                    }}
                    
                    placeholderTextColor="#ddd"
                    placeholder="사용자를 입력하세요."
                    onChangeText={text =>  setSearch(text)} 
                />
            </View>
           {
           <ScrollView style={{
                width: widths - widths * 0.15,
               }}>
                    {
                        getData().map((it) => {
                            return(
                                <View style={{
                                    paddingTop: heights * 0.01,
                                    paddingBottom: heights * 0.01,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:"space-between"
                                }}>
                                    <View style={{
                                         flexDirection:'row',
                                         alignItems:'center',
                                    }}>
                                        <Image source={{uri:it.userImage}} style={{
                                                width: widths*0.17,
                                                height: widths * 0.17,
                                                marginRight:widths * 0.02,
                                                backgroundColor:'#eee',
                                                borderRadius: widths,
                                            }}/> 
                                        <View>
                                            <Text style={{
                                                    fontSize: widths * 0.05,
                                                }}>
                                                    <Text style={{
                                                        fontWeight:'bold',
                                                    }}>
                                                        {it.name}
                                                    </Text>
                                            </Text>
                        
                                            <Text style={{
                                                fontSize:widths * 0.03,
                                                color: "gray",
                                                marginTop: heights * 0.005,
                                                fontWeight:'bold'
                                            }}>
                                                {it.school}
                                            </Text>

                                            <Text style={{
                                                fontSize:widths * 0.03,
                                                color: "#ffd954",
                                            }}>
                                                {it.email}
                                            </Text>
                                        </View>
                                    </View>
    
                                    <Ionicons name='person-add' size={widths * 0.07} style={{
                                        color:"#272727",
                                        
                                    }}  onPress={()=>{
                                     
                                        if(alreadyUser.includes(it.email)){
                                            alert("이미 친구 초대를 보낸 사람입니다.");
                                        }
                                        else{
                                            alert("친구발송")
                                            addDoc(collection(db,"add_friends"),{firstUserName:it.name,secondUserName:auth.currentUser.displayName,firstUserEmail:it.email,secondUserEmail:auth.currentUser.email,friend_Ok:false})
                                        }
                                       
                                        
                                    }} />
                                </View>
                            )
                        })
                    }
               </ScrollView>
           }
        </View>
    )
}

export default UserList;