import { View, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "../HomeHeader";
import { useTheme } from "react-native-paper";

const ios = Platform.OS === "ios";

const MinimalLayout = ({ children, showHeader }) => {
  const { top } = useSafeAreaInsets();
  const {colors} = useTheme()
  return (
    <View
      style={{
        paddingTop: ios ? top : top,
        flex: 1,
        backgroundColor: colors.background,

      }}
    >
      {showHeader && <HomeHeader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default MinimalLayout;
