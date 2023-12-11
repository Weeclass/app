import React, { useCallback, useState, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import Ionicons from "@expo/vector-icons/Ionicons";

const widths = Dimensions.get("screen").width;
const heights = Dimensions.get("screen").height;

const renderSend = (props) => {
  return (
    <Send {...props}>
      <Ionicons
        name="navigate-circle-outline"
        style={{
          fontSize: 40,
          color: "#555",
        }}
      />
    </Send>
  );
};

const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#f8fafc",
        },
        right: {
          backgroundColor: "#a7c957",
        },
      }}
    />
  );
};

const Chat = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const opponent = route.params.opponent;
  const opname = route.params.name;
  const opimg = route.params.img;
  const giftedChatRef = useRef(null);

  const hideKeyboard = () => {
    if (giftedChatRef.current) {
      giftedChatRef.current.blur();
    }
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("opponent", "in", [
        auth.currentUser.email + opponent,
        opponent + auth.currentUser.email,
      ]),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSend = useCallback((messages) => {
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
      opponent: opponent + auth.currentUser.email,
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        style={{
          width: widths,
          paddingLeft: widths * 0.01,
          paddingRight: widths * 0.01,
          paddingBottom:
            Platform.OS == "ios" ? heights * 0.04 : heights * 0.015,
          backgroundColor: "white",
        }}
        flex={1}
      >
        <View
          style={{
            width: widths,
            marginLeft: widths * -0.01,
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
            padding: widths * 0.05,
            paddingBottom: widths * 0.04,
            borderBottomWidth: 1,
            borderColor: "#eee",
            height: Platform.OS == "ios" ? heights * 0.15 : heights * 0.12,
            marginBottom: heights * 0.02,
            backgroundColor: "#6a994e",
          }}
        >
          <Ionicons
            name="chevron-back"
            onPress={() => {
              navigation.pop();
            }}
            size={widths * 0.12}
            style={{
              color: "#fff",
              marginBottom: heights * 0.01,
            }}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: widths * 0.07,
                fontWeight: "bold",
                marginRight: widths * 0.03,
              }}
            >
              {opname}
            </Text>

            <Image
              source={{ uri: opimg }}
              style={{
                width: widths * 0.15,
                height: widths * 0.15,
                borderRadius: widths,
              }}
            />
          </View>
        </View>
        <TouchableWithoutFeedback>
          <GiftedChat
            ref={giftedChatRef}
            placeholder="메세지를 입력하세요."
            textStyle={{ color: "#555" }}
            showUserAvatar={true}
            messages={messages ? messages : []}
            showAvatarForEveryMessage={true}
            alignTop={true}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: auth?.currentUser?.email,
              name: auth?.currentUser?.displayName,
              avatar: auth?.currentUser?.photoURL,
            }}
            renderBubble={(props) => (
              <CustomBubble {...props} user={auth?.currentUser} />
            )}
            renderSend={renderSend}
            renderInputToolbar={(props) => (
              <InputToolbar
                {...props}
                containerStyle={{
                  backgroundColor: "#f8fafc",
                  borderRadius: widths,
                  color: "black",
                }}
              />
            )}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Chat;
