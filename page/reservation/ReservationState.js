import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReservationState = ({ text, state, school }) => {
  const widths = Dimensions.get("screen").width;
  const [used, setUsed] = useState("");

  const addPost = async () => {
    const docRef = await addDoc(collection(db, "Reservation"), {
      id: "",
      userName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      class: text,
      date: new Date().getTime(),
      state: 0,
      teacherName: "",
      sign: "",
    });

    await updateDoc(doc(db, "Reservation", docRef.id), {
      id: docRef.id,
    });

    alert("신청완료");
  };

  const getUsed = async () => {
    setUsed(await AsyncStorage.getItem(text));
  };

  getUsed();

  return (
    <View
      style={{
        padding: widths * 0.035,
        width: widths * 0.75,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          fontSize: widths * 0.07,
          color: "#272727",
        }}
      >
        {text}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: used != text ? "#6a994e" : "gold",
          padding: widths * 0.02,
          borderRadius: widths * 0.02,
        }}
        onPress={async () => {
          const str = await AsyncStorage.getItem(text);
          if (str != text) {
            AsyncStorage.setItem(text, text);
            addPost();
            setUsed(await AsyncStorage.getItem(text));
          } else {
            alert("이미 신청을 하셨습니다.");
          }
          console.log(str);
        }}
      >
        <View
          style={{
            width: widths * 0.3,
            alignItems: "center",
            justifyContent: "center",
            padding: widths * 0.01,
          }}
        >
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.04,
              color: "white",
            }}
          >
            {used != text ? "신청하기" : "신청완료"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationState;
