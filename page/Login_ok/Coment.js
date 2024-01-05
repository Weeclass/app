import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  TextInput,
  ScrollView,
  NativeModules,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
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

const { StatusBarManager } = NativeModules;

const Coment = ({ navigation, route }) => {
  const routerData = route.params.data;
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const [data, setData] = useState([]);
  const [titleText, setTitleText] = useState([]);

  useEffect(() => {
    const setStatusBarHeightAsync = async () => {
      if (Platform.OS === "ios") {
        const statusBarHeight = await new Promise((resolve) => {
          StatusBarManager.getHeight((statusBarFrameData) => {
            resolve(statusBarFrameData.height);
          });
        });
        setStatusBarHeight(statusBarHeight);
      }
    };

    setStatusBarHeightAsync();

    const q = query(
      collection(db, "coment"),
      where("code", "==", routerData.code)
    );

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
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <ScrollView>
      <View
        style={{
          width: widths,
          padding: widths * 0.05,
          paddingTop: Platform.OS == "ios" ? heights * 0.07 : heights * 0.04,
          paddingBottom: heights * 0.03,
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
            댓글
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: 10,
          padding: widths * 0.04,
        }}
      >
        <Text
          style={{
            width: widths * 0.9,
            color: "#272727",
            fontSize: widths * 0.06,
            padding: widths * 0.02,
            fontFamily: "Pretendard-Bold",
            marginBottom: 5,
          }}
        >
          {routerData.title}
        </Text>

        <View
          style={{
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              width: widths * 0.9,
              color: "gray",
              fontSize: widths * 0.04,
              padding: widths * 0.02,
              fontFamily: "Pretendard-Regular",
              borderRadius: 10,
            }}
          >
            {routerData.desc}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={{
          padding: widths * 0.05,
          paddingTop: 0,
          width: widths,
          height: heights * 0.1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={Keyboard.dismiss}
      >
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={100}
          style={{
            width: widths * 0.65,

            padding: widths * 0.03,
            backgroundColor: "#f9f9f9",
            borderRadius: widths * 0.02,
            fontSize: widths * 0.05,
            paddingTop: widths * 0.03,
            fontFamily: "Pretendard-Regular",
          }}
          placeholder={"내용을 입력해주세요."}
          placeholderTextColor={"gray"}
          onChangeText={(text) => {
            setTitleText(text);
          }}
          value={titleText}
        />

        <TouchableOpacity
          onPress={async () => {
            if (titleText == "") {
              alert("내용이 비어있습니다.");
              return false;
            }
            setTitleText("");
            const docRef = await addDoc(collection(db, "coment"), {
              code: routerData.code,
              text: titleText,
            });
          }}
          style={{
            borderRadius: widths * 0.02,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#386641",
            width: widths * 0.2,
            height: heights * 0.06,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: widths * 0.045,
              fontFamily: "Pretendard-Bold",
            }}
          >
            작성
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View
        style={{
          height: heights * 0.8,
          backgroundColor: "#f8fafc",
          padding: widths * 0.08,
        }}
      >
        <ScrollView>
          {data.map((it) => {
            return (
              <View
                style={{
                  opacity: 0.5,
                  padding: widths * 0.03,
                  borderRadius: widths * 0.01,
                  backgroundColor: "#6A994E",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pretendard-Regular",
                    color: "white",
                  }}
                >
                  {it.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Coment;
