import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  ToastAndroid,
} from "react-native";
import React from "react";

import DropShadow from "react-native-drop-shadow";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

//context
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";
import { useStudySpaceContext } from "../../hooks/useStudySpaceContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const PendingReservation = () => {
  const navigation = useNavigation();

  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();
  const { studySpace, dispatch: dispatchSpace } = useStudySpaceContext();

  //states
  const [wanted, setWanted] = React.useState(null);

  React.useEffect(() => {
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
        dispatch({ type: "SET_STUDENT", payload: json });

        fetchStudySpaces();
      }
    };

    const fetchStudySpaces = async () => {
      const response = await fetch("http://192.168.0.151:4000/api/studySpace/"); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatchSpace({ type: "SET_STUDYSPACES", payload: json });
        setWanted(
          studySpace.find((s) => s.name === studentData.seatStat.split("_")[1])
        );
      }
    };

    fetchStudentData();
  }, [dispatch, dispatchSpace]); //only fires once when the Student page first renders

  const calcCheckInEndTime = (time, duration) => {
    const hr = time.split(":")[0];
    const min = time.split(":")[1];

    //get current time
    const startTime = new Date(); //your starting time
    startTime.setHours(hr);
    startTime.setMinutes(min);
    startTime.setSeconds(0);
    console.log("here", startTime);

    const startTimestamp = startTime.getTime();

    //20 minutes x 60 seconds x 1000 miliseconds
    const timeExtent = duration * 60 * 1000;

    const endTime = new Date(startTimestamp + timeExtent);

    const hours = (endTime.getHours() < 10 ? "0" : "") + endTime.getHours();
    const minutes =
      (endTime.getMinutes() < 10 ? "0" : "") + endTime.getMinutes();

    return hours + ":" + minutes;
  };

  const handleCancel = async () => {
    console.log("cancel");

    //cancel reservation...

    //make a student object
    const student = {
      //update studentdata: seatStat to "None", checkInEndTime to "", delayed to false
      profImg: studentData.profImg,
      seatStat: "None",
      checkInEndTime: "",
      delayed: false,
      shortBreakEndTime: "",
      longBreakEndTime: "",
      reserveNum: studentData.reserveNum,
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

    if (response.ok) {
      dispatch({ type: "EDIT_STUDENT", payload: json });
      //update studyspaces data:
      //available space + 1,
      //seat data: status = "Free", userInfo = "-"

      const newData = wanted.data.map((obj) =>
        obj.userInfo === studentData.username
          ? { ...obj, seat: "Free", userInfo: "-" }
          : obj
      );

      //make a study space object
      const studySpace = {
        availableSeats: wanted.availableSeats + 1,
        data: newData,
      };

      const response = await fetch(
        "http://192.168.0.151:4000/api/studySpace/" + wanted._id,
        {
          method: "PATCH",
          body: JSON.stringify(studySpace), //changes the object into a json string
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
        dispatchSpace({ type: "EDIT_STUDYSPACE", payload: json });

        //clear states
        setWanted(null);

        ToastAndroid.showWithGravityAndOffset(
          "Seat reservation cancelled successfully.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    }
  };

  const handleDelay = async () => {
    console.log("delay");

    if (studentData.delayed === true) {
      //check if delay is true (used before)
      //toast message: cannot be used anymore.

      ToastAndroid.showWithGravityAndOffset(
        "Check-in time can only be delayed once.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    } else {
      //if not
      //studentdata.delayed == true
      //checkinendTime == + 5 mins
      //update the UI

      const student = {
        profImg: studentData.profImg,
        seatStat: studentData.seatStat,
        checkInEndTime: calcCheckInEndTime(studentData.checkInEndTime, 5),
        shortBreakEndTime: "",
        longBreakEndTime: "",
        delayed: true,
        reserveNum: studentData.reserveNum,
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

      if (response.ok) {
        dispatch({ type: "EDIT_STUDENT", payload: json });
        ToastAndroid.showWithGravityAndOffset(
          "Check-in time delayed for 5 mins.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    }
  };

  const handleScan = () => {
    console.log("check-in");

    navigation.navigate("ScanQR", { code: studentData.seatStat.split("_")[2] });
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      {studentData && (
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          {/* map view */}
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: COLORS.lightgray5,
            }}
          ></View>

          {/* reservation options */}
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 150,
              borderRadius: 20,
              marginHorizontal: 15,
              marginTop: -(SIZES.height / 3),
              paddingTop: 20,
              paddingBottom: 15,
              paddingLeft: 17,
              paddingRight: 17,
              flexDirection: "row",
            }}
          >
            {/* Rev Information, delay, cancel */}
            <View
              style={{
                width: "70%",
                // backgroundColor: COLORS.gray
              }}
            >
              {/* rev info */}
              <View style={{ flexDirection: "column", marginBottom: 25 }}>
                <Text
                  style={{ ...FONTS.h4, color: COLORS.black, marginBottom: 3 }}
                >
                  {studentData.seatStat.split("_")[1] +
                    " (" +
                    studentData.seatStat.split("_")[2] +
                    ")"}
                </Text>

                <Text style={{ color: COLORS.gray }}>
                  Check-in your seat by {studentData.checkInEndTime}
                </Text>
              </View>

              {/* delay & cancel buttons */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <CustomButton1
                  text="Delay"
                  onPress={handleDelay}
                  marginTop={0}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
                <View style={{ width: 17 }} />
                <CustomButton1
                  text="Cancel"
                  onPress={handleCancel}
                  marginTop={0}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
              </View>
            </View>
            {/* Check in */}
            <View
              style={{
                width: "30%",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                // backgroundColor: COLORS.darkgray,
              }}
            >
              <Pressable
                onPress={handleScan}
                style={{
                  borderWidth: 7.5,
                  borderColor: COLORS.Gsplashlight,
                  borderRadius: 1000,
                  backgroundColor: COLORS.Gsplashheartdark,
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.scan}
                  style={{ height: 20, width: 20, tintColor: COLORS.white }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default PendingReservation;
