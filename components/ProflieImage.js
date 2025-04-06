import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Share,
  StatusBar,
  StyleSheet,
  View,
  LogBox,
  Platform,
  Pressable,
} from "react-native";
import { v4 as uuid } from "uuid";

import { storage } from "../firebase";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { saveProfileUrl } from "../constants/api";
import RNText from "./RNText";
// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example

export default class ProfileImage extends React.Component {
  //fetch userId from props

  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* {this._maybeRenderImage()} */}
        {this._maybeRenderUploadingOverlay()}

        {this.state.uploading === false ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Pressable
              onPress={this._pickImage}
              style={{
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Image
                style={{
                  width: wp(40),
                  aspectRatio: 1,
                  borderRadius: 4,
                }}
                source={
                  "https://cdn3d.iconscout.com/3d/premium/thumb/gallery-3d-icon-download-in-png-blend-fbx-gltf-file-formats--picture-art-image-user-interface-pack-icons-8511782.png?f=webp"
                }
                placeholder={blurhash}
                transition={100}
              />
              <RNText
                font={"M-Medium"}
                style={{
                  fontSize: hp(2.2),
                  color: "#fff",
                  textAlign: "center",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                Choose from Gallery
              </RNText>
            </Pressable>
            <Pressable
              onPress={this._takePhoto}
              style={{
                borderRadius: 5,
              }}
            >
              <Image
                style={{
                  width: wp(40),
                  aspectRatio: 1,
                  borderRadius: 4,
                }}
                source={
                  "https://cdn3d.iconscout.com/3d/premium/thumb/camera-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--dslr-digital-photography-video-photo-travel-and-holidays-pack-illustrations-3728254.png?f=webp"
                }
                placeholder={blurhash}
                transition={100}
              />
              <RNText
                font={"M-Medium"}
                style={{
                  fontSize: hp(2.2),
                  color: "#fff",
                  textAlign: "center",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                Take a Photo
              </RNText>
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            height: hp(30),
            width: wp(80),
          }}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 10,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              height: hp(35),
              aspectRatio: 1,
              borderRadius: 4,
              backgroundColor: "#0553",
            }}
            source={{ uri: image }}
            placeholder={blurhash}
            transition={100}
          />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(
          pickerResult.assets[0].uri,
          this.props.id
        );
        this.setState({ image: uploadUrl });
        const response = await saveProfileUrl(this.props.id, uploadUrl);
        if (response) {
          this.props.upateProfile(uploadUrl);
        }
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri, id) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `images/${id}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
