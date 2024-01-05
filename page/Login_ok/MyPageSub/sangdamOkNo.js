import { useRef, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
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
import * as FileSystem from "expo-file-system";
import { TouchableHighlight } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import SignatureScreen from "react-native-signature-canvas";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SangdamOkNo = ({ navigation, route }) => {
  const routerData = route.params.data;
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  console.log(routerData);
  return (
    <View
      style={{
        paddingTop: heights * 0.05,
        flex: 1,
        backgroundColor: "white",
        padding: widths * 0.05,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: heights * 0.025,
        }}
      ></View>

      <Text
        style={{
          width: widths * 0.9,
          color: "#272727",
          fontSize: widths * 0.06,
          padding: widths * 0.02,
          marginBottom: 10,
        }}
      >
        {routerData.class}
      </Text>

      <View
        style={{
          borderRadius: 10,
          backgroundColor: "#f8fafc",
        }}
      >
        <Text
          style={{
            width: widths * 0.9,
            color: "gray",
            fontSize: widths * 0.04,
            padding: widths * 0.05,
            borderRadius: 10,
          }}
        >
          {routerData.userName}
        </Text>
      </View>

      <View
        style={{
          borderRadius: 10,
          backgroundColor: "#f8fafc",
          borderColor: "#f1f1f1",
          marginTop: 15,
        }}
      >
        <Text
          style={{
            width: widths * 0.9,
            color: "gray",
            fontSize: widths * 0.045,
            padding: widths * 0.05,
          }}
        >
          {new Date(routerData.date).toISOString().substring(0, 10)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: widths * 0.43,
            backgroundColor: "#6a994e",
            height: widths * 0.15,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: heights * 0.03,
          }}
          onPress={async () => {
            // routerData
            await updateDoc(doc(db, "Reservation", routerData.id), {
              // teacherName
              state: 1,
            });

            alert("확인이 되었습니다.");
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.05,
            }}
          >
            수락
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: widths * 0.43,
            backgroundColor: "coral",
            height: widths * 0.15,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: heights * 0.03,
          }}
          onPress={async () => {
            // routerData
            await updateDoc(doc(db, "Reservation", routerData.id), {
              // teacherName
              state: 2,
            });

            alert("거부가 되었습니다.");
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.05,
            }}
          >
            거부
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          width: widths * 0.9,
          backgroundColor: "#6a994e",
          height: widths * 0.15,
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: heights * 0.03,
        }}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Pretendard-Bold",
            fontSize: widths * 0.05,
          }}
        >
          뒤로가기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SangdamOkNo;
