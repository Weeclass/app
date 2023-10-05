import {View,Dimensions,Image,Text} from 'react-native'
import { auth, db } from '../../firebase';
import { collection, getDocs, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import {useState,useEffect} from 'react';
import AddFriends from './MyPageSub/AddFriends';


const MyPage = ({navigation}) => {
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;
    const [user,setUser] = useState([]);
    const [addFriend,setAddFriend] = useState([]);
    const [Follow,setFollow] = useState([]);
    const [Follower,setFollower] = useState([]);
    const [nanoseconds,setNanoseconds] = useState(0);
    let userData = [];    
    let addFriendsData = [];    
    let follow = [];
    let followers = [];
    
    useEffect(()=>{
        const q = query(collection(db, 'users'), where('email', '==', auth.currentUser.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            userData = [];
            snapshot.docs.forEach((doc) => {
                userData.push(doc.data());
            });
            setUser(userData[0]);
            setNanoseconds((userData[0].createdAt.seconds * 1000))
        }); 

        const q2 = query(collection(db, 'add_friends'), where('firstUserEmail', '==', auth.currentUser.email));
        const q3 = query(collection(db, 'add_friends'), where('secondUserEmail', '==', auth.currentUser.email));
        const unsubscribe2 = onSnapshot(q2, (snapshot) => {
            addFriendsData = [];
            snapshot.docs.forEach((doc,idx) => {
                addFriendsData.push(doc.data());
                addFriendsData[idx].id = doc.id;
            });      
            followers = addFriendsData.filter((it)=> it.friend_Ok == true);
            addFriendsData = addFriendsData.filter((it)=> it.friend_Ok == false);
            setFollower(followers);
            setAddFriend(addFriendsData);
            
            onSnapshot(q3, (snapshots) => {
                follow = [];
                snapshots.docs.forEach((doc) => {
                    follow.push(doc.data());
                });
                follow = follow.filter((it)=> it.friend_Ok == true);
                setFollow(follow); 
            }); 
           
        }); 
        
        return () => {
            unsubscribe();
            unsubscribe2();
        };
    },[])

    return(

        <View style={{
            backgroundColor:'#fff',
            flex:1,
            paddingTop: heights * 0.09,
            alignItems:'center',
        }}>

            <View style={{
                position:'absolute',
                top: widths * 0.15,
                right: widths * 0.05,
                backgroundColor:'gold',
                padding:10,
                borderRadius:5,
            }}>
                <Text style={{
                    color:'#fff',
                    fontWeight:'bold'  
                }}>
                    Wee {((new Date().getTime() - nanoseconds) / (3600000 * 24)+1).toFixed(0)}일차
                </Text>
            </View>
            <Image source={{uri: user.userImage}} style={{
                width:100,
                height:100,
                borderRadius:widths,
                marginBottom:heights * 0.01,
            }} />
            <View style={{
                flexDirection:'row',
                alignItems:'center',
            }}>
                <Text style={{
                    fontWeight:"bold",
                    fontSize: widths * 0.05,
                    marginRight:widths * 0.02,
                }}>
                    {user.name}
                </Text>

                <View style={{
                    borderRadius:10,
                    padding: 10,
                    backgroundColor: 'gold',
                   
                }}>
                    <Text style={{
                        fontWeight:'bold',
                        color:'white',
                    }}>
                        Lv.{user.level+1}
                    </Text>
                </View>
            </View>
            
            <View style={{
                marginTop:heights * 0.03,
                width:widths - widths * 0.1,
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                
                <View style={{
                    padding: 10,
                    backgroundColor:'#FBF7D6',
                    alignItems:'center',
                    borderRadius:10,
                    width: widths * 0.28,
                }}>
                    <Text style={{
                        color:'gray',
                        fontWeight:'bold',
                        marginBottom: heights * 0.008,
                    }}>
                        나의 작성글
                    </Text>

                    <Text
                     style={{
                        color:'gray',
                        fontWeight:'bold'
                    }}>
                        0
                    </Text>
                </View>

                <View style={{
                    padding: 10,
                    backgroundColor:'#FBF7D6',
                    alignItems:'center',
                    borderRadius:10,
                    width: widths * 0.28,
                }}>
                    <Text style={{
                        color:'gray',
                        fontWeight:'bold',
                        marginBottom: heights * 0.008,
                    }}>
                        나의 다이어리
                    </Text>

                    <Text
                     style={{
                        color:'gray',
                        fontWeight:'bold'
                    }}>
                        0
                    </Text>
                </View>

                <View style={{
                    padding: 10,
                    backgroundColor:'#FBF7D6',
                    alignItems:'center',
                    borderRadius:10,
                    width: widths * 0.28,
                }}>
                    <Text style={{
                        color:'gray',
                        fontWeight:'bold',
                        marginBottom: heights * 0.008,
                    }}>
                        나의 상담내역
                    </Text>

                    <Text
                     style={{
                        color:'gray',
                        fontWeight:'bold'
                    }}>
                        0
                    </Text>
                </View>
            </View>

          <View
            style={{
                marginTop:heights * 0.04
            }}
          >
            <AddFriends text={"팔로우"} data={Follow} navigation={navigation} type={"Follow"}/>
            <AddFriends text={"팔로워"} data={Follower} navigation={navigation} type={"Follower"}/>
            <AddFriends text={"팔로우 요청"} data={addFriend} navigation={navigation} type={"addFollow"}/>
          
          </View>
        
        </View>
    )
}


export default MyPage;