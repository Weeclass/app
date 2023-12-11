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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const NameEmail = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const next = () => {
    navigation.navigate("Password", { email: email, name: name });
  };

  return (
    <TouchableOpacity
      style={{
        width: widths,
        height: heights,
      }}
      onPress={() => {
        Keyboard.dismiss();
      }}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        flex={1}
        behavior={"padding"}
        style={{
          alignItems: "flex-start",
          padding: widths * 0.08,
          paddingTop: Platform.OS == "ios" ? widths * 0.15 : widths * 0.1,
          backgroundColor: "white",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: widths - widths * 0.16,
            display: "flex",
            marginBottom: heights * 0.05,
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
            이름 & 이메일
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              color: "#6a994e",
              fontSize: 15,
              marginBottom: heights * 0.01,
            }}
          >
            이름
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
            placeholder="본인의 이름이나 별명을 입력하세요"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View
          style={{
            marginTop: heights * 0.03,
          }}
        >
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              color: "#6a994e",
              fontSize: 15,
              marginBottom: heights * 0.01,
            }}
          >
            이메일
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
            placeholder="이메일 형식에 맞게 입력해주세요."
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: widths - widths * 0.16,
            marginTop: heights * 0.03,
          }}
        >
          <TouchableOpacity
            onPress={next}
            style={{
              backgroundColor: "#386641",
              width: widths - widths * 0.16,
              paddingLeft: widths * 0.05,
              paddingRight: widths * 0.05,
              paddingTop: heights * 0.02,
              paddingBottom: heights * 0.02,
              borderRadius: 5,
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
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default NameEmail;
