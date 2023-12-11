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
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChatList = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [alreadyUser, setAlreadyUser] = useState([]);
  let userData = [];
  let addFriendsData = [];
  let already = [];

  useEffect(() => {
    const q = query(collection(db, "users"));
    const q2 = query(
      collection(db, "add_friends"),
      where("secondUserEmail", "==", auth.currentUser.email),
      where("friend_Ok", "==", true)
    );

    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      addFriendsData = [];
      snapshot.docs.forEach((doc) => {
        addFriendsData.push(doc.data().firstUserEmail);
      });

      onSnapshot(q, (snapshot) => {
        userData = [];
        already = [];
        snapshot.docs.forEach((doc) => {
          if (addFriendsData.includes(doc.data().email)) {
            userData.push(doc.data());
          }
        });

        setAlreadyUser(already);
        userData = userData.filter((it) => it.email != auth.currentUser.email);
        setUser(userData);
      });
    });

    return () => {
      unsubscribe2();
    };
  }, []);
  const getData = () => {
    return search == "" ? user : user.filter((it) => it.name.includes(search));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS == "ios" ? heights * 0.06 : heights * 0.025,
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
            borderColor: "#a7c957",
            borderWidth: 2,
            borderRadius: 10,
          }}
        >
          <Ionicons
            name="search-outline"
            style={{
              color: "#a7c957",
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
            width: widths,
            paddingLeft: widths * 0.05,
          }}
        >
          {getData().map((it) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Chat", {
                    opponent: it.email,
                    name: it.name,
                    img: it.userImage,
                  });
                }}
              >
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
                          fontFamily: "Pretendard-Bold",
                          color: "#386641",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {it.name}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontSize: widths * 0.03,
                          color: "#6a994e",
                          marginTop: heights * 0.005,
                          fontFamily: "Pretendard-Bold",
                        }}
                      >
                        {it.school}
                      </Text>

                      <Text
                        style={{
                          fontSize: widths * 0.03,
                          fontFamily: "Pretendard-Regular",
                          color: "#a7c957",
                        }}
                      >
                        {it.email}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      }
    </View>
  );
};

export default ChatList;
