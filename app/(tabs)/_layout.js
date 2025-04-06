import {
  Entypo,
  Feather,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
            paddingTop: 1,
          },
          tabBarActiveTintColor: colors.primary,
          // tabBarInactiveBackgroundColor: colors.primary,
          tabBarActiveBackgroundColor: colors.background,
          headerStyle: {
            backgroundColor: colors.text,
          },
          tabBarItemStyle: {
            color: colors.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 8,
          },
          tabBarActiveTintColor: colors.green,
          // tabBarInactiveTintColor: colors.text,

          //give me some padding to the top
          
          
        }}

        // screenOptionss={{
        //   tabBarStyle: { backgroundColor: colors.background },
        //   tabBarActiveTintColor: "black", // ✅ Ensure active tab color is black
        //   tabBarInactiveTintColor: "gray", // ✅ Add inactive tab color for better contrast
        //   headerStyle: {
        //     backgroundColor: colors.background,
        //   },
        //   tabBarItemStyle: {
        //     color: "black", // ✅ Ensure active tab text color is black
        //   },
        //   tabBarLabelStyle: {
        //     fontFamily: "M-ExtraBold",
        //     fontSize: 8,
        //   },
        // }}
      >
        <Tabs.Screen
          name="symptoms"
          options={{
            title: "Symptoms",
            headerTitle: "AI Symptoms Checker",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",

            headerTintColor: colors.text,
            headerTitleStyle: {
              fontFamily: "M-Bold",
              fontSize: 26,
              alignSelf: "center",
              backgroundColor: colors.background,
            },
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="sparkles" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="firstaid"
          options={{
            title: "First Aid",
            headerTitle: "First Aid",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",

            headerTintColor: colors.text,
            headerTitleStyle: {
              fontFamily: "M-Bold",
              fontSize: 26,
              alignSelf: "center",
              backgroundColor: colors.background,
            },
            tabBarIcon: ({ size, color }) => (
              <Fontisto name="first-aid-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: "Home",
            headerShown: false,

            title: "Home",
            headerTitleStyle: {
              fontFamily: "M-ExtraBold",
              fontSize: 36,
            },

            tabBarIcon: ({ size, color }) => (
              <Entypo name="home" size={size + 4} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            headerTitle: "Health",
            title: "Health",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",

            headerTintColor: colors.text,
            headerTitleStyle: {
              fontFamily: "M-Bold",
              fontSize: 26,
              alignSelf: "center",
              backgroundColor: colors.background,
            },

            tabBarIcon: ({ size, color }) => (
              <Fontisto name="heartbeat" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            headerShown: false,
            headerTitle: "Resource Locator",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleAlign: "center",

            headerTintColor: colors.text,
            headerTitleStyle: {
              fontFamily: "M-Bold",
              fontSize: 26,
              alignSelf: "center",
              backgroundColor: colors.background,
            },

            tabBarIcon: ({ size, color }) => (
              <FontAwesome6 name="hospital" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
