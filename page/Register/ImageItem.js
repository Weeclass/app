import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useState } from "react";

const ImageItem = ({ img, avatar, onChangeImage }) => {
  const widths = Dimensions.get("screen").width;
  const heights = Dimensions.get("screen").height;

  const image =
    img > 9
      ? `https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/user${img}.jpg?alt=media&token=881821fb-1ea0-4a38-8b25-d79b2c8b98ce`
      : `https://firebasestorage.googleapis.com/v0/b/weeclass-453e3.appspot.com/o/user${img}.png?alt=media&token=881821fb-1ea0-4a38-8b25-d79b2c8b98ce`;

  return (
    <TouchableOpacity
      onPress={() => {
        onChangeImage(image);
      }}
      activeOpacity={0.7}
      style={{
        borderWidth: 5,
        borderRadius: widths,
        borderColor: avatar === image ? "#f2e8cf" : "transparent",
        padding: widths * 0.02,
        marginBottom: heights * 0.01,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: widths * 0.2,
          height: widths * 0.2,
          borderRadius: widths,
        }}
      />
    </TouchableOpacity>
  );
};

export default ImageItem;
