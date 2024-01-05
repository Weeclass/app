import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const PostDetail = ({ navigation, route }) => {
  const routerData = route.params.data;
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  console.log(routerData);
  return (
    <View
      style={{
        paddingTop: heights * 0.05,
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
      ></View>

      <ScrollView style={{}}>
        <Text
          style={{
            width: widths * 0.9,
            color: "#272727",
            fontSize: widths * 0.06,
            padding: widths * 0.02,
            marginBottom: 10,
          }}
        >
          {routerData.title}
        </Text>

        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#f8fafc",
          }}
        >
          <Text
            style={{
              width: widths * 0.9,
              color: "gray",
              fontSize: widths * 0.04,
              padding: widths * 0.05,
              borderRadius: 10,
            }}
          >
            {routerData.desc}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          width: widths * 0.9,
          backgroundColor: "#6a994e",
          height: widths * 0.15,
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
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

export default PostDetail;
