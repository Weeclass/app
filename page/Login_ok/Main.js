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
import Ionicons from "@expo/vector-icons/Ionicons";
import { BackgroundImage } from "react-native-elements/dist/config";
import ReservationState from "../reservation/ReservationState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Main = ({ navigation }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;
  const fadeAnim = React.useRef(new Animated.Value(heights)).current;
  let school = useRef("");
  let [reservationState, setReservationState] = useState({});

  const schoolData = async () => {
    school.current = await AsyncStorage.getItem("School");
  };

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
          marginBottom: heights * 0.04,
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
            <View
              style={{
                height: heights * 0.3,
                backgroundColor: "white",
                borderRadius: heights * 0.02,
                flexDirection: "row",
                marginRight: widths * 0.1,
                overflow: "hidden",
              }}
            >
              <Image
                source={banner}
                style={{
                  width: heights * 0.21,
                  height: heights * 0.3,
                }}
              />

              <View
                style={{
                  width: heights * 0.21,
                  height: heights * 0.3,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: auth.currentUser.photoURL }}
                  style={{
                    width: widths * 0.17,
                    height: widths * 0.17,
                    backgroundColor: "#eee",
                    borderRadius: widths,
                  }}
                />

                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: widths * 0.04,
                    marginTop: heights * 0.02,
                    marginBottom: heights * 0.02,
                  }}
                >
                  이규빈 선생님
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    alert("상세보기");
                  }}
                  style={{
                    backgroundColor: "#6A994E",
                    borderRadius: widths,
                    padding: widths * 0.035,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: widths * 0.035,
                      fontFamily: "Pretendard-Bold",
                    }}
                  >
                    상세보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: heights * 0.3,
                backgroundColor: "white",
                borderRadius: heights * 0.005,
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              <Image
                source={banner}
                style={{
                  width: heights * 0.21,
                  height: heights * 0.3,
                }}
              />

              <View
                style={{
                  width: heights * 0.21,
                  height: heights * 0.3,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: auth.currentUser.photoURL }}
                  style={{
                    width: widths * 0.17,
                    height: widths * 0.17,
                    backgroundColor: "#eee",
                    borderRadius: widths,
                  }}
                />

                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: widths * 0.04,
                    marginTop: heights * 0.02,
                    marginBottom: heights * 0.02,
                  }}
                >
                  이규빈 선생님
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    alert("상세보기");
                  }}
                  style={{
                    backgroundColor: "#6A994E",
                    borderRadius: widths,
                    padding: widths * 0.035,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: widths * 0.035,
                      fontFamily: "Pretendard-Bold",
                    }}
                  >
                    상세보기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.push("PostDesc");
        }}
        style={{
          width: "auto",
          height: "auto",
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#6a994e",
          borderRadius: widths,
          position: "absolute",
          right: widths * 0.05,
          bottom: widths * 0.05,
          shadowColor: "gray",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,
          flexDirection: "row",
          padding: widths * 0.05,
        }}
      >
        <Text
          style={{
            fontSize: widths * 0.045,
            fontFamily: "Pretendard-Regular",
            color: "white",
          }}
        >
          작성하기
        </Text>
      </TouchableOpacity>
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
