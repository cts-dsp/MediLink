import React, { useMemo } from "react";
import MinimalLayout from "../../components/Layout/MinimalLayout";
import RNText from "../../components/RNText";
import { List, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  FIRST_AID_LIST,
  POINTS_IMG_URL,
  TASKS,
} from "../../constants/constants";
import { router, Tabs } from "expo-router";

import Colors from "../../constants/Colors";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

const Challenges = () => {
  const { colors } = useTheme();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // const filteredList = FIRST_AID_LIST.filter((action) =>
  //   action.title.toLowerCase().includes(searchPhrase.toLowerCase())
  // );
  // make this optimized by using useMemo or useCallback
  const filteredList = useMemo(
    () =>
      FIRST_AID_LIST.filter((action) =>
        action.title.toLowerCase().includes(searchPhrase.toLowerCase())
      ),
    [searchPhrase]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 10,
      }}
    >
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <List.Section
          style={{
            gap: 10,
          }}
        >
          {filteredList.map((action) => (
            <List.Item
              key={action.title}
              title={action.title}
              style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                router.push({
                  pathname: "first-aid",
                  params: {
                    title: action.title,
                    description: action.description,
                    image: action.image,
                    steps: action.steps,
                  },
                });
              }}
              titleNumberOfLines={2}
              titleStyle={{ fontSize: 20, fontFamily: "M-Bold" }}
              left={() => (
                <Image
                  source={action.image}
                  style={{
                    width: widthPercentageToDP(40),
                    height: widthPercentageToDP(30),
                    borderRadius: 20,
                    // cover the image
                  }}
                  contentFit="contain"
                />
              )}
              // on the right add arrow icon

              right={() => (
                <List.Icon color={colors.text} icon="chevron-right" />
              )}
            />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default Challenges;
