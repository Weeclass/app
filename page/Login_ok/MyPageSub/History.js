import { Ionicons } from "@expo/vector-icons";
import { Text, View, Dimensions, ScrollView, Image } from "react-native";
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
import tree1 from "../../../assets/tree1.png";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const History = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "Reservation"),
      where("userName", "==", auth.currentUser.displayName),
      orderBy("date", "desc") // "asc"는 오름차순, "desc"는 내림차순입니다.
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let PostData = [];
      snapshot.docs.forEach((doc) => {
        PostData.push(doc.data());
      });
      setData(PostData);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: widths,
          padding: widths * 0.05,
          paddingTop: Platform.OS == "ios" ? heights * 0.08 : heights * 0.04,
          paddingBottom: heights * 0.04,
          backgroundColor: "#6a994e",
        }}
      >
        <View
          style={{
            width: widths * 0.9,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Ionicons
            name="chevron-back"
            size={widths * 0.1}
            style={{
              color: "white",
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
          <Text
            style={{
              fontSize: widths * 0.08,
              fontFamily: "Pretendard-Bold",
              color: "white",
            }}
          >
            상담내역
          </Text>
        </View>
      </View>

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
              <TouchableOpacity
                onPress={() => {
                  navigation.push("HistoryDetail", { data: it });
                }}
                activeOpacity={0.8}
                style={{
                  width: widths,
                  height: widths * 0.18,
                  backgroundColor: idx % 2 == 0 ? "#fff" : "#f8fafc",
                  position: "relative",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: widths * 0.15,
                    height: widths * 0.18,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#a7c957",
                      width: widths * 0.07,
                      height: widths * 0.07,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: widths * 0.01,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Pretendard-Bold",
                        color: "white",
                      }}
                    >
                      {idx + 1}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: widths * 0.85,
                    padding: widths * 0.04,
                    paddingLeft: widths * 0.02,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                        fontFamily: "Pretendard-Bold",
                        fontSize: widths * 0.045,
                        color: "#777",
                        marginRight: 5,
                      }}
                    >
                      {it.class}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "Pretendard-Regular",
                        fontSize: widths * 0.03,
                        color: "#555",
                        marginTop: "auto",
                      }}
                    >
                      {new Date(it.date).toISOString().slice(0, 10)}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "Pretendard-Bold",
                      color:
                        it.state == 0
                          ? "gray"
                          : it.state == 1
                          ? "yellowgreen"
                          : it.state == 2
                          ? "coral"
                          : "black",
                      fontSize: widths * 0.045,
                    }}
                  >
                    {it.state == 0
                      ? "확인중"
                      : it.state == 1
                      ? "수락됨"
                      : it.state == 2
                      ? "거부됨"
                      : "확인완료"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default History;
