import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";

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

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass1, forgotpass2, forgotpass3, add } = images;

import { useForm, Controller } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import * as MailComposer from "expo-mail-composer";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const FeedbackSubmission = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //states

  const [status, setStatus] = React.useState(null);

  const [imagePaths, setImagePaths] = React.useState({
    1: null,
    2: null,
    3: null,
  });

  const [feedback, setFeedback] = React.useState("");
  const [feedbackCount, setFeedbackCount] = React.useState(0);

  const [btnColor, setBtnColor] = React.useState(COLORS.lightgray4);
  const [btnTextColor, setBtnTextColor] = React.useState(COLORS.gray);

  const [imageModalState1, setImageModalState1] = React.useState(false); //track the state of the modal
  const [imageModalState2, setImageModalState2] = React.useState(false); //track the state of the modal
  const [imageModalState3, setImageModalState3] = React.useState(false); //track the state of the modal

  //supporting functions

  const onSubmitPressed = () => {
    //check if textinput is empty
    if (feedback.length == 0) {
      console.log("error, cant submit as textinput is empty");
    } else {
      // EMAIL PART !!!
      sendEmail(feedback, imagePaths);

      //send data
      //console.log("sent data", feedback, imagePaths); //data is inside feedback use state var
    }
  };

  const sendEmail = async (feedback, imagePaths) => {
    var options = {};

    const URIs = new Array(imagePaths[1], imagePaths[2], imagePaths[3]);
    //check how many images
    const imgCount = URIs.filter(function (img) {
      return img != null;
    });

    if (imgCount.length < 1) {
      options = {
        subject: "Feedback and Suggestions",
        recipients: ["huiyingkhoo14018@gmail.com"],
        body: feedback,
      };
    } else {
      options = {
        subject: "Feedback and Suggestions",
        recipients: ["huiyingkhoo14018@gmail.com"],
        body: feedback,
        attachments: imgCount,
      };
    }

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });

    promise.then(
      (result) => {
        setStatus("Status: email success " + result.status);
        console.log(status);

        //toast message
        ToastAndroid.showWithGravity(
          "Email sent!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        //clear form
        setFeedback("");
        setImagePaths({ 1: null, 2: null, 3: null });
        //update others
        setFeedbackCount(0);
        setBtnColor(COLORS.lightgray4);
        setBtnTextColor(COLORS.gray);
      },
      (error) => {
        setStatus("Status: email failed " + error.status);
        console.log(status);
      }
    );
  };

  const uploadimg1 = () => {
    console.log("upload image 1 pressed");

    //if the uri is null, then
    if (!imagePaths[1]) {
      pickImage1();
    } else {
      //if already have image
      setImageModalState1(true);
    }
  };

  const uploadimg2 = () => {
    console.log("upload image 2 pressed");

    //if the uri is null, then
    if (!imagePaths[2]) {
      pickImage2();
    } else {
      //if already have image
      setImageModalState2(true);
    }
  };

  const uploadimg3 = () => {
    console.log("upload image 3 pressed");

    //if the uri is null, then
    if (!imagePaths[3]) {
      pickImage3();
    } else {
      //if already have image
      setImageModalState3(true);
    }
  };

  const ChangeImageBTSPressed1 = () => {
    console.log("Change Image 1 BTS pressed");

    setImageModalState1(false);

    //open the image picker
    pickImage1();
  };

  const DeleteImageBTSPressed1 = () => {
    console.log("Delete Image 1 BTS pressed");

    setImageModalState1(false);

    //first image == null, but second image got stuff, second image section will get hidden
    //uri 1 = uri 2
    //uri 2 = uri 3
    //uri 3 = null

    setImagePaths({ 1: imagePaths[2], 2: imagePaths[3], 3: null });
  };

  const ChangeImageBTSPressed2 = () => {
    console.log("Change Image 2 BTS pressed");

    setImageModalState2(false);

    //open the image picker
    pickImage2();
  };
  const DeleteImageBTSPressed2 = () => {
    console.log("Delete Image 2 BTS pressed");

    setImageModalState2(false);

    //second image == null , but second image got stuff, second image section will get hidden
    //uri 1 = uri 1
    //uri 2 = uri 3
    //uri 3 = null

    setImagePaths({ ...imagePaths, 2: imagePaths[3], 3: null });
  };

  const ChangeImageBTSPressed3 = () => {
    console.log("Change Image 3 BTS pressed");

    setImageModalState3(false);

    //open the image picker
    pickImage3();
  };
  const DeleteImageBTSPressed3 = () => {
    console.log("Delete Image 3 BTS pressed");

    setImageModalState3(false);

    //second image == null , but second image got stuff, second image section will get hidden
    //uri 1 = uri 1
    //uri 2 = uri 2
    //uri 3 = null

    setImagePaths({ ...imagePaths, 3: null });
  };

  const pickImage1 = async () => {
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
      quality: 1,
    });

    console.log(result.assets[0].uri);

    //update image states
    if (!result.canceled) {
      setImagePaths({ ...imagePaths, 1: result.assets[0].uri });
    }
  };

  const pickImage2 = async () => {
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
      quality: 1,
    });

    console.log(result.assets[0].uri);

    //update image states
    if (!result.canceled) {
      setImagePaths({ ...imagePaths, 2: result.assets[0].uri });
    }
  };

  const pickImage3 = async () => {
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
      quality: 1,
    });

    console.log(result.assets[0].uri);

    //upload image states
    if (!result.canceled) {
      setImagePaths({ ...imagePaths, 3: result.assets[0].uri });
    }
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />
      <Header backgroundColor={COLORS.white} />
      <View style={styles.container}>
        {/* text input area */}
        <View
          style={{
            flexDirection: "column",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 20,
          }}
        >
          {/* header (title & word count) */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                ...FONTS.body5,
                fontWeight: "bold",
                color: COLORS.darkgray,
                marginLeft: 10,
              }}
            >
              Feedback & Suggestions{" "}
              <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.darkgray,
                marginRight: 10,
              }}
            >
              {feedbackCount}/300
            </Text>
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              height: 200,
            }}
          >
            <TextInput
              multiline={true}
              maxLength={300}
              value={feedback}
              scrollEnabled={false}
              onChangeText={(text) => {
                setFeedback(text);

                console.log(text);

                //update feedback count
                setFeedbackCount(text.length);

                //check if length is > 0
                if (text.length > 0) {
                  setBtnColor(COLORS.Gbuttonbackground1_positiveback);
                  setBtnTextColor(COLORS.Gbuttonbackground1_positivefore);
                } else {
                  setBtnColor(COLORS.lightgray4);
                  setBtnTextColor(COLORS.gray);
                }
              }}
              style={{
                ...FONTS.body5,
                color: COLORS.black,
                paddingTop: 12,
                paddingLeft: 12,
                paddingRight: 20,
                height: "100%",
                textAlignVertical: "top",
              }}
              placeholder="Please write your feedback and suggestions here, thank you for your support ~ (required)"
            />
          </View>
        </View>

        {/* image uploading area & submit button*/}
        <View
          style={{
            flexDirection: "column",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              ...FONTS.body5,
              fontWeight: "bold",
              color: COLORS.darkgray,
              marginLeft: 10,
              marginBottom: 5,
            }}
          >
            Picture (optional, provide a screenshot of the problem)
          </Text>
          {/* image uploading white part */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: COLORS.white,
              padding: 15,
              borderRadius: 10,
            }}
          >
            {/* image uploading + upload part*/}
            {/* img 1 */}
            <TouchableOpacity
              activeOpacity={1}
              style={{
                height: 75,
                width: 75,
                borderRadius: 5,
                marginRight: 20,
                backgroundColor: COLORS.gray,
              }}
              onPress={uploadimg1}
            >
              <Image
                source={imagePaths[1] ? { uri: imagePaths[1] } : add}
                resizeMode="cover"
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
              />
            </TouchableOpacity>

            {/* img 2 */}
            {imagePaths[1] && (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 5,
                  marginRight: 20,
                  backgroundColor: COLORS.gray,
                }}
                onPress={uploadimg2}
              >
                <Image
                  source={imagePaths[2] ? { uri: imagePaths[2] } : add}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%", borderRadius: 5 }}
                />
              </TouchableOpacity>
            )}

            {/* img 3 */}
            {imagePaths[2] && (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 5,
                  marginRight: 20,
                  backgroundColor: COLORS.gray,
                }}
                onPress={uploadimg3}
              >
                <Image
                  source={imagePaths[3] ? { uri: imagePaths[3] } : add}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%", borderRadius: 5 }}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* submit button */}
          <CustomButton1
            text="Submit"
            marginTop={35}
            onPress={handleSubmit(onSubmitPressed)}
            backgroundColor={btnColor}
            color={btnTextColor}
          />
        </View>
      </View>

      {/* bottom modals */}
      {/* bottom modal for img1 */}
      <BottomModal
        visible={imageModalState1}
        onTouchOutside={() => {
          setImageModalState1(false);
        }}
        onSwipeOut={() => {
          setImageModalState1(false);
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
          <TouchableOpacity onPress={ChangeImageBTSPressed1}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Change Image
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
          <TouchableOpacity onPress={DeleteImageBTSPressed1}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Delete Image
              </Text>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>

      {/* bottom modal for img2 */}
      <BottomModal
        visible={imageModalState2}
        onTouchOutside={() => {
          setImageModalState2(false);
        }}
        onSwipeOut={() => {
          setImageModalState2(false);
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
          <TouchableOpacity onPress={ChangeImageBTSPressed2}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Change Image
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
          <TouchableOpacity onPress={DeleteImageBTSPressed2}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Delete Image
              </Text>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>

      {/* bottom modal for img3 */}
      <BottomModal
        visible={imageModalState3}
        onTouchOutside={() => {
          setImageModalState3(false);
        }}
        onSwipeOut={() => {
          setImageModalState3(false);
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
          <TouchableOpacity onPress={ChangeImageBTSPressed3}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Change Image
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
          <TouchableOpacity onPress={DeleteImageBTSPressed3}>
            <View
              style={{
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.Gblue }}>
                Delete Image
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
    backgroundColor: COLORS.lightgray2,
    flex: 1,
  },
});

export default FeedbackSubmission;
