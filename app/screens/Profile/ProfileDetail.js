import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";

import DropShadow from "react-native-drop-shadow";

import {
  Modal,
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle,
  Animation,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
} from "react-native-modals";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
  Header,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

//context
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ProfileDetail = () => {
  //states
  const [profileImgPath, setProfileImgPath] = React.useState(null);
  const [profileImgModalState, setProfileImgModalState] = React.useState(false); //track the state of the modal

  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();

  React.useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(
        "http://192.168.0.150:4000/api/studentData/1",
        {
          headers: {
            Authorization: `Bearer ${studentUser.token}`,
          },
        }
      ); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatch({ type: "SET_STUDENT", payload: json });
      }
    };

    fetchStudentData();
  }, [dispatch, studentData]); //only fires once when the Student page first renders

  const ChangeProfileImageBTSPressed = () => {
    console.log("Change profile Image BTS pressed");

    //close the modal
    setProfileImgModalState(false);

    //open the image picker
    pickProfileImage();
  };

  const RemoveProfileImageBTSPressed = () => {
    console.log("remove profile Image BTS pressed");

    //close the modal
    setProfileImgModalState(false);

    setProfileImgPath(null);
  };

  const pickProfileImage = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You've refused to allow this app to access your photos!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    //update image states
    if (!result.canceled) {
      setProfileImgPath(result.assets[0].uri);
    }
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              marginBottom: 15,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              //open the bottom sheet modal
              setProfileImgModalState(true);
            }}
          >
            <Image
              source={profileImgPath ? { uri: profileImgPath } : profilepic}
              style={{
                height: 100,
                width: 100,
                borderRadius: 1000,
                marginRight: 5,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 185,
              }}
            >
              <Image
                source={icons.camera}
                style={{ height: 23, width: 23 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Profile Information Section */}

          {/* name */}
          {studentData && (
            <View style={{ backgroundColor: COLORS.white }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Name
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.name}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* username */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Username
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.username}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* Email */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Email
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.email}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* Phone Number */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Phone Number
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.phoneNumber}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* Gender */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Gender
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.gender}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* Birthday */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Birthday
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.birthday}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>

              {/* School */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  School
                </Text>

                <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
                  {studentData.school}
                </Text>
              </View>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                }}
              ></View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* bottom modal */}
      <BottomModal
        visible={profileImgModalState}
        onTouchOutside={() => {
          setProfileImgModalState(false);
        }}
        onSwipeOut={() => {
          setProfileImgModalState(false);
        }}
        height={0.127}
      >
        <ModalContent
          style={{
            marginHorizontal: -20,
            marginVertical: -24,
          }}
        >
          {/* change image bottom sheet option */}
          <TouchableOpacity onPress={ChangeProfileImageBTSPressed}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Change Profile Image
              </Text>
            </View>
          </TouchableOpacity>

          {/* divider */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: COLORS.lightgray3,
            }}
          ></View>

          {/* delete image bottom sheet option */}
          <TouchableOpacity onPress={RemoveProfileImageBTSPressed}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Remove Profile Image
              </Text>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 15,
    width: SIZES.width,
    height: SIZES.height,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default ProfileDetail;
