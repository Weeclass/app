import { View, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import AddFriends from "./MyPageSub/AddFriends";
import { Ionicons } from "@expo/vector-icons";

import tree1 from "../../assets/tree1.png";

const MyPage = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [user, setUser] = useState([]);
  const [addFriend, setAddFriend] = useState([]);
  const [Follow, setFollow] = useState([]);
  const [Follower, setFollower] = useState([]);
  const [nanoseconds, setNanoseconds] = useState(0);
  let userData = [];
  let addFriendsData = [];
  let follow = [];
  let followers = [];

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", auth.currentUser.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc) => {
        userData.push(doc.data());
      });
      setUser(userData[0]);
      setNanoseconds(userData[0].createdAt.seconds * 1000);
    });

    const q2 = query(
      collection(db, "add_friends"),
      where("firstUserEmail", "==", auth.currentUser.email)
    );
    const q3 = query(
      collection(db, "add_friends"),
      where("secondUserEmail", "==", auth.currentUser.email)
    );
    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      addFriendsData = [];
      snapshot.docs.forEach((doc, idx) => {
        addFriendsData.push(doc.data());
        addFriendsData[idx].id = doc.id;
      });
      followers = addFriendsData.filter((it) => it.friend_Ok == true);
      addFriendsData = addFriendsData.filter((it) => it.friend_Ok == false);
      setFollower(followers);
      setAddFriend(addFriendsData);

      onSnapshot(q3, (snapshots) => {
        follow = [];
        snapshots.docs.forEach((doc) => {
          follow.push(doc.data());
        });
        follow = follow.filter((it) => it.friend_Ok == true);
        setFollow(follow);
      });
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: widths,
          height: heights * 0.25,
          backgroundColor: "#6a994e",
          borderBottomRightRadius: widths * 0.05,
          borderBottomLeftRadius: widths * 0.05,
        }}
      />

      <View
        style={{
          width: widths,
          marginRight: "auto",
          padding: widths * 0.05,
          paddingTop: Platform.OS == "ios" ? heights * 0.07 : heights * 0.035,
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Image
            source={{ uri: user.userImage }}
            style={{
              width: widths * 0.2,
              height: widths * 0.2,
              borderRadius: widths,
              marginBottom: heights * 0.02,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#386641",
              justifyContent: "space-between",
              width: widths * 0.6,
              padding: widths * 0.04,
              borderRadius: widths,
              paddingLeft: widths * 0.06,
              paddingRight: widths * 0.06,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: widths * 0.06,
                marginRight: widths * 0.03,
                color: "white",
              }}
            >
              {user.name}
            </Text>

            <View
              style={{
                padding: widths * 0.035,
                backgroundColor: "#fff",
                borderRadius: widths,
                borderWidth: 4,
                borderColor: "#a7c957",
              }}
            >
              {/* <Text style={{
                                color:'#272727',
                                fontFamily: "Pretendard-Bold",
                            }}>
                                Wee와 함께한지 {((new Date().getTime() - nanoseconds) / (3600000 * 24)+1).toFixed(0)}일
                            </Text> */}
              <Image
                source={tree1}
                style={{
                  width: widths * 0.06,
                  height: widths * 0.06,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: heights * 0.02,
          width: widths * 0.85,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push("Consultation");
          }}
          style={{
            padding: widths * 0.04,
            backgroundColor: "#a7c957",
            alignItems: "center",
            borderRadius: widths * 0.02,
            width: widths * 0.25,
          }}
        >
          <Ionicons
            name="bookmarks-outline"
            size={widths * 0.05}
            style={{
              color: "white",
              marginBottom: widths * 0.02,
            }}
          />

          <Text
            style={{
              color: "white",
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.04,
            }}
          >
            작성글
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("Diary");
          }}
        >
          <View
            style={{
              padding: widths * 0.04,
              backgroundColor: "#a7c957",
              alignItems: "center",
              borderRadius: widths * 0.02,
              width: widths * 0.25,
            }}
          >
            <Ionicons
              name="book-outline"
              size={widths * 0.05}
              style={{
                color: "white",
                marginBottom: widths * 0.02,
              }}
            />

            <Text
              style={{
                color: "white",
                fontFamily: "Pretendard-Bold",
                fontSize: widths * 0.04,
              }}
            >
              다이어리
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push("History");
          }}
        >
          <View
            style={{
              padding: widths * 0.04,
              backgroundColor: "#a7c957",
              alignItems: "center",
              borderRadius: widths * 0.02,
              width: widths * 0.25,
            }}
          >
            <Ionicons
              name="file-tray-full-outline"
              size={widths * 0.05}
              style={{
                color: "white",
                marginBottom: widths * 0.02,
              }}
            />

            <Text
              style={{
                color: "white",
                fontFamily: "Pretendard-Bold",
                fontSize: widths * 0.04,
              }}
            >
              상담내역
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {auth.currentUser.email == "gyubin0605@naver.com" ||
      auth.currentUser.email == "chanbin5634@gmail.com" ? (
        <View>
          <Text
            style={{
              marginTop: heights * 0.04,
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.07,
              marginRight: "auto",
              marginLeft: widths * 0.05,
            }}
          >
            관리자
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate("SangdamList");
            }}
            style={{
              marginTop: 10,
              backgroundColor: "#f8fafc",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: widths * 0.9,
                padding: widths * 0.04,
                paddingRight: widths * 0.06,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="checkmark"
                  style={{ color: "#272727", marginRight: widths * 0.04 }}
                  size={widths * 0.07}
                />
                <Text
                  style={{
                    color: "#272727",
                    fontSize: widths * 0.045,
                    fontFamily: "Pretendard-Regular",
                  }}
                >
                  상담요청
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate("EventCreate");
            }}
            style={{
              marginTop: 10,
              backgroundColor: "#f8fafc",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: widths * 0.9,
                padding: widths * 0.04,
                paddingRight: widths * 0.06,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="add"
                  style={{ color: "#272727", marginRight: widths * 0.04 }}
                  size={widths * 0.07}
                />
                <Text
                  style={{
                    color: "#272727",
                    fontSize: widths * 0.045,
                    fontFamily: "Pretendard-Regular",
                  }}
                >
                  이벤트 작성
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}

      <Text
        style={{
          marginTop: 20,
          fontFamily: "Pretendard-Bold",
          fontSize: widths * 0.07,
          marginRight: "auto",
          marginLeft: widths * 0.05,
        }}
      >
        친구
      </Text>
      <View
        style={{
          marginTop: heights * 0.01,
          backgroundColor: "#f8fafc",
          borderRadius: widths * 0.03,
        }}
      >
        <AddFriends
          text={"팔로우"}
          data={Follow}
          navigation={navigation}
          type={"Follow"}
        />
        <AddFriends
          text={"팔로워"}
          data={Follower}
          navigation={navigation}
          type={"Follower"}
        />
        <AddFriends
          text={"팔로우 요청"}
          data={addFriend}
          navigation={navigation}
          type={"addFollow"}
        />
      </View>
    </View>
  );
};

export default MyPage;
