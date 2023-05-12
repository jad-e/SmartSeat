import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

// Constants
import { images, theme } from "../../constants";
const { onboarding1, onboarding2, onboarding3 } = images;

// Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data
const onBoardings = [
  {
    title: "Find a Vacant Seat",
    description:
      "Locate vacant library seats via real-time seat availability information.",
    img: onboarding1,
  },
  {
    title: "Indoor Navigation",
    description:
      "Use the shortest path to navigate to a targeted library seat.",
    img: onboarding2,
  },
  {
    title: "Seat Reservation",
    description: "Reserve a seat for yourself while walking to the library.",
    img: onboarding3,
  },
];

const OnBoarding = () => {
  const [completed, setCompleted] = React.useState(false);

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    //to check if user has finished scrolling the onboarding page
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) => (
          <View
            //center
            //bottom
            key={`img-${index}`}
            style={styles.imageAndTextContainer}
          >
            {/* Image */}
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>

            {/* Description */}
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.gray,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}
              >
                {item.description}
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 130,
                height: 50,
                paddingLeft: 30,
                justifyContent: "center",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#FFDE59",
              }}
              onPress={() => {
                console.warn("Button on pressed");
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                {completed ? "Let's Go" : "Skip"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "17%" : "16%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: "#FFDE59",
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoarding;
