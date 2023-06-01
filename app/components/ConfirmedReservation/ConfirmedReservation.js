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

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ConfirmedReservation = () => {
  const navigation = useNavigation();

  //data
  const studyTextData = [
    "Hang in there!",
    "Get your things done.",
    "Stay focus!",
    "Keep up the good work!",
    "You can do this!",
  ];

  //states
  const [studyState, setStudyState] = React.useState(true);
  const [newStudyText, setNewStudyText] = React.useState(
    "Get your things done."
  );
  const [breakTimeEnd, setbreakTimeEnd] = React.useState("");
  const [shortBreakCount, setShortBreakCount] = React.useState(0);
  const [lunchBreakCount, setLunchBreakCount] = React.useState(0);
  const [dinnerBreakCount, setDinnerBreakCount] = React.useState(0);
  const [popUpDialogState, setPopUpDialogState] = React.useState(false); //track the state of the pop up dialog

  const firstShortBreakUpdate = React.useRef(true);
  const firstLunchBreakUpdate = React.useRef(true);
  const firstDinnerBreakUpdate = React.useRef(true);

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

  //after the state for short break updated, do this
  React.useLayoutEffect(() => {
    if (firstShortBreakUpdate.current) {
      firstShortBreakUpdate.current = false;
      console.log("runshortbreak - break");
      return;
    }

    //check if already 10 times
    if (shortBreakCount > 10) {
      //toast message, cannot use
      ToastAndroid.showWithGravityAndOffset(
        "Exceeded usage limit.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    } else {
      setStudyState(false);

      //set break end time (show on screen, let user know)
      setbreakTimeEnd(calcBreakEndTime(20));

      //function to fire at XX:XX
      //check if qr code data is received?
    }
  }, [shortBreakCount]);

  //after the state for lunch break updated, do this
  React.useLayoutEffect(() => {
    if (firstLunchBreakUpdate.current) {
      firstLunchBreakUpdate.current = false;

      console.log("runlunch - break");
      return;
    }

    //check if already 1 times
    if (lunchBreakCount > 1) {
      //toast message, cannot use
      ToastAndroid.showWithGravityAndOffset(
        "Exceeded usage limit.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    } else {
      //check if can use right now?
      if (checkLunchStatus(11, 0, 14, 0)) {
        setStudyState(false);

        //set break end time (show on screen, let user know)
        setbreakTimeEnd(calcBreakEndTime(60));

        //function to fire at XX:XX
        //check if qr code data is received?
      } else {
        //toast message, cannot use
        ToastAndroid.showWithGravityAndOffset(
          "Break option unavailable at the moment.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    }
  }, [lunchBreakCount]);

  //after the state for dinner break updated, do this
  React.useLayoutEffect(() => {
    if (firstDinnerBreakUpdate.current) {
      firstDinnerBreakUpdate.current = false;

      console.log("rundinner - break");
      return;
    }

    //check if already 1 times
    if (dinnerBreakCount > 1) {
      //toast message, cannot use
      ToastAndroid.showWithGravityAndOffset(
        "Exceeded usage limit.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    } else {
      //check if can use right now?
      if (checkDinnerStatus(17, 0, 20, 0)) {
        setStudyState(false);

        //set break end time (show on screen, let user know)
        setbreakTimeEnd(calcBreakEndTime(60));

        //function to fire at XX:XX
        //check if qr code data is received?
      } else {
        //toast message, cannot use
        ToastAndroid.showWithGravityAndOffset(
          "Break option unavailable at the moment.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );
      }
    }
  }, [dinnerBreakCount]);

  const studyOptions = () => {
    return (
      <>
        {/* short break button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log("short break!");
            setShortBreakCount(shortBreakCount + 1);
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
                20 min break (anytime)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* lunch break button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log("lunch long break!");

            setLunchBreakCount(lunchBreakCount + 1);
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
                60 min break (11:00 - 14:00)
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* dinner break button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log("dinner long break!");

            setDinnerBreakCount(dinnerBreakCount + 1);
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
                60 min break (17:00 - 20:00)
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

  const breakOptions = () => {
    return (
      <>
        {/* check-in button */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setStudyState(true);
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
          <Text style={{ ...FONTS.h2b }}>Peking Library</Text>
          <Text style={{ ...FONTS.body4a }}>Seat No. PK-D350</Text>
        </View>
        <Text
          style={{
            ...FONTS.body4,
            marginBottom: 20,
            color: COLORS.white,
          }}
        >
          {studyState
            ? newStudyText
            : "Get back to your seat by " + breakTimeEnd + "."}
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
          source={studyState ? study : lunch_time}
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
                backgroundColor: studyState
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
                  color: studyState ? COLORS.white : COLORS.Gnotitabselected,
                }}
              >
                On Seat
              </Text>
            </View>
            <View
              style={{
                backgroundColor: studyState
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
                  color: studyState ? COLORS.Gnotitabselected : COLORS.white,
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
              {studyState ? studyOptions() : breakOptions()}
            </ScrollView>
          </View>
        </View>
      </View>

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
                  onPress={() => {
                    //withdraw seat

                    setPopUpDialogState(false);

                    //give toast message
                    ToastAndroid.showWithGravityAndOffset(
                      "Seat withdrawal successful!",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      0,
                      250
                    );

                    //navigate user
                  }}
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
