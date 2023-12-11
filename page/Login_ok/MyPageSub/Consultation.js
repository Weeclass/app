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

const Consultation = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "PostDesc"),
      where("userEmail", "==", auth.currentUser.email)
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
            나의 작성글
          </Text>
          <Ionicons
            name="add-circle"
            size={widths * 0.1}
            style={{
              color: "white",
            }}
            onPress={() => {
              navigation.push("PostDesc");
            }}
          />
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
                  navigation.push("PostDetail", { data: it });
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
                        fontFamily: "Pretendard-Regular",
                        fontSize: widths * 0.045,
                        color: "#555",
                      }}
                    >
                      {it.title.toString().length > 20
                        ? it.title.slice(0, 20) + "..."
                        : it.title}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "Pretendard-Regular",
                      color: "gray",
                      fontSize: widths * 0.03,
                    }}
                  >
                    {new Date(it.date).toISOString().slice(0, 10)}
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

export default Consultation;
