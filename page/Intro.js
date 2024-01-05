import { View, Image, Dimensions, Text } from "react-native";
import { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";
import img from "../assets/yoga.png";

export default function App({ navigation }) {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  useEffect(async () => {
    let id = null;
    let pw = null;

    try {
      id = await AsyncStorage.getItem("id");
      pw = await AsyncStorage.getItem("pw");
      if (id != null) {
        signInWithEmailAndPassword(auth, id, pw)
          .then((userCredential) => {
            if (auth.currentUser.emailVerified) {
              navigation.navigate("BottomNavigation");
            } else {
              alert("이메일 인증이 되지 않음");
            }
          })
          .catch((error) => {
            navigation.navigate("Login");
          });
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      alert(error);
    }
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: widths * 0.08,
        paddingTop: heights * 0.1,
      }}
    >
      <Text
        style={{
          color: "#386641",
          fontFamily: "Pretendard-Regular",
          fontSize: widths * 0.05,
        }}
      >
        함께하는 따뜻한 마음
      </Text>
      <Text
        style={{
          fontSize: widths * 0.2,
          fontFamily: "Pretendard-Bold",
          color: "#6A994E",
        }}
      >
        Wee
      </Text>
      <Text
        style={{
          fontSize: widths * 0.2,
          fontFamily: "Pretendard-Bold",
          color: "#A7C957",
          marginBottom: heights * 0.1,
        }}
      >
        Class
      </Text>

      <Image
        source={img}
        style={{
          borderRadius: widths,
          width: widths * 0.7,
          height: widths * 0.7,
          marginRight: widths * -0.05,
          marginLeft: "auto",
          marginTop: "auto",
          marginBottom: heights * 0.03,
        }}
      />
      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          color: "gray",
          textAlign: "center",
        }}
      >
        모든 아이콘 제작자: Freepik - Flaticon 및 Expo
      </Text>
    </View>
  );
}
