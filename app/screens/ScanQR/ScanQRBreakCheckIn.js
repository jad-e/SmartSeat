//short break
//lunch break
//dinner break
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
  ToastAndroid,
} from "react-native";
import React from "react";

import moment from "moment";

import DropShadow from "react-native-drop-shadow";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";
import Torch from "react-native-torch";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

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

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { timelinecardcircle, study, tea, lunch_time } = images;

//context
import { useStudySpaceContext } from "../../hooks/useStudySpaceContext";
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ScanQRBreakCheckIn = ({ navigation, route }) => {
  const { code } = route.params;

  const { studySpace, dispatch } = useStudySpaceContext();
  const { studentData, dispatch: dispatchStudentData } =
    useStudentDataContext();
  const { studentUser } = useStudentAuthContext();

  React.useEffect(() => {
    const fetchStudySpaces = async () => {
      const response = await fetch("http://192.168.0.151:4000/api/studySpace/"); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatch({ type: "SET_STUDYSPACES", payload: json });
      }
    };

    const fetchStudentData = async () => {
      const response = await fetch(
        "http://192.168.0.151:4000/api/studentData/1",
        {
          headers: {
            Authorization: `Bearer ${studentUser.token}`,
          },
        }
      ); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatchStudentData({ type: "SET_STUDENT", payload: json });
      }
    };

    fetchStudySpaces();
    fetchStudentData();
  }, [dispatch, dispatchStudentData]); //only fires once when the Seat Map page first renders

  //states
  const [torchStatus, setTorchStatus] = React.useState("off");
  const [isScanned, setIsScanned] = React.useState(false);

  //specify the type of barcode we want to detect
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  //will detect QR CODE & assign to the barcodes state if any

  //constants for CAMERA
  const devices = useCameraDevices(); //get access to a list of device cameras
  const device = devices.back; //get the back camera

  React.useEffect(() => {
    toggleActiveState();
  }, [barcodes]); //listens to barcodes state

  React.useEffect(() => {
    requestCameraPermission();
  }, []); //requests for permission whenever the screen is loaded

  //supporting funcs
  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === "denied") await Linking.openSettings();
  }, []);

  const toggleActiveState = async () => {
    //check if barcode is not null and not empty
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);

      barcodes.forEach(async (scannedBarcode) => {
        if (scannedBarcode.rawValue !== "") {
          //check if its not empty string

          if (scannedBarcode.rawValue === code) {
            //check that code same with seat number, if yes:
            //update studentData: longbreakEndTime to "", shortbreak endtime to =""

            const date = new Date();
            const time = new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "numeric",
              minute: "numeric",
            });

            //make a student object
            const student = {
              profImg: studentData.profImg,
              seatStat: studentData.seatStat,
              checkInEndTime: student.checkInEndTime,
              shortBreakEndTime: "",
              longBreakEndTime: "",
              reserveNum: studentData.reserveNum,
              delayed: studentData.delayed,
              timeline: studentData.timeline,
              dinnerBreakCount: studentData.dinnerBreakCount,
              lunchBreakCount: studentData.lunchBreakCount,
              shortBreakCount: studentData.shortBreakCount,
            };

            const response = await fetch(
              "http://192.168.0.151:4000/api/studentData/" + studentData._id,
              {
                method: "PATCH",
                body: JSON.stringify(student), //changes the object into a json string
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${studentUser.token}`,
                },
              }
            );

            const json = await response.json();

            if (!response.ok) {
              ToastAndroid.showWithGravityAndOffset(
                json.error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                250
              );
            }

            //studyspace is null??
            if (response.ok) {
              dispatchStudentData({ type: "EDIT_STUDENT", payload: json });

              const newData = studySpace
                .find((s) => s.name === studentData.seatStat.split("_")[1])
                .data.map((obj) =>
                  obj.seat === studentData.seatStat.split("_")[2]
                    ? {
                        ...obj,
                        status: "Occupied",
                      }
                    : obj
                );

              //make a study space object
              const space = {
                availableSeats: studySpace.find(
                  (s) => s.name === studentData.seatStat.split("_")[1]
                ).availableSeats,
                data: newData,
              };

              const response = await fetch(
                "http://192.168.0.151:4000/api/studySpace/" +
                  studySpace.find(
                    (s) => s.name === studentData.seatStat.split("_")[1]
                  )._id,
                {
                  method: "PATCH",
                  body: JSON.stringify(space), //changes the object into a json string
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const json = await response.json();

              if (!response.ok) {
                ToastAndroid.showWithGravityAndOffset(
                  json.error,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );
              }

              if (response.ok) {
                dispatch({ type: "EDIT_STUDYSPACE", payload: json });

                ToastAndroid.showWithGravityAndOffset(
                  "Checked-in to seat successfully.",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );

                //navigate back to reservation page?
                navigation.navigate("Reservation");
              }
            }
          } else {
            //if no: toast message - invalid qr code

            //give toast message
            ToastAndroid.showWithGravityAndOffset(
              "Invalid QR code." + scannedBarcode.rawValue,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              250
            );
          }
        }
      });
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Reservation")}
        >
          <Image
            source={icons.close}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
            Scan QR Code
          </Text>
        </View>
      </View>
    );
  }

  const torch = () => {
    console.log("torch");

    if (torchStatus == "off") {
      setTorchStatus("on");
    } else {
      setTorchStatus("off");
    }
  };

  function renderTorch() {
    return (
      <View style={{ position: "absolute", bottom: 120, alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 1000,
            backgroundColor: "#ffffff50",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={torch}
        >
          <Image
            source={icons.torch}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          bottom: 200,
        }}
      >
        <Image
          source={images.focus}
          resizeMode="contain"
          style={{
            width: 320,
            height: 320,
          }}
        />
      </View>
    );
  }

  function renderCamera() {
    //check if device has valid camera
    if (device == null) {
      return <View style={{ flex: 1 }} />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            enableZoomGesture
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            torch={torchStatus}
          />
          {renderHeader()}

          {renderScanFocus()}
          {renderTorch()}
        </View>
      );
    }
  }

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.transparent}
      />
      {studentData && studySpace && (
        <View style={styles.container}>{renderCamera()}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanQRBreakCheckIn;
