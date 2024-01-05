import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
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

const Community = ({ navigation }) => {
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
                  backgroundColor: idx % 2 == 0 ? "white" : "#f8fafc",
                  padding: widths * 0.06,
                  paddingTop: widths * 0.05,
                  paddingBottom: widths * 0.05,
                }}
              >
                <View
                  style={{
                    padding: widths * 0.03,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#555",
                        fontSize: widths * 0.05,
                        fontFamily: "Pretendard-Bold",
                        marginTop: widths * 0.01,
                      }}
                    >
                      {it.title}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.push("Coment", { data: it });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: widths * 0.045,
                          textDecorationLine: "underline",
                        }}
                      >
                        댓글
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginTop: 25,
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        padding: widths * 0.005,
                        color: "gray",
                        fontSize: widths * 0.035,
                        fontFamily: "Pretendard-Regular",
                      }}
                    >
                      {it.desc}
                    </Text>
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
