import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import RNText from "./RNText";
import { blurhash } from "../constants";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { addToLikedList, removeFromLiked } from "../constants/api";
import { AuthContext } from "../context/authcontext";


const ServiceComponent = ({ item, showLike }) => {
  const { id, image, name, price, rating, numReviews, description, liked } =
    item;

  return (
    <Pressable
      style={{
        margin: wp(2),
        width: wp(95),
        flexDirection: "row",
      }}
      onPress={() => {
        router.push({
          pathname: "service",
          params: {
            serviceId: id,
            image,
            name,
            price,
            rating,
            numReviews,
            description,
          },
        });
      }}
    >
      <Image
        style={{
          width: wp(30),
          aspectRatio: 1,
          borderRadius: 20,
          objectFit: "contain",
          marginHorizontal: 5,
        }}
        source={image}
        placeholder={blurhash}
        transition={500}
      />

      <View
        style={{
          marginLeft: 10,
          flex: 1,
          position: "relative",
        }}
      >
        {showLike && (
          <MaterialIcons
            name={"favorite-border"}
            size={28}
            color={Colors.primary}
            style={{
              position: "absolute",
              bottom: 10,
              right: 16,
              zIndex: 3,
            }}
            onPress={handleLiked}
          />
        )}
        <RNText
          style={{
            fontSize: 18,
            marginTop: 4,
          }}
          font={"U-Black"}
          numberOfLines={1}
        >
          {name}
        </RNText>
        <RNText
          style={{
            width: wp(55),
            fontSize: 12.25,
            lineHeight: 17.5,
          }}
          //one line of text
          numberOfLines={1}
          font={"U-Bold"}
        >
          {description}
        </RNText>
        <RNText
          style={{
            marginTop: 5,
            color: Colors.primary,
            fontSize: 21,
            lineHeight: 28,
          }}
          font={"U-Bold"}
        >
          ${price}
        </RNText>
        <RNText
          style={{
            marginTop: 5,
            color: Colors.mediumGray,
          }}
          font={"U-Medium"}
        >
          <FontAwesome name="star" size={16} color={Colors.yellow} /> {rating} |
          ({numReviews} Reviews)
        </RNText>
      </View>
    </Pressable>
  );
};

export default ServiceComponent;
