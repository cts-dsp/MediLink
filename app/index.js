import { View } from "react-native";
import { Image } from "expo-image";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Banner from "../assets/app/banner.jpeg";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b3d5df",
      }}
    >
      <Image
        source={Banner}
        style={{ width: widthPercentageToDP(70), aspectRatio: 1 }}
      />
    </View>
  );
}
