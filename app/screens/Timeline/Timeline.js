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
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
  Header,
  RevDoneTimelineComp,
  RevViolateTimelineComp,
  BarTimelineComp,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Timeline = () => {
  //violation types:
  //1: Failure to check-in at a library seat within the prescribed reservation time limit.
  //2: Failure to return to a library seat within the prescribed break time limit.
  //3: Did not select a break option or tap on the seat withdrawal button when leaving a reserved library seat.

  const timelineData = [
    {
      id: 1,
      type: 2,
      timeStart: "08:30",
      timeEnd: "10:20",
      date: "2 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/2/23 10:20",
    },
    {
      id: 2,
      type: 2,
      timeStart: "10:30",
      timeEnd: "16:34",
      date: "3 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/3/23 16:34",
    },
    {
      id: 3,
      type: 1,
      violationType: 1,
      time: "13:49",
      date: "5 May 2023",
      dateTime: "5/5/23 13:49",
    },
    {
      id: 4,
      type: 2,
      timeStart: "14:01",
      timeEnd: "15:23",
      date: "5 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/5/23 15:23",
    },
    {
      id: 5,
      type: 2,
      timeStart: "05:49",
      timeEnd: "08:14",
      date: "10 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/10/23 08:14",
    },
    {
      id: 6,
      type: 1,
      violationType: 2,
      time: "12:13",
      date: "13 May 2023",
      dateTime: "5/13/23 12:13",
    },
    {
      id: 7,
      type: 2,
      timeStart: "08:50",
      timeEnd: "12:13",
      date: "13 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/13/23 12:13",
    },
    {
      id: 8,
      type: 1,
      violationType: 3,
      time: "17:25",
      date: "17 May 2023",
      dateTime: "5/17/23 17:25",
    },
    {
      id: 9,
      type: 2,
      timeStart: "07:39",
      timeEnd: "17:25",
      date: "17 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/17/23 17:25",
    },
    {
      id: 10,
      type: 2,
      timeStart: "08:30",
      timeEnd: "11:30",
      date: "29 May 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "5/29/23 11:30",
    },
    {
      id: 11,
      type: 2,
      timeStart: "09:30",
      timeEnd: "15:14",
      date: "2 June 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "6/2/23 15:14",
    },
    {
      id: 12,
      type: 1,
      violationType: 1,
      time: "10:12",
      date: "3 June 2023",
      dateTime: "6/3/23 10:12",
    },
    {
      id: 13,
      type: 2,
      timeStart: "16:00",
      timeEnd: "22:50",
      date: "7 June 2023",
      venue: "Peking Library",
      seat: "PL-D350",
      dateTime: "6/7/23 22:50",
    },
    {
      id: 14,
      type: 1,
      violationType: 1,
      time: "08:44",
      date: "13 June 2023",
      dateTime: "6/13/23 08:44",
    },
  ];

  //states
  const [timeline, setTimeline] = React.useState(timelineData);

  //supporting funcs
  const renderStudySession = (item) => {
    return (
      <>
        <BarTimelineComp
          icon={icons.mortarboard}
          barColor={COLORS.Ftimeline_pillarstudysession}
          circleBgColor={COLORS.Ftimeline_pillarcirclestudybg}
          height={240} // 240 for study session, 80 for violation record.
        />
        <RevDoneTimelineComp
          date={item.date}
          timeStart={item.timeStart}
          timeEnd={item.timeEnd}
          libraryName={item.venue}
          seatNum={item.seat}
        />
      </>
    );
  };

  const renderViolation = (item) => {
    return (
      <>
        <BarTimelineComp
          icon={icons.card2}
          barColor={COLORS.Ftimeline_pillarviolate}
          circleBgColor={COLORS.Ftimeline_pillarcircleviolatebg}
          height={80} // 240 for study session, 80 for violation record.
        />
        <RevViolateTimelineComp
          time={item.time}
          date={item.date}
          violation={item.violationType}
        />
      </>
    );
  };

  function renderTimeline() {
    const renderItem = ({ item }) => (
      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {item.type == 1 ? renderViolation(item) : renderStudySession(item)}
      </View>
    );

    return (
      <FlatList
        data={timeline.reverse()}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ marginTop: 30 }}></View>}
      />
    );
  }

  return (
    <>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={COLORS.Ftimeline_header}
      />
      <Header backgroundColor={COLORS.Ftimeline_header} />

      <View style={styles.container}>{renderTimeline()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Ftimeline_background,
    flex: 1,
  },
});

export default Timeline;
