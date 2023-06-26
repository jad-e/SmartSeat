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
  Pressable,
  Button,
} from "react-native";
import React from "react";

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

//components
import { Header } from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { lvl5b } = images;

//context
import { useStudySpaceContext } from "../../hooks/useStudySpaceContext";
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";
import { useCustomizationContext } from "../../hooks/useCustomizationContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const SeatMap = () => {
  const navigation = useNavigation();

  const { studySpace, dispatch } = useStudySpaceContext();
  const { studentData, dispatch: dispatchStudentData } =
    useStudentDataContext();
  const { studentUser } = useStudentAuthContext();
  const { customization, dispatch: dispatchCust } = useCustomizationContext();

  //states..
  const [wanted, setWanted] = React.useState(null);
  const [popUpDialogState, setPopUpDialogState] = React.useState(false); //track the state of the pop up dialog
  const [seatSelection, setSeatSelection] = React.useState("");

  React.useEffect(() => {
    const fetchStudySpaces = async () => {
      const response = await fetch("http://192.168.0.151:4000/api/studySpace/"); //4000 is the port that server is listening to

      const json = await response.json(); //parsed into an array of objects

      //check if response if ok (data get back successfully)
      if (response.ok) {
        dispatch({ type: "SET_STUDYSPACES", payload: json });
        setWanted(studySpace.find((s) => s._id === "64920cfad8f08d6d10277fbd"));
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

    fetchCustomization();
    fetchStudySpaces();
    fetchStudentData();
  }, [dispatch, dispatchStudentData, dispatchCust]); //only fires once when the Seat Map page first renders

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

  const onDialogOKPressed = async (data) => {
    setPopUpDialogState(false);

    //CONTINUE HERE..
    //thoughts:
    //get student data context => check if user already reserving a seat, but tries to reserve another one [OK]
    //update the student seatStat
    //navigate student back to home page + toast message if sucessful

    //current data and time
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

    //make a student object
    const student = {
      profImg: studentData.profImg,
      seatStat: "Pending Reservation_Area 5B_" + seatSelection + "_" + time,
      checkInEndTime: calcCheckInEndTime(
        time,
        customization.revCheckInTimeLimit
      ),
      shortBreakEndTime: "",
      longBreakEndTime: "",
      delayed: false,
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
      dispatchStudentData({ type: "EDIT_STUDENT", payload: json });
      //update study space data

      const newData = wanted.data.map((obj) =>
        obj.seat === seatSelection
          ? { ...obj, status: "Reserved", userInfo: studentData.username }
          : obj
      );

      //make a study space object
      const studySpace = {
        availableSeats: wanted.availableSeats - 1,
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
        dispatch({ type: "EDIT_STUDYSPACE", payload: json });
        //finally...
        //clear seat selection
        setSeatSelection("");

        ToastAndroid.showWithGravityAndOffset(
          "Seat reserved successfully.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          250
        );

        //naivate back to home page
        navigation.navigate("Home");
      }
    }
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.Gheader}
      />
      <Header backgroundColor={COLORS.Gheader} />

      {wanted && studentData && customization && (
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: COLORS.white,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "green",
                    height: 17,
                    width: 17,
                    borderRadius: 4,
                    marginRight: 6,
                  }}
                />
                <Text>Free</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "yellow",
                    height: 17,
                    width: 17,
                    borderRadius: 4,
                    marginRight: 6,
                  }}
                />
                <Text>Reserved</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "red",
                    height: 17,
                    width: 17,
                    borderRadius: 4,
                    marginRight: 6,
                  }}
                />
                <Text>Occupied</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "blue",
                    height: 17,
                    width: 17,
                    borderRadius: 4,
                    marginRight: 6,
                  }}
                />
                <Text>On Break</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              width: "100%",
              backgroundColor: COLORS.white,
            }}
          >
            <Image
              source={lvl5b}
              style={{
                height: "70%",
                width: "70%",
                marginTop: 15,
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 105,
                left: 105,
                backgroundColor:
                  wanted.data.find((s) => s.seat === "L5-B01").status === "Free"
                    ? "green"
                    : wanted.data.find((s) => s.seat === "L5-B01").status ===
                      "Reserved"
                    ? "yellow"
                    : wanted.data.find((s) => s.seat === "L5-B01").status ===
                      "Long Break"
                    ? "blue"
                    : "red",
                borderRadius: 50,
                height: 20,
                width: 20,
              }}
              onPress={() => {
                setSeatSelection("L5-B01");
                ToastAndroid.showWithGravityAndOffset(
                  "L5-B01",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 105,
                left: 135,
                backgroundColor:
                  wanted.data.find((s) => s.seat === "L5-B02").status === "Free"
                    ? "green"
                    : wanted.data.find((s) => s.seat === "L5-B02").status ===
                      "Reserved"
                    ? "yellow"
                    : wanted.data.find((s) => s.seat === "L5-B02").status ===
                      "Long Break"
                    ? "blue"
                    : "red",
                borderRadius: 50,
                height: 20,
                width: 20,
              }}
              onPress={() => {
                setSeatSelection("L5-B02");
                ToastAndroid.showWithGravityAndOffset(
                  "L5-B02",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 135,
                left: 105,
                backgroundColor:
                  wanted.data.find((s) => s.seat === "L5-B03").status === "Free"
                    ? "green"
                    : wanted.data.find((s) => s.seat === "L5-B03").status ===
                      "Reserved"
                    ? "yellow"
                    : wanted.data.find((s) => s.seat === "L5-B03").status ===
                      "Long Break"
                    ? "blue"
                    : "red",
                borderRadius: 50,
                height: 20,
                width: 20,
              }}
              onPress={() => {
                setSeatSelection("L5-B03");
                ToastAndroid.showWithGravityAndOffset(
                  "L5-B03",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );
              }}
            />
            <Pressable
              style={{
                position: "absolute",
                top: 135,
                left: 135,
                backgroundColor:
                  wanted.data.find((s) => s.seat === "L5-B04").status === "Free"
                    ? "green"
                    : wanted.data.find((s) => s.seat === "L5-B04").status ===
                      "Reserved"
                    ? "yellow"
                    : wanted.data.find((s) => s.seat === "L5-B04").status ===
                      "Long Break"
                    ? "blue"
                    : "red",
                borderRadius: 50,
                height: 20,
                width: 20,
              }}
              onPress={() => {
                setSeatSelection("L5-B04");
                ToastAndroid.showWithGravityAndOffset(
                  "L5-B04",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  0,
                  250
                );
              }}
            />

            <Text style={{ marginTop: 20, ...FONTS.h4 }}>
              Seat Selection: {seatSelection}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <CustomButton1
                text="Navigate"
                onPress={() => {
                  //check if seat selection is empty
                  if (seatSelection === "") {
                    ToastAndroid.showWithGravityAndOffset(
                      "Please select a destination by tapping on one of the seats above.",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      0,
                      250
                    );
                  } else {
                    //navigate to nav page
                    navigation.navigate("IndoorNav", {
                      seat: seatSelection,
                    });
                  }
                }}
                marginTop={20}
                marginBottom={20}
                borderRadius={5}
                width="40%"
              />

              <CustomButton1
                text="Reserve"
                onPress={() => {
                  if (studentData.seatStat != "None") {
                    ToastAndroid.showWithGravityAndOffset(
                      "You can only reserve one seat at a time.",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      0,
                      250
                    );

                    return;
                  }

                  if (seatSelection === "") {
                    ToastAndroid.showWithGravityAndOffset(
                      "Please select a seat.",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      0,
                      250
                    );
                  } else if (
                    wanted.data.find((s) => s.seat === seatSelection).status !=
                    "Free"
                  ) {
                    //seat is not free

                    ToastAndroid.showWithGravityAndOffset(
                      "This seat is not available at the moment.",
                      ToastAndroid.LONG,
                      ToastAndroid.BOTTOM,
                      0,
                      250
                    );
                  } else {
                    //modal pop up for reserve (confirmation)
                    setPopUpDialogState(true);
                  }
                }}
                marginTop={20}
                marginBottom={20}
                borderRadius={5}
                width="40%"
              />
            </View>
          </View>

          <Modal
            visible={popUpDialogState}
            modalAnimation={
              new ScaleAnimation({
                initialValue: 0, // optional
                useNativeDriver: true, // optional
              })
            }
            width={0.85}
            height={0.25}
          >
            <ModalContent>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Text style={{ ...FONTS.h2b }}>Seat Reservation</Text>
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body4,
                    color: COLORS.gray,
                    marginBottom: 20,
                  }}
                >
                  Are you sure you want to reserve this seat?
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
                      onPress={onDialogOKPressed}
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
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightgray2,
    flex: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default SeatMap;
