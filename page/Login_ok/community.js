import { Ionicons } from "@expo/vector-icons";
import { Text, View, Dimensions, ScrollView, Image } from "react-native";
import { auth, db } from "../../firebase";
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
import { useEffect, useState } from "react";
import { useRef } from "react";

const Community = () => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "PostDesc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let PostData = [];
      snapshot.docs.forEach((doc, idx) => {
        PostData.push(doc.data());
        PostData[idx].check = false;
        PostData[idx].id = doc.id;
      });
      setData(PostData);
      console.log(PostData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Text
        style={{
          padding: widths * 0.06,
          fontFamily: "Pretendard-Bold",
          fontSize: widths * 0.08,
          color: "#fff",
          paddingTop: heights * 0.07,
          backgroundColor: "#6A994E",
        }}
      >
        커뮤니티
      </Text>
      <ScrollView
        style={{
          width: widths,
        }}
      >
        <View
          style={{
            width: widths,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data.map((it, idx) => {
            return (
              <View
                style={{
                  width: widths,
                  position: "relative",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                  padding: widths * 0.06,
                }}
              >
                <View
                  style={{
                    width: widths,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    source={{ uri: it.userImage }}
                    style={{
                      width: widths * 0.15,
                      height: widths * 0.15,
                      marginRight: widths * 0.02,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "Pretendard-Bold",
                      fontSize: widths * 0.045,
                      color: "#555",
                    }}
                  >
                    {it.userName}
                  </Text>
                </View>

                <View
                  style={{
                    padding: widths * 0.02,
                  }}
                >
                  <Text
                    style={{
                      color: "#555",
                      fontSize: widths * 0.05,
                      fontFamily: "Pretendard-Bold",
                      marginTop: widths * 0.03,
                    }}
                  >
                    {it.title}
                  </Text>
                  <Text
                    style={{
                      marginTop: widths * 0.04,
                      marginBottom: widths * 0.03,
                      color: "gray",
                      fontSize: widths * 0.035,
                      fontFamily: "Pretendard-Regular",
                      backgroundColor: "#f8fafc",
                      padding: widths * 0.025,
                    }}
                  >
                    {it.desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: widths * 0.02,
                      }}
                    >
                      <Ionicons
                        name={it.check == false ? "heart-outline" : "heart"}
                        size={widths * 0.09}
                        style={{
                          color: it.check == false ? "gray" : "coral",
                          marginRight: widths * 0.01,
                        }}
                        onPress={() => {}}
                      />
                      <Ionicons
                        name="chatbubble-outline"
                        size={widths * 0.08}
                        style={{
                          color: "#555",
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "Pretendard-Regular",
                        color: "gray",
                        fontSize: widths * 0.035,
                      }}
                    >
                      {new Date(it.date).getFullYear() +
                        "." +
                        (new Date(it.date).getMonth() + 1 > 9
                          ? new Date(it.date).getMonth() + 1
                          : "0" + (new Date(it.date).getMonth() + 1)) +
                        "." +
                        new Date(it.date).getDate() +
                        "."}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Community;
