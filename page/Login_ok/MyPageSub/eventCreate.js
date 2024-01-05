import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const firebaseApp = app;
const storage = getStorage(firebaseApp);

export default function EventCreatec({ navigation }) {
  const [image, setImage] = useState(null);
  let uri_img = useRef("");

  const countries = ["첫번째 이벤트", "두번째 이벤트"];

  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const [teacherName, SetTeacherName] = useState("첫번째 이벤트");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      uri_img = result.assets[0].uri;
      console.log(uri_img);
    }
  };

  const uploadImage = async (imageUri, imageName) => {
    // imageUri = Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;
    const response = await fetch(imageUri);
    const blob = await response.blob();
    if (teacherName == "첫번째 이벤트") {
      imageName = "banner1.jpg";
    } else {
      imageName = "banner2.jpg";
    }

    const storageRef = ref(storage, `images/${imageName}`);

    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);

      // const docRef = await addDoc(collection(db, "event"), {
      //   title: "1234",
      //   fileName: "zzzz.jpg",
      // });

      alert("업로드 완료");
      navigation.pop();

      // 여기에서 downloadURL을 사용하여 Firestore에 저장하거나 다른 작업 수행
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpload = () => {
    if (image) {
      uploadImage(image, "example.jpg");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: widths * 0.1,
        paddingTop: 70,
        backgroundColor: "white", // 초록색 배경
      }}
    >
      {/* <Text
        style={{
          fontSize: widths * 0.06,
          fontFamily: "Pretendard-Bold",
          marginBottom: 5,
          fontSize: 25,
        }}
      >
        제목
      </Text> */}
      {/* 제목 입력창 */}
      {/* <TextInput
        placeholder="제목을 입력하세요"
        value={""}
        onChangeText={(text) => setTitle(text)}
        style={{
          height: 50,
          borderColor: "#81c147",
          borderBottomWidth: 2,
          marginBottom: 20,
          fontSize: 17,
          width: "100%",
          fontFamily: "Pretendard-Regular",
        }}
      /> */}
      {/* 이미지 표시 또는 이미지 가져오기 버튼 */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: widths * 0.8,
            height: widths * 0.8,
            borderRadius: 5,
            marginBottom: 30,
          }}
        />
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <LinearGradient
            colors={["#93c663", "#6e8f70"]} // 그라데이션 색상 배열
            style={{
              width: widths * 0.8,
              height: widths * 0.8,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
              opacity: 0.6,
            }}
          >
            <Text
              style={{
                fontSize: widths * 0.05,
                fontFamily: "Pretendard-Bold",
                marginBottom: 10,
                color: "white",
              }}
            >
              이미지 가져오기
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <SelectDropdown
        buttonStyle={{
          width: "100%",
          marginTop: 15,
          backgroundColor: "#272727",
          borderRadius: 10,
          borderColor: "#f1f1f1",
          borderWidth: 1,
        }}
        defaultButtonText={"이벤트 이미지 순서"}
        buttonTextStyle={{
          color: "white",
          fontFamily: "Pretendard-Bold",
        }}
        selectedRowStyle={{
          backgroundColor: "#333",
        }}
        selectedRowTextStyle={{
          color: "white",
        }}
        rowStyle={{
          backgroundColor: "#ddd",
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#fff"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        data={countries}
        onSelect={(selectedItem, index) => {
          SetTeacherName(selectedItem);
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />

      {/* 업로드 버튼 */}
      <View
        style={{
          flexDirection: "row",
          width: widths * 0.8,
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Button title="업로드" onPress={handleUpload} color={"#6a994e"} />
        <Button
          color={"#6a994e"}
          title="뒤로가기"
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
      {/* 버튼 텍스트 흰색으로 */}
    </View>
  );
}
