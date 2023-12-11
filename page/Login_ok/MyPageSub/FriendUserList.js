import {
  View,
  Dimensions,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { auth, db } from "../../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserList = ({ navigation, route }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  let arr = [];
  let userData = [];
  let data = route.params.data;
  let type = route.params.type;

  console.log(data);
  if (type == "addFollow") {
    arr = data.map((it) => {
      if (it.friend_Ok == false) {
        return it.id;
      }
    });

    data = data.map((it) => {
      if (it.friend_Ok == false) {
        return it.secondUserEmail;
      }
    });
  } else if (type == "Follow") {
    data = data.map((it) => {
      if (it.friend_Ok == true) {
        return it.firstUserEmail;
      }
    });
  } else if (type == "Follower") {
    data = data.map((it) => {
      if (it.friend_Ok == true) {
        return it.secondUserEmail;
      }
    });
  }

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe2 = onSnapshot(q, (snapshot) => {
      userData = [];
      snapshot.docs.forEach((doc, idx) => {
        userData.push(doc.data());
      });

      userData = userData.filter((it) => data.includes(it.email));
      console.log(userData);
      setUser(userData);
    });

    return () => {
      unsubscribe2();
    };
  }, []);

  const getData = () => {
    return search == "" ? user : user.filter((it) => it.name.includes(search));
  };

  const deleteData = (email) => {
    setUser(user.filter((it) => it.email != email));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS == "ios" ? heights * 0.07 : heights * 0.05,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: widths * 0.9,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: heights * 0.02,
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="chevron-back"
          onPress={() => {
            navigation.pop();
          }}
          size={widths * 0.1}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: widths * 0.78,
            fontSize: widths * 0.05,
            color: "#222",
            paddingLeft: widths * 0.04,
            fontWeight: "bold",
            borderColor: "gold",
            borderWidth: 2,
            borderRadius: 10,
          }}
        >
          <Ionicons
            name="search-outline"
            style={{
              color: "gold",
            }}
            size={widths * 0.06}
          />
          <TextInput
            style={{
              width: widths * 0.8,
              paddingLeft: widths * 0.03,
              paddingRight: widths * 0.04,
              paddingTop: heights * 0.015,
              paddingBottom: heights * 0.015,
              fontSize: widths * 0.05,
              fontFamily: "Pretendard-Bold",
            }}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor="#ddd"
            placeholder="사용자를 입력하세요."
            // onChangeText={text => setPassword(text)}
          />
        </View>
      </View>
      {
        <ScrollView
          style={{
            width: widths - widths * 0.1,
          }}
        >
          {getData().map((it, idx) => {
            return (
              <View
                style={{
                  paddingTop: heights * 0.01,
                  paddingBottom: heights * 0.01,
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
                  <Image
                    source={{ uri: it.userImage }}
                    style={{
                      width: widths * 0.17,
                      height: widths * 0.17,
                      marginRight: widths * 0.02,
                      backgroundColor: "#eee",
                      borderRadius: widths,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: widths * 0.05,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Pretendard-Bold",
                        }}
                      >
                        {it.name}
                      </Text>
                    </Text>

                    <Text
                      style={{
                        fontSize: widths * 0.03,
                        color: "gray",
                        marginTop: heights * 0.005,
                        fontWeight: "bold",
                        fontFamily: "Pretendard-Bold",
                      }}
                    >
                      {it.school}
                    </Text>

                    <Text
                      style={{
                        fontSize: widths * 0.03,
                        color: "#ffd954",
                        fontFamily: "Pretendard-Regular",
                      }}
                    >
                      {it.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    display: type == "addFollow" ? "flex" : "none",
                  }}
                >
                  <Ionicons
                    name={"checkmark-circle"}
                    size={widths * 0.15}
                    style={{
                      color: "yellowgreen",
                      marginRight: widths * 0.015,
                    }}
                    onPress={() => {
                      const docRef = doc(db, "add_friends", arr[idx]);
                      // 업데이트할 데이터
                      const updatedData = {
                        friend_Ok: true,
                      };

                      // 문서 업데이트
                      updateDoc(docRef, updatedData)
                        .then(() => {
                          console.log("문서 업데이트 성공");
                          deleteData(it.email);
                        })
                        .catch((error) => {
                          console.error("문서 업데이트 실패", error);
                        });
                    }}
                  />

                  <Ionicons
                    name={"close-circle"}
                    size={widths * 0.15}
                    style={{
                      color: "crimson",
                    }}
                    onPress={() => {
                      const docRef = doc(db, "add_friends", arr[idx]);

                      deleteDoc(docRef)
                        .then(() => {
                          deleteData(it.email);
                          console.log("문서 삭제 성공");
                        })
                        .catch((error) => {
                          console.error("문서 삭제 실패", error);
                        });
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      }
    </View>
  );
};

export default UserList;
