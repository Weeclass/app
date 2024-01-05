import { useRef, useState, useEffect } from "react";
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
const HistoryDetail = ({ navigation, route }) => {
  const routerData = route.params.data;
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const countries = [
    "이소라",
    "이상원",
    "김진경",
    "강상희",
    "김진경",
    "강상희",
    "김진경",
    "강상희",
    "김진경",
    "강상희",
    "김진경",
    "강상희",
  ];

  const [base64Icon, Setbase64Icon] = useState("");
  const [teacherName, SetTeacherName] = useState("");

  const ref = useRef();

  const onClear = () => {
    ref.current.clearSignature();
  };

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    Setbase64Icon(signature);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    // console.log(data + "\n\n");
  };

  return (
    <View
      style={{
        paddingTop: heights * 0.07,
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
      >
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: widths * 0.09,
          }}
        >
          {routerData.class}
        </Text>
      </View>

      <View style={{}}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f8fafc",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#f1f1f1",
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
            borderRadius: 10,
            backgroundColor: "#f8fafc",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            borderWidth: 1,
            borderColor: "#f1f1f1",
            padding: widths * 0.05,
          }}
        >
          <Text
            style={{
              fontSize: widths * 0.05,
              borderRadius: 10,
              fontFamily: "Pretendard-Bold",
              color: "gray",
            }}
          >
            상태
          </Text>

          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              fontSize: widths * 0.04,
              color:
                routerData.state == 0
                  ? "gray"
                  : routerData.state == 1
                  ? "yellowgreen"
                  : routerData.state == 2
                  ? "coral"
                  : "black",
            }}
          >
            {routerData.state == 0
              ? "확인중"
              : routerData.state == 1
              ? "수락됨"
              : routerData.state == 2
              ? "거부됨"
              : "확인완료"}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 40,
          display:
            routerData.state == 2 || routerData.state == 0 ? "none" : "flex",
        }}
      >
        {routerData.sign == "" ? (
          <View>
            <SelectDropdown
              buttonStyle={{
                width: "100%",
                marginTop: 15,
                backgroundColor: "#272727",
                borderRadius: 10,
                borderColor: "#f1f1f1",
                borderWidth: 1,
              }}
              defaultButtonText={"담당 선생님"}
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
            <View
              style={{
                width: "auto",
                height: 200,
                marginTop: 20,
                marginBottom: heights * 0.02,
                borderRadius: 5,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                // onEmpty={handleEmpty}
                // onClear={onClear}
                onGetData={handleData}
                // autoClear={true}
              />
            </View>
            <Button title="다시쓰기" onPress={onClear} />

            <TouchableOpacity
              style={{
                width: widths * 0.9,
                backgroundColor: "#6a994e",
                height: widths * 0.15,
                opacity: 0.7,
                borderRadius: 3,
                alignItems: "center",
                marginTop: heights * 0.02,
                justifyContent: "center",
              }}
              onPress={async () => {
                if (base64Icon == "") {
                  alert("싸인을 하셔야 저장이 가능합니다.");
                } else {
                  // routerData
                  await updateDoc(doc(db, "Reservation", routerData.id), {
                    // teacherName
                    sign: base64Icon,
                    teacherName: teacherName,
                    state: 3,
                  });
                  setTimeout(() => {
                    alert("저장이 완료되었습니다.");
                    navigation.pop();
                  }, 100);
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Pretendard-Bold",
                  fontSize: widths * 0.05,
                }}
              >
                저장하기
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Pretendard-Bold",
                color: "#333",
              }}
            >
              {routerData.teacherName} 선생님
            </Text>
            <View
              style={{
                width: "auto",
                height: 200,
                marginTop: 20,
                marginBottom: heights * 0.02,
                borderRadius: 5,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            >
              <Image
                style={{
                  width: "auto",
                  height: 200,
                }}
                source={{ uri: routerData.sign }}
              />
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          width: widths * 0.9,
          backgroundColor: "#6a994e",
          height: widths * 0.15,
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
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
          나가기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryDetail;
