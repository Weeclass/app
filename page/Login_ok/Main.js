import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
  PanResponder,
  Animated,
  StatusBar,
} from "react-native";
import { auth, db } from "../../firebase";
import React, { useEffect, useState, useRef } from "react";
import mainImage from "../../assets/mainImage2.png";
import banner from "../../assets/banner.jpg";
import back from "../../assets/back.png";
import diary from "../../assets/diary.png";
import cons from "../../assets/cons.png";
import pencil from "../../assets/pencil.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BackgroundImage } from "react-native-elements/dist/config";
import ReservationState from "../reservation/ReservationState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { LinearGradient } from "expo-linear-gradient";
const Main = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const fadeAnim = React.useRef(new Animated.Value(heights)).current;
  let school = useRef("");
  let [reservationState, setReservationState] = useState({});

  const schoolData = async () => {
    school.current = await AsyncStorage.getItem("School");
  };
  const [count, setCount] = useState(0);
  useEffect(() => schoolData, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        fadeAnim.setValue(gestureState.moveY);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.moveY > heights * 0.5 || gestureState.vy > 1.5) {
          Down();
        } else {
          Up();
        }
      },
    })
  ).current;

  const Up = () => {
    Animated.timing(fadeAnim, {
      toValue: heights * 0.2,
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
        backgroundColor: "white",
        paddingLeft: widths * 0.05,
        paddingRight: widths * 0.05,
        paddingTop: Platform.OS == "ios" ? heights * 0.07 : heights * 0.035,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: heights * 0.01,
          marginBottom: heights * 0.01,
        }}
      >
        <Text
          style={{
            fontSize: widths * 0.09,
            fontFamily: "Pretendard-Bold",
            color: "#272727",
          }}
        >
          WeeClass
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={Up}
            style={{
              backgroundColor: "#6a994e",
              borderRadius: widths,
              padding: widths * 0.035,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                color: "white",
                fontSize: widths * 0.035,
              }}
            >
              상담예약
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginLeft: widths * 0.04,
              backgroundColor: "#6a994e",
              padding: widths * 0.02,
              borderRadius: widths,
            }}
          >
            <Ionicons
              name="chatbubbles"
              style={{
                fontSize: widths * 0.065,
                color: "white",
              }}
              onPress={() => {
                navigation.push("ChatList");
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          paddingTop: heights * 0.005,
          paddingBottom: heights * 0.005,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={{
            width: widths * 0.17,
            height: widths * 0.17,
            marginRight: widths * 0.04,
            backgroundColor: "#eee",
            borderRadius: widths,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: widths * 0.065,
              color: "#272727",
              fontFamily: "Pretendard-Bold",
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
              }}
            >
              {auth.currentUser.displayName}
            </Text>
            님
          </Text>

          <Text
            style={{
              fontSize: widths * 0.04,
              color: "#ccc",
              marginTop: heights * 0.005,
              fontFamily: "Pretendard-Bold",
            }}
          >
            힘나는 한 줄의 글을 써보세요.
          </Text>
        </View>
      </View>

      <Image
        source={mainImage}
        style={{
          width: widths - widths * 0.1,
          height: (heights - heights * 0.6) * 0.35,
          borderRadius: widths * 0.03,
          marginTop: heights * 0.02,
          marginBottom: heights * 0.03,
          backgroundColor: "#eee",
          borderWidth: 2,
          borderColor: "#f8fafc",
        }}
      />

      <View
        style={{
          width: widths,
          height: heights * 0.3,
          marginLeft: widths * -0.05,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: heights * 0.42,
            height: heights * 0.3,
            shadowColor: "gray",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <ScrollView horizontal={true} style={{}}>
            <LinearGradient
              colors={["#52aa5e", "#a5be00"]}
              style={{
                height: widths * 0.55,
                backgroundColor: "#6a994e",
                justifyContent: "flex-end",
                alignItems: "center",
                borderRadius: 10,
                marginRight: widths * 0.09,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Pretendard-Bold",
                }}
              >
                EVENT
              </Text>
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/images%2Fbanner1.jpg?alt=media&token=518eff02-97a6-41a2-98aa-0235c0565b78",
                }}
                style={{
                  marginTop: 15,
                  width: widths * 0.4,
                  height: widths * 0.4,
                  borderRadius: 10,
                }}
              />
            </LinearGradient>

            <LinearGradient
              colors={["#52aa5e", "#a5be00"]}
              style={{
                height: widths * 0.55,
                backgroundColor: "#6a994e",
                justifyContent: "flex-end",
                borderRadius: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "Pretendard-Bold",
                }}
              >
                EVENT
              </Text>
              <Image
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/images%2Fbanner2.jpg?alt=media&token=2098325b-7bba-45d5-8152-25de9ffe3a93",
                }}
                style={{
                  marginTop: 15,
                  width: widths * 0.4,
                  height: widths * 0.4,
                  borderRadius: 10,
                }}
              />
            </LinearGradient>
          </ScrollView>
        </View>
      </View>

      <LinearGradient
        colors={["#52aa5e", "#a5be00"]}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#6a994e",
          paddingLeft: widths * 0.03,
          paddingRight: widths * 0.03,
          borderRadius: widths * 0.05,
          paddingTop: widths * 0.01,
          paddingBottom: widths * 0.01,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push("PostDesc");
          }}
        >
          <LinearGradient
            colors={["#52aa5e", "#a5be00"]}
            style={{
              width: widths * 0.25,
              height: widths * 0.25,
              backgroundColor: "#a7c957",
              borderRadius: widths,
              alignItems: "center",

              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={pencil}
                style={{
                  width: widths * 0.06,
                  height: widths * 0.06,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Pretendard-Bold",
                }}
              >
                글 작성
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("Diary");
          }}
        >
          <LinearGradient
            colors={["#52aa5e", "#a5be00"]}
            style={{
              width: widths * 0.25,
              height: widths * 0.25,
              backgroundColor: "#a7c957",
              borderRadius: widths,
              alignItems: "center",

              borderColor: "#ddd",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={diary}
                style={{
                  width: widths * 0.06,
                  height: widths * 0.06,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Pretendard-Bold",
                }}
              >
                다이어리
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("History");
          }}
        >
          <LinearGradient
            colors={["#52aa5e", "#a5be00"]}
            style={{
              width: widths * 0.25,
              height: widths * 0.25,
              backgroundColor: "#a7c957",
              borderRadius: widths,
              alignItems: "center",

              borderColor: "#ddd",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={cons}
                style={{
                  width: widths * 0.06,
                  height: widths * 0.06,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Pretendard-Bold",
                }}
              >
                상담내역
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: widths,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          padding: widths * 0.04,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: heights * 0.03,
          borderWidth: 2,
          borderBottomWidth: 0,
          borderColor: "#eee",
          position: "absolute",
          height: heights,
          top: 0,
          left: 0,
          transform: [
            {
              translateY: fadeAnim,
            },
          ],
        }}
      >
        <View
          style={{
            width: widths * 0.25,
            height: 7,
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: widths,
          }}
        ></View>

        <View
          style={{
            width: widths * 0.9,
            height: 2,
            backgroundColor: "#eee",
            marginTop: heights * 0.02,
            marginBottom: heights * 0.02,
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            alignItems: "center",
            width: widths,
            height: heights,
            marginLeft: widths * -0.05,
            marginTop: widths * -0.05,
            padding: widths * 0.04,
          }}
        >
          <ReservationState text={"1교시"} state={1} school={school.current} />
          <ReservationState text={"2교시"} state={2} school={school.current} />
          <ReservationState text={"3교시"} state={3} school={school.current} />
          <ReservationState text={"4교시"} state={4} school={school.current} />
          <ReservationState text={"5교시"} state={5} school={school.current} />
          <ReservationState text={"6교시"} state={6} school={school.current} />
          <ReservationState text={"7교시"} state={7} school={school.current} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Main;
