import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import ImageItem from "./ImageItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserImage = ({ navigation, route }) => {
  const ImageArr = [];
  for (let i = 10; i <= 21; i++) {
    ImageArr.push(i);
  }
  const [School, setSchool] = useState("NULL");
  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/user1.png?alt=media&token=881821fb-1ea0-4a38-8b25-d79b2c8b98ce"
  );
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const onChangeImage = (img) => {
    setAvatar(img);
  };

  const register = async () => {
    if (School == "NULL" || School == "") {
      alert("학교 이름을 입력해주세요.");
      return;
    }
    await createUserWithEmailAndPassword(
      auth,
      route.params.email,
      route.params.password
    )
      .then((userCredential) => {
        // Registered

        const user = userCredential.user;

        updateProfile(user, {
          displayName: route.params.name,
          photoURL: avatar,
        })
          .then(() => {
            const setData = async () => {
              await AsyncStorage.setItem("School", School);
              await AsyncStorage.setItem("pw", password);
            };
            setData();
            addDoc(collection(db, "users"), {
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              userImage: user.photoURL,
              school: School,
              createdAt: new Date(),
              level: 0,
            });
            alert("회원가입이 완료되었습니다.");
            navigation.navigate("Login");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-password") {
          alert("비밀번호는 6자리 이상이여야 합니다.");
        } else if (errorCode == "auth/invalid-email") {
          alert("존재하지 않는 이메일입니다.");
        }
        alert(error);
      });

    await sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("인증 이메일을 보냈습니다.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
      });
  };

  return (
    <TouchableOpacity
      style={{
        width: widths,
        height: heights,
        backgroundColor: "#fff",
      }}
      onPress={() => {
        Keyboard.dismiss();
      }}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{
          alignItems: "flex-start",
          padding: widths * 0.08,
          paddingTop: Platform.OS == "ios" ? widths * 0.12 : widths * 0.1,
          backgroundColor: "white",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: widths - widths * 0.16,
            display: "flex",
            marginBottom: heights * 0.02,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons
            style={{
              color: "#386641",
              fontSize: 50,
              marginLeft: widths * -0.04,
            }}
            onPress={() => {
              navigation.pop();
            }}
            name={"chevron-back-outline"}
          />

          <Text
            style={{
              color: "#6a994e",
              fontSize: widths * 0.05,
              fontFamily: "Pretendard-Bold",
            }}
          >
            학교이름 & 프로필 이미지
          </Text>
        </View>

        <View style={{}}>
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              color: "#6a994e",
              fontSize: 15,
              marginBottom: heights * 0.01,
            }}
          >
            학교 이름
          </Text>
          <TextInput
            style={{
              width: widths * 0.85,
              padding: widths * 0.035,
              paddingLeft: widths * 0.01,
              fontSize: 20,
              color: "#222",
              fontFamily: "Pretendard-Bold",
              borderColor: "#a7c957",
              borderBottomWidth: 2,
            }}
            placeholderTextColor="#ddd"
            placeholder="학교이름을 입력하세요"
            onChangeText={(text) => setSchool(text)}
          />
        </View>

        <View
          style={{
            width: widths,
            marginLeft: widths * -0.08,
            padding: widths * 0.05,
            paddingBottom: 0,
            height: heights * 0.45,
            marginTop: heights * 0.01,
          }}
        >
          <ScrollView style={{}}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {ImageArr.map((item) => {
                return (
                  <ImageItem
                    img={item}
                    avatar={avatar}
                    onChangeImage={onChangeImage}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={register}
          style={{
            backgroundColor: "#386641",
            width: widths - widths * 0.16,
            paddingTop: heights * 0.02,
            paddingBottom: heights * 0.02,
            borderRadius: 5,
            marginTop: heights * 0.05,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.05,
              textAlign: "center",
            }}
          >
            가입하기
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingTop: 60,
    backgroundColor: "white",
    alignItems: "flex-start",
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default UserImage;
