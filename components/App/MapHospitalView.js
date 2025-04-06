import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import RNText from "../RNText";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Divider, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { AuthContext } from "../../context/authcontext";

const MapHospitalView = ({ place, index, handleInfoClick }) => {
  const { colors } = useTheme();

  const {
    rating,
    nationalPhoneNumber,
    id,
    primaryType,
    currentOpeningHours,
    userRatingCount,
  } = place;

  const { addToFavourites, removeFromFavourites, favourites } =
    useContext(AuthContext);
  const isSaved = favourites.find((x) => x.id === id);

  const [saved, setSaved] = React.useState(isSaved);

  const theRating = rating ? rating : 0;
  const thePhoneNumber = nationalPhoneNumber ? nationalPhoneNumber : "N/A";

  const photoName =
    place.photos && place.photos.length > 0 ? place.photos[0].name : null;
  const isOpen = currentOpeningHours?.openNow ? "Open Now" : "Closed Now";
  const isOpenColor = currentOpeningHours?.openNow ? colors.green : colors.red;
  const imageUrl = photoName
    ? `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=400&key=${"AIzaSyDyPF5v_WDDBiREloE7sPxvQzA7HNv3BOY"}`
    : "https://www.hospertz.com/wp-content/uploads/2024/06/hospital-building-001-global.webp"; // Fallback Ima

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        marginRight: 10,
        borderRadius: 10,
        width: widthPercentageToDP(84),
        gap: 10,
        padding: 10,
      }}
      onPress={() => {
        handleInfoClick(index);
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <Image
          source={imageUrl}
          style={{
            height: 100,
            aspectRatio: 1,
            borderRadius: 20,
          }}
          contentFit="cover"
        />

        <View style={{}}>
          <RNText
            style={{
              fontSize: 14,
              color: colors.text,

              textTransform: "capitalize",
            }}
            font={"M-Bold"}
          >
            {primaryType}
          </RNText>
          <RNText style={{ fontSize: 14, color: isOpenColor }} font={"M-Bold"}>
            {isOpen}
          </RNText>

          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <AntDesign name="star" size={16} color={colors.yellow} />
            <RNText
              style={{ fontSize: 14, color: colors.text }}
              font={"M-Medium"}
            >
              {theRating} {userRatingCount ? `(${userRatingCount})` : ""}
            </RNText>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <AntDesign name="phone" size={16} color={colors.green} />
            <RNText
              style={{ fontSize: 14, color: colors.text }}
              font={"M-Medium"}
            >
              {thePhoneNumber}
            </RNText>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <RNText
          style={{
            fontSize: 16,
            color: colors.text,
          }}
          font={"M-SemiBold"}
          numberOfLines={3}
        >
          {place?.displayName?.text}
        </RNText>
        <RNText
          style={{
            fontSize: 14,
            color: colors.blue,
          }}
          font={"M-Medium"}
          numberOfLines={2}
        >
          {place?.shortFormattedAddress}
        </RNText>
      </View>

      <Ionicons
        name={saved ? "bookmark" : "bookmark-outline"} // Use the same icon for both states
        size={24}
        color="black"
        style={{
          position: "absolute",
          right: 15,
          top: 10,
          color: colors.text,
        }}
        onPress={() => {
          if (saved) {
            removeFromFavourites(id);
            setSaved(false);
          } else {
            addToFavourites({
              id,
              primaryType,
              userRatingCount,
              rating: theRating,
              nationalPhoneNumber: thePhoneNumber,
              displayName: place?.displayName?.text,
              shortFormattedAddress: place?.shortFormattedAddress,
              photoUrl: imageUrl,
              isOpen,
            });
            setSaved(true);
          }
        }}
      />
    </TouchableOpacity>
  );
};

export default MapHospitalView;
