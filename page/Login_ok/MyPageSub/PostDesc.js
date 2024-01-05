import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import tree1 from "../../../assets/tree1.png";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../../firebase";

const PostDesc = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  let title;
  let desc;

  const addPost = async () => {
    const docRef = await addDoc(collection(db, "PostDesc"), {
      userName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      userImage: auth.currentUser.photoURL,
      title: title,
      desc: desc,
      date: new Date().getTime(),
      hearts: 0,
    });

    await updateDoc(doc(db, "PostDesc", docRef.id), {
      // teacherName
      code: docRef.id,
    });
    console.log(docRef.id);
    alert("작성완료");
    navigation.pop();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
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
            작성하기
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={{
          padding: widths * 0.1,
          paddingTop: 0,
          width: widths,
          height: heights * 0.8,
          marginTop: heights * 0.02,
        }}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={{
              padding: widths * 0.03,
              backgroundColor: "#f9f9f9",
              borderRadius: widths * 0.02,
              fontSize: widths * 0.05,
              fontFamily: "Pretendard-Regular",
            }}
            placeholder={"간단한 제목"}
            placeholderTextColor={"gray"}
            onChangeText={(text) => (title = text)}
          />

          <TextInput
            multiline
            numberOfLines={4}
            maxLength={200}
            style={{
              marginTop: heights * 0.03,
              height: heights * 0.3,
              padding: widths * 0.03,
              backgroundColor: "#f9f9f9",
              borderRadius: widths * 0.02,
              fontSize: widths * 0.05,
              paddingTop: widths * 0.03,
              fontFamily: "Pretendard-Regular",
            }}
            placeholder={"내용을 입력해주세요."}
            placeholderTextColor={"gray"}
            onChangeText={(text) => (desc = text)}
          />
        </KeyboardAvoidingView>

        <View
          style={{
            marginTop: heights * 0.03,

            width: widths * 0.8,
            height: heights * 0.08,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: widths * 0.02,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#386641",
              width: widths * 0.8,
              height: heights * 0.07,
            }}
            onPress={addPost}
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostDesc;
