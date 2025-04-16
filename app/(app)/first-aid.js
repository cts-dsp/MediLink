import {
  View,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import {  useGlobalSearchParams, useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import RNText from "../../components/RNText";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { List, useTheme } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";

const FirstAID = () => {
  const { title, image, steps, description,youtubeLink } = useGlobalSearchParams();
  const { colors } = useTheme();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "M-Bold",
      },
    });
  }, [navigation]);

  const allSteps = steps.split(",");

  return (
    <ScrollView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maxHeight: heightPercentageToDP(28),
          position: "relative",
        }}
      >
        <Image source={image} contentFit="cover" style={styles.video} />
      </View>
      <RNText
        style={{
          textAlign: "center",
          fontSize: 24,
          fontFamily: "M-Bold",
          marginVertical: 16,
          color:colors.text
        }}
      >
        First Aid for {title}
      </RNText>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <RNText
          style={{
            margin: 8,
            fontSize: 16,
            fontFamily: "M-Regular",
            padding: 8,
            //line gap
            backgroundColor: colors.card,
            lineHeight: 24,
            borderRadius: 16,
            color: colors.text,
          }}
        >
          {description}
        </RNText>
        <RNText
          style={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: "M-Bold",
            marginTop: 16,
          color:colors.text

          }}
        >
          Steps to follow
        </RNText>

        <List.Section>
          {allSteps.map((step, index) => (
            <List.Item
              key={index}
              title={index + 1 + ". " + step}
              titleNumberOfLines={4}
              titleStyle={{
                fontSize: 18,
                fontFamily: "M-Regular",
                color: colors.text,
              }}
            />
          ))}
        </List.Section>
      </View>
      <View
      style={{
        height: 260,
        width: widthPercentageToDP(90),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
 
      }}
    >
      <View
        style={{
          width: "100%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <YoutubePlayer
          height={"100%"}
          width={"100%"}
          play={false}
          videoId={youtubeLink}
        />
      </View>
    </View>
    </ScrollView>
  );
};

export default FirstAID;
const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});
