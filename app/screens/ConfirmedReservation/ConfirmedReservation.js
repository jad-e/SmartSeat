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
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";
import { useCustomizationContext } from "../../hooks/useCustomizationContext";
import { useStudySpaceContext } from "../../hooks/useStudySpaceContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ConfirmedReservation = () => {
  const navigation = useNavigation();

  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();
  const { customization, dispatch: dispatchCust } = useCustomizationContext();
  const { studySpace, dispatch: dispatchSpace } = useStudySpaceContext();

  React.useEffect(() => {
    const fetchStudySpaces = async () => {
      const response = await fetch("http://192.168.0.151:4000/api/studySpace/"); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatchSpace({ type: "SET_STUDYSPACES", payload: json });
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
        dispatch({ type: "SET_STUDENT", payload: json });
      }
    };

    const fetchCustomization = async () => {
      const response = await fetch(
        "http://192.168.0.151:4000/api/customization/648d897e2c51433d55f5e747"
      ); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatchCust({ type: "SET_CUSTOMIZATION", payload: json });
      }
    };

    fetchStudentData();
    fetchCustomization();
    fetchStudySpaces();
  }, [dispatch, dispatchCust, dispatchSpace]); //only fires once when the Student page first renders

  const handleWithdraw = async () => {
    //withdraw seat
    setPopUpDialogState(false);

    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

    //UPDATE RESERVATION LIST
    //make rev obj
    const reservation = {
      timeEnd: time,
    };

    const response = await fetch(
      "http://192.168.0.151:4000/api/reservation/" + studentData.username,
      {
        method: "PATCH",
        body: JSON.stringify(reservation), //changes the object into a json string
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
      //UPDATE STUDY SPACES

      const newData = studySpace
        .find((s) => s.name === studentData.seatStat.split("_")[1])
        .data.map((obj) =>
          obj.seat === studentData.seatStat.split("_")[2]
            ? {
                ...obj,
                status: "Free",
                userInfo: "-",
              }
            : obj
        );
      //make a study space object
      const space = {
        availableSeats:
          studySpace.find((s) => s.name === studentData.seatStat.split("_")[1])
            .availableSeats + 1,
        data: newData,
      };

      const response = await fetch(
        "http://192.168.0.151:4000/api/studySpace/" +
          studySpace.find((s) => s.name === studentData.seatStat.split("_")[1])
            ._id,
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
        dispatchSpace({ type: "EDIT_STUDYSPACE", payload: json });
        //UPDATE STUDENT DATA - seatStat = "None", checkInEndTime = "", longBreakEndTime = "",
        //shortBreakEndTime = "", shortBreakEndTime = "", timelineArr + rev object

        const tempArr = studentData.timeline.map((obj) =>
          obj.type === 2 && timeEnd === ""
            ? {
                ...obj,
                timeEnd: time,
              }
            : obj
        );

        //make a student object
        const student = {
          profImg: studentData.profImg,
          seatStat: "None",
          checkInEndTime: "",
          shortBreakEndTime: "",
          longBreakEndTime: "",
          reserveNum: studentData.reserveNum,
          delayed: false,
          timeline: tempArr,
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
          //give toast message
          ToastAndroid.showWithGravityAndOffset(
            "Seat withdrawal successful!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            250
          );

          //navigate back to home
          navigation.navigate("Home");
        }
      }
    }
  };

  //data
  const studyTextData = [
    "Hang in there!",
    "Get your things done.",
    "Stay focus!",
    "Keep up the good work!",
    "You can do this!",
  ];

  //states
  const [newStudyText, setNewStudyText] = React.useState(
    "Get your things done."
  );
  const [popUpDialogState, setPopUpDialogState] = React.useState(false); //track the state of the pop up dialog

  //supporting funcs
  const calcBreakEndTime = (duration) => {
    //get current time
    const startTime = new Date(); //your starting time
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

  const checkLunchStatus = (startHr, startMin, endHr, endMin) => {
    var lunchstart_val = new Date();
    var lunchend_val = new Date();

    var lunch_start = lunchstart_val.setHours(startHr, startMin);
    var lunch_end = lunchend_val.setHours(endHr, endMin);
    var check_val = new Date();

    if (check_val >= lunch_start && check_val <= lunch_end) {
      return true;
    } else {
      return false;
    }
  };

  const checkDinnerStatus = (startHr, startMin, endHr, endMin) => {
    var dinnerstart_val = new Date();
    var dinnerend_val = new Date();

    var dinner_start = dinnerstart_val.setHours(startHr, startMin);
    var dinner_end = dinnerend_val.setHours(endHr, endMin);
    var check_val = new Date();

    if (check_val >= dinner_start && check_val <= dinner_end) {
      return true;
    } else {
      return false;
    }
  };

  //CONTINUE HERE
  const handleShortBreak = async () => {
    console.log("short break!");

    //check short break count

    if (studentData.shortBreakCount < customization.shortBreakUsageAmount) {
      //if OK,
      //UPDATE STUDENT DATA - shortBreakCount + 1, shortbreakendtime
      const student = {
        profImg: studentData.profImg,
        seatStat: studentData.seatStat,
        checkInEndTime: studentData.checkInEndTime,
        shortBreakEndTime: calcBreakEndTime(customization.shortBreakTimeLimit),
        longBreakEndTime: studentData.longBreakEndTime,
        delayed: studentData.delayed,
        reserveNum: studentData.reserveNum,
        timeline: studentData.timeline,
        dinnerBreakCount: studentData.dinnerBreakCount,
        lunchBreakCount: studentData.lunchBreakCount,
        shortBreakCount: studentData.shortBreakCount + 1,
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

        //UPDATE STUDY SPACES DATA - status = short break
        const newData = studySpace
          .find((s) => s.name === studentData.seatStat.split("_")[1])
          .data.map((obj) =>
            obj.seat === studentData.seatStat.split("_")[2]
              ? {
                  ...obj,
                  status: "Short Break",
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
          dispatchSpace({ type: "EDIT_STUDYSPACE", payload: json });

          ToastAndroid.showWithGravityAndOffset(
            "You are currently on short break.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            250
          );
        }
      }
    } else {
      //if not OK,
      //reject

      ToastAndroid.showWithGravityAndOffset(
        "Exceeded usage limit.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    }
  };

  const handleLunchBreak = async () => {
    console.log("lunch long break!");

    //check if on time
    if (
      checkLunchStatus(
        parseInt(customization.lunchBreakStartTime.split(":")[0]),
        parseInt(customization.lunchBreakStartTime.split(":")[1]),
        parseInt(customization.lunchBreakEndTime.split(":")[0]),
        parseInt(customization.lunchBreakEndTime.split(":")[1])
      )
    ) {
      //check if lunch break limit exceeded
      if (studentData.lunchBreakCount < customization.lunchBreakUsageAmount) {
        //if OK,
        //UPDATE STUDENT DATA - lunchBreakCount + 1, lunchbreakendtime
        const student = {
          profImg: studentData.profImg,
          seatStat: studentData.seatStat,
          checkInEndTime: studentData.checkInEndTime,
          shortBreakEndTime: studentData.shortBreakEndTime,
          longBreakEndTime: calcBreakEndTime(customization.lunchBreakTimeLimit),
          delayed: studentData.delayed,
          reserveNum: studentData.reserveNum,
          timeline: studentData.timeline,
          dinnerBreakCount: studentData.dinnerBreakCount,
          lunchBreakCount: studentData.lunchBreakCount + 1,
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

          //UPDATE STUDY SPACES DATA - status = long break
          const newData = studySpace
            .find((s) => s.name === studentData.seatStat.split("_")[1])
            .data.map((obj) =>
              obj.seat === studentData.seatStat.split("_")[2]
                ? {
                    ...obj,
                    status: "Long Break",
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
            dispatchSpace({ type: "EDIT_STUDYSPACE", payload: json });

            ToastAndroid.showWithGravityAndOffset(
              "You are currently on lunch break.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              250
            );
          }
        }
      } else {
        //if not OK,
        //reject

        ToastAndroid.showWithGravityAndOffset(
          "Exceeded usage limit.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Break option unavailable at the moment.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    }
  };

  const handleDinnerBreak = async () => {
    console.log("dinner long break!");

    //check if on time
    if (
      checkDinnerStatus(
        parseInt(customization.dinnerBreakStartTime.split(":")[0]),
        parseInt(customization.dinnerBreakStartTime.split(":")[1]),
        parseInt(customization.dinnerBreakEndTime.split(":")[0]),
        parseInt(customization.dinnerBreakEndTime.split(":")[1])
      )
    ) {
      //check if dinner break limit exceeded
      if (studentData.dinnerBreakCount < customization.dinnerBreakUsageAmount) {
        //if OK,
        //UPDATE STUDENT DATA - dinnerBreakCount + 1, dinnerbreakendtime
        const student = {
          profImg: studentData.profImg,
          seatStat: studentData.seatStat,
          checkInEndTime: studentData.checkInEndTime,
          shortBreakEndTime: studentData.shortBreakEndTime,
          longBreakEndTime: calcBreakEndTime(
            customization.dinnerBreakTimeLimit
          ),
          delayed: studentData.delayed,
          reserveNum: studentData.reserveNum,
          timeline: studentData.timeline,
          dinnerBreakCount: studentData.dinnerBreakCount + 1,
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

          //UPDATE STUDY SPACES DATA - status = long break
          const newData = studySpace
            .find((s) => s.name === studentData.seatStat.split("_")[1])
            .data.map((obj) =>
              obj.seat === studentData.seatStat.split("_")[2]
                ? {
                    ...obj,
                    status: "Long Break",
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
            dispatchSpace({ type: "EDIT_STUDYSPACE", payload: json });

            ToastAndroid.showWithGravityAndOffset(
              "You are currently on dinner break.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              250
            );
          }
        } //HERE
      } else {
        //if not OK,
        //reject

        ToastAndroid.showWithGravityAndOffset(
          "Exceeded usage limit.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Break option unavailable at the moment.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    }
  };

  const studyOptions = () => {
    return (
      <>
        {/* short break button */}
        <TouchableOpacity activeOpacity={1} onPress={handleShortBreak}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.coffee}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                Short Break
              </Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                {customization.shortBreakTimeLimit} min break (anytime)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* lunch break button */}
        <TouchableOpacity activeOpacity={1} onPress={handleLunchBreak}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.spoonfork}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                Lunch Break
              </Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                {customization.lunchBreakTimeLimit} min break (
                {customization.lunchBreakStartTime} -{" "}
                {customization.lunchBreakEndTime})
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* dinner break button */}
        <TouchableOpacity activeOpacity={1} onPress={handleDinnerBreak}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.spoonfork}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                Dinner Break
              </Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                {customization.dinnerBreakTimeLimit} min break (
                {customization.dinnerBreakStartTime} -{" "}
                {customization.dinnerBreakEndTime})
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* withdraw button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log("withdraw");
            //withdraw library seat

            //pop up confirm + send toast message
            setPopUpDialogState(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.exit}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>Withdraw</Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                Release your seat to other students
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  //CONTINUE HERE
  const handleCheckIn = () => {
    navigation.navigate("ScanQRBreakCheckIn", {
      code: studentData.seatStat.split("_")[2],
    });
  };

  const breakOptions = () => {
    return (
      <>
        {/* check-in button */}
        <TouchableOpacity activeOpacity={1} onPress={handleCheckIn}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.scan}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>Check-In</Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                Scan the QR code on your seat
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* withdraw button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log("withdraw");

            //withdraw library seat

            //pop up confirm + send toast message
            setPopUpDialogState(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.Gicongreenback,
                height: 45,
                width: 45,
                borderRadius: 1000,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.exit}
                style={{
                  tintColor: COLORS.Gicongreenfore,
                  height: 25,
                  width: 25,
                }}
              />
            </View>

            <View style={{ marginLeft: 20 }}>
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>Withdraw</Text>
              <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                Release your seat to other students
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const shuffle = React.useCallback(() => {
    const index = Math.floor(Math.random() * studyTextData.length);
    setNewStudyText(studyTextData[index]);
  }, []);

  React.useEffect(() => {
    const intervalID = setInterval(shuffle, 5000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={COLORS.Gnotitabselected}
      />
      {studentData && customization && (
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
              alignItems: "center",
            },
          ]}
        >
          {/* seat info */}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 20,
              borderColor: COLORS.lightgray4,
              borderWidth: 5,
              height: 80,
              width: "85%",
              marginTop: 20,
              marginBottom: 40,
              paddingLeft: 17,
              justifyContent: "center",
            }}
          >
            <Text style={{ ...FONTS.h2b }}>
              {studentData.seatStat.split("_")[1]}
            </Text>
            <Text style={{ ...FONTS.body4a }}>
              Seat No. {studentData.seatStat.split("_")[2]}
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.body4,
              marginBottom: 20,
              color: COLORS.white,
            }}
          >
            {!studentData.longBreakEndTime && !studentData.shortBreakEndTime
              ? newStudyText
              : "Get back to your seat by " +
                studentData.longBreakEndTime +
                studentData.shortBreakEndTime +
                "."}
          </Text>
          {/* <ImageBackground
          source={timelinecardcircle}
          style={{
            height: 200,
            width: 200,
            borderRadius: 1000,
            borderColor: COLORS.Ftimer_circleborder,
            borderWidth: 10,
            marginBottom: 50,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
          <Image
            source={
              !studentData.longBreakEndTime && !studentData.shortBreakEndTime
                ? study
                : lunch_time
            }
            style={{
              height: 170,
              width: 170,
              marginTop: 20,
            }}
          />
          {/* </ImageBackground> */}

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 280,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={{
                  backgroundColor:
                    !studentData.longBreakEndTime &&
                    !studentData.shortBreakEndTime
                      ? COLORS.Gnotitabselected
                      : COLORS.Gnotitabunselected,
                  height: 30,
                  width: "45%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    fontSize: 13,
                    color:
                      !studentData.longBreakEndTime &&
                      !studentData.shortBreakEndTime
                        ? COLORS.white
                        : COLORS.Gnotitabselected,
                  }}
                >
                  On Seat
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    !studentData.longBreakEndTime &&
                    !studentData.shortBreakEndTime
                      ? COLORS.Gnotitabunselected
                      : COLORS.Gnotitabselected,
                  height: 30,
                  width: "45%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    fontSize: 13,
                    color:
                      !studentData.longBreakEndTime &&
                      !studentData.shortBreakEndTime
                        ? COLORS.Gnotitabselected
                        : COLORS.white,
                  }}
                >
                  Away
                </Text>
              </View>
            </View>
            {/* content will change part */}
            <View
              style={{
                flexDirection: "column",
                marginTop: 15,
                marginBottom: 70,
              }}
            >
              <ScrollView
                overScrollMode="never"
                showsVerticalScrollIndicator={true}
              >
                {!studentData.longBreakEndTime && !studentData.shortBreakEndTime
                  ? studyOptions()
                  : breakOptions()}
              </ScrollView>
            </View>
          </View>
        </View>
      )}

      {/* withdraw confirmation pop up dialog */}
      <Modal
        visible={popUpDialogState}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        width={0.85}
        height={0.28}
      >
        <ModalContent>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ ...FONTS.h2b }}>Withdraw Seat</Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.body4,
                color: COLORS.gray,
                marginBottom: 20,
              }}
            >
              Are you sure you want to release your seat to other students?
            </Text>
            <View style={{ marginTop: "auto" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <CustomButton1
                  text="Cancel"
                  onPress={() => setPopUpDialogState(false)}
                  marginTop={20}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
                <CustomButton1
                  text="OK"
                  onPress={handleWithdraw}
                  marginTop={20}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
              </View>
            </View>
          </View>
        </ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Gnotitabselected,
    flex: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default ConfirmedReservation;
