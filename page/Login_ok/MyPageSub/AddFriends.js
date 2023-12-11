import { Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddFriends = ({ text, data, navigation, type }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("FriendUserList", { data: data, type: type });
      }}
      style={{}}
    >
      <View
        style={{
          width: widths * 0.9,
          padding: widths * 0.04,
          paddingRight: widths * 0.06,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={
              text == "팔로우"
                ? "people-circle-outline"
                : text == "팔로워"
                ? "people-outline"
                : "person-add-outline"
            }
            style={{ color: "#272727", marginRight: widths * 0.04 }}
            size={widths * 0.07}
          />
          <Text
            style={{
              color: "#272727",
              fontSize: widths * 0.045,
              fontFamily: "Pretendard-Regular",
            }}
          >
            {text}
          </Text>
        </View>

        <Text
          style={{
            color: "#272727",
            fontSize: widths * 0.05,
            fontFamily: "Pretendard-Bold",
          }}
        >
          {data.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddFriends;
