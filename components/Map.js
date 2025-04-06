import { View, StyleSheet, FlatList, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mapsStyles } from "../constants/constants";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import RNText from "./RNText";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { ActivityIndicator, useTheme } from "react-native-paper";
import MapHospitalView from "./App/MapHospitalView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
const ios = Platform.OS === "ios";

const Map = () => {
  const { colors } = useTheme();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  //keep asking for location permission until user allows it
//   const requestLocationPermission = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission to access location was denied");
//       return;
//     }
//   };

//   useEffect(() => {
//     const checkLocationPermission = async () => {
//       const { status } = await Location.getForegroundPermissionsAsync();
//       if (status !== "granted") {
//         await requestLocationPermission();
//       }
//     };
//     checkLocationPermission();
//   }
//  , []);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDyPF5v_WDDBiREloE7sPxvQzA7HNv3BOY`;

      const res = await fetch(api);
      const data = await res.json();

      fetchNearbyPlaces(location.coords.latitude, location.coords.longitude);

      setCurrentAddress(data?.results[0].formatted_address);
    })();
  }, []);
  const autoCompleteRef = useRef(null);

  const fetchNearbyPlaces = async (lat, lng) => {
    setIsLoading(true);
    const API_KEY = "AIzaSyDyPF5v_WDDBiREloE7sPxvQzA7HNv3BOY";
    const url = "https://places.googleapis.com/v1/places:searchNearby";

    const requestBody = {
      includedTypes: ["hospital", "pharmacy"], // Change to your required type
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: 5000.0, // Radius in meters
        },
      },
      rankPreference: "POPULARITY",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "*",
          "X-Goog-FieldMask":
            "places.id,places.formattedAddress,places.nationalPhoneNumber,places.location,places.rating,places.googleMapsLinks,places.websiteUri,places.displayName,places.shortFormattedAddress,places.photos,places.currentOpeningHours,places.primaryType,places.userRatingCount",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      setPlaces(data.places || []);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedMarker, setSelectedMarker] = useState("");
  const markerRefs = Array.from({ length: 10 }, () => useRef(null));
  const handleMarkerPress = (index) => {
    setSelectedMarker(index);

    if (!showInfo) {
      setShowInfo(true);
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          scrollToIndex(index);
        }, 100)
      );
    } else {
      scrollToIndex(index);
    }
  };
  const handleInfoClick = (index) => {
    if (
      markerRefs[index] &&
      markerRefs[index].current &&
      markerRefs[index].current.showCallout
    ) {
      setSelectedMarker(index);
      // center map to this marker location
      mapRef.current.animateToRegion({
        latitude: places[index].location.latitude,
        longitude: places[index].location.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.0016,
      });
    }
  };
  const [showInfo, setShowInfo] = useState(false);
  const [timer, setTimer] = useState(null);
  const flatListRef = useRef(null);
  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: ios ? top : top,
        flex: 1,
        backgroundColor: colors.background,
        gap: 12,
        paddingHorizontal: 10,
        paddingBottom: 20,
        flexDirection: "column",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <GooglePlacesAutocomplete
          ref={autoCompleteRef}
          placeholder="Search location"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          fetchDetails={true}
          listEmptyComponent={
            <View style={{ flex: 1 }}>
              <RNText
                font={"Poppins-Medium"}
                style={{
                  textAlign: "center",
                }}
              >
                No results were found
              </RNText>
            </View>
          }
          enablePoweredByContainer={false}
          styles={{
            textInput: {
              paddingHorizontal: 16,
              paddingRight: 30,
              fontFamily: "M-Medium",
              fontSize: 15,
              borderRadius: 5,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderWidth: 1,
              borderColor: colors.mediumGray,
              flex: 1,
            },
            listView: {
              backgroundColor: "white",
              width: widthPercentageToDP(94),
              zIndex: 1000,
            },
          }}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details?.geometry?.location;
              setCurrentAddress(data.description);
              fetchNearbyPlaces(lat, lng);
              setLocation({
                latitude: lat,
                longitude: lng,
              });
            }
          }}
          query={{
            key: "AIzaSyDyPF5v_WDDBiREloE7sPxvQzA7HNv3BOY",
            language: "en",
          }}
        />
        <AntDesign
          name="closecircleo"
          size={20}
          color={colors.black}
          style={{
            position: "absolute",
            right: 8,
            top: 12.5,
            zIndex: 1000,
          }}
          onPress={() => {
            autoCompleteRef.current.clear();
            // setLocationType(null);
          }}
        />
      </View>

      <MapView
        region={{
          latitude: location ? location?.latitude : 37.4219983,
          longitude: location ? location?.longitude : -122.084,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        ref={mapRef}
        // customMapStyle={mapsStyles}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: location ? location?.latitude : 37.4219983,
            longitude: location ? location?.longitude : -122.084,
          }}
          title={"Your Location"}
          description={currentAddress}
          image={"https://cdn-icons-png.flaticon.com/128/8587/8587884.png"}
          tracksViewChanges={false}
        />

        {/* loop through the places */}
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            }}
            title={place.name}
            onPress={() => handleMarkerPress(index)}
            image={
              selectedMarker === index
                ? "https://cdn-icons-png.flaticon.com/128/4002/4002963.png"
                : "https://cdn-icons-png.flaticon.com/128/10714/10714002.png"
            }
            tracksViewChanges={false}
            ref={markerRefs[index]}
          />
        ))}
      </MapView>
      <RNText
        font={"Poppins-Medium"}
        style={{
          color: colors.text,
        }}
        numberOfLines={2}
      >
        <RNText
          font={"M-Bold"}
          style={{
            color: colors.primary,
          }}
        >
          Location:
        </RNText>{" "}
        {currentAddress}
      </RNText>

      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            gap: 20,
          }}
        >
          <RNText
            font={"Poppins-Medium"}
            style={{
              color: colors.text,
              textAlign: "center",
            }}
          >
            Searching for nearby hospitals and pharmacies
          </RNText>

          <ActivityIndicator size={30} color={colors.primary} />
        </View>
      ) : places.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={places}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <MapHospitalView
              place={item}
              index={index}
              handleInfoClick={handleInfoClick}
            />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 250,
            gap: 20,
          }}
        >
          <RNText
            font={"Poppins-Medium"}
            style={{
              color: colors.text,
              textAlign: "center",
            }}
          >
            No hospitals or pharmacies found nearby.
          </RNText>
        </View>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: heightPercentageToDP(40),
  },
});
export const INITIAL_REGION = {
  latitude: 17.490141,
  longitude: 78.349036,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.0008,
};
