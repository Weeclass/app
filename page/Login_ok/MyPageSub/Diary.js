import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Animated,
  TouchableOpacity,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const widths = Dimensions.get("window").width;
const heights = Dimensions.get("window").height;
let today = new Date();

const MonthDayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function Diary({ navigation }) {
  const [check, SetCheck] = useState(false);
  const [title, SetTitle] = useState("");
  const [desc, SetDesc] = useState("");

  todayDate = new Date(
    `${today.getFullYear()}-${today.getMonth() + 1}-1`
  ).getDay();

  const [clickDay, SetclickDay] = useState(false);
  const [TitleArr, setTitleArr] = useState([]);
  const [descArr, setdescArr] = useState([]);

  const brr = [];

  for (let i = 0; i < 42; i++) {
    brr.push("");
  }

  useEffect(() => {
    setTitleArr(brr);
  }, []);

  const fadeAnim = React.useRef(new Animated.Value(heights)).current;

  const Up = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const Down = () => {
    Animated.timing(fadeAnim, {
      toValue: heights,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* <Image source={backCalPng} style={{
              width:widths,
              height:heights,
              position:'absolute',

            }}/> */}

      <View
        style={{
          width: widths,
          flexDirection: "row",
          backgroundColor: "#6a994e",
          padding: widths * 0.03,
          paddingTop: Platform.OS == "ios" ? heights * 0.08 : heights * 0.04,
          paddingRight: widths * 0.05,
        }}
      >
        <Ionicons
          name="chevron-back"
          onPress={() => {
            navigation.pop();
          }}
          size={widths * 0.1}
          style={{
            color: "#fff",
          }}
        />
        <Text
          style={{
            fontSize: widths * 0.08,
            fontFamily: "Pretendard-Bold",
            color: "#fff",
          }}
        >
          {today.getMonth() + 1}월
        </Text>
      </View>

      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: heights * 0.01,
            backgroundColor: "#6a994e",
            padding: widths * 0.05,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            일
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            월
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            화
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            수
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            목
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            금
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Pretendard-Bold",
              width: (widths - widths * 0.05) / 7,
              fontSize: widths * 0.045,
              color: "#fff",
            }}
          >
            토
          </Text>
        </View>
        <View
          style={{
            width: widths - widths * 0.05,
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {TitleArr.map((a, i) => {
            return (
              <TouchableOpacity
                style={{
                  width: (widths - widths * 0.05) / 7,
                  height: (widths - widths * 0.05) / 7,
                  borderColor:
                    i - 1 == today.getDate()
                      ? "gold"
                      : !(i - todayDate + 2 >= 1 && i - todayDate + 1 < 31)
                      ? "#fff"
                      : new Date(
                          `${today.getFullYear()}-${today.getMonth() + 1}-${
                            i - todayDate + 1
                          }`
                        ).getDay() == 0
                      ? "#fff"
                      : new Date(
                          `${today.getFullYear()}-${today.getMonth() + 1}-${
                            i - todayDate + 1
                          }`
                        ).getDay() == 6
                      ? "#fff"
                      : "#fff",
                  borderCollapse: "collapse",
                  borderUpWidth: widths * 0.001,

                  backgroundColor:
                    i - todayDate + 1 == today.getDate()
                      ? "#a7c957"
                      : "tranparent",
                  borderRadius: widths * 0.02,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={0.5}
                onPress={() => {
                  if (
                    i - todayDate + 1 >= 1 &&
                    i - todayDate + 1 <= MonthDayArr[today.getMonth()]
                  ) {
                    Up();
                    SetclickDay(i + 1);
                  }
                }}
              >
                <Text
                  style={{
                    color:
                      i - todayDate + 1 == today.getDate()
                        ? "white"
                        : new Date(
                            `${today.getFullYear()}-${today.getMonth() + 1}-${
                              i - todayDate + 1
                            }`
                          ).getDay() == 0
                        ? "#555"
                        : new Date(
                            `${today.getFullYear()}-${today.getMonth() + 1}-${
                              i - todayDate + 1
                            }`
                          ).getDay() == 6
                        ? "#555"
                        : "#555",
                    fontSize: widths * 0.04,
                    textAlign: "center",
                    fontFamily: "Pretendard-Regular",
                  }}
                >
                  {i - todayDate + 1 >= 1 &&
                  i - todayDate + 1 <= MonthDayArr[today.getMonth()]
                    ? i - todayDate + 1
                    : ""}
                </Text>

                {/* <Text
                  style={{
                    fontSize: 10,
                    color: "#555",
                    fontFamily: "Pretendard-Regular",
                    fontSize: widths * 0.035,
                  }}
                >
                  {TitleArr[i]}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Animated.View
        style={{
          top: 0,
          width: widths,
          height: heights,
          backgroundColor: "#fff",
          position: "absolute",
          transform: [
            {
              translateY: fadeAnim,
            },
          ],
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            padding: widths * 0.1,
            paddingTop: 0,
            width: widths,
            height: heights,
          }}
          onPress={Keyboard.dismiss}
        >
          <View
            style={{
              width: widths,
              padding: widths * 0.1,
              paddingTop: widths * 0.15,
              backgroundColor: "#6a994e",
              marginBottom: heights * 0.03,
              marginLeft: widths * -0.1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              name="chevron-down"
              size={widths * 0.1}
              style={{
                color: "white",
              }}
              onPress={Down}
            />
            <Text
              style={{
                fontSize: widths * 0.06,
                fontFamily: "Pretendard-Bold",
                color: "#fff",
              }}
            >
              {today.getMonth() + 1 + "월 "}
              {clickDay - todayDate}일
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              onChangeText={(newText) => SetTitle(newText)}
              style={{
                padding: widths * 0.03,
                backgroundColor: "#f9f9f9",
                borderRadius: widths * 0.02,
                fontSize: widths * 0.05,
                fontFamily: "Pretendard-Regular",
              }}
              defaultValue={TitleArr[clickDay - 1]}
              placeholder={"간단한 제목"}
              placeholderTextColor={"gray"}
            />

            <TextInput
              onChangeText={(newTexts) => SetDesc(newTexts)}
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
              defaultValue={descArr[clickDay - 1]}
              placeholder={"내용을 입력해주세요."}
              placeholderTextColor={"gray"}
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
              onPress={() => {
                TitleArr[clickDay - 1] = title;
                descArr[clickDay - 1] = desc;
                setTitleArr(TitleArr);
                setdescArr(descArr);
                Down();
                SetTitle("");
                SetDesc("");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: widths * 0.045,
                  fontFamily: "Pretendard-Bold",
                }}
              >
                저장하기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
