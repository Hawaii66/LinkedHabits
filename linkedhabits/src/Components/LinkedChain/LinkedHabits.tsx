import React, { useEffect, useRef } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import FText from "../Utils/FText";
import LinkImage from "./LinkImage";
import { PositionToColor, CARD_GAP } from "../../Functions/LinkedHabit";

interface Props {
  habit: Habit;
  index: number;
  current: number;
  workingOn: number;
  onClick: () => void;
  link: LinkedHabit;
  setCardHeight: (n: number) => void;
  cardHeight: number;
}

function LinkedHabits({
  link,
  current,
  index,
  workingOn,
  habit,
  onClick,
  setCardHeight,
  cardHeight,
}: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: workingOn === index ? 1 : 0,
      useNativeDriver: false,
      delay: 0,
      duration: 150,
      easing: Easing.circle,
    }).start();
  }, [workingOn]);

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={habit.name}
    >
      <Animated.View
        style={{
          width: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["80%", "90%"],
          }),
        }}
      >
        <Card
          onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0,
            zIndex: -1000,
            shadowColor: PositionToColor(index, current, workingOn),
            shadowOpacity: 0.8,
            shadowRadius: 5,
          }}
        >
          <Card.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {index !== link.habits.length - 1 && (
              <>
                <View
                  style={{
                    position: "absolute",
                    top: cardHeight - 10 - 15 / 2 - 10,
                    width: 5,
                    height: CARD_GAP + 10 + 15 / 2 + 5,
                    backgroundColor: "#444",
                  }}
                />
              </>
            )}
            {index !== 0 && (
              <>
                <View
                  style={{
                    position: "absolute",
                    top: 10 - 15 / 2 - 10,
                    width: 5,
                    height: CARD_GAP + 10 + 15 / 2 + 5,
                    backgroundColor: "#444",
                  }}
                />
              </>
            )}
            <View
              style={{
                width: 15,
                aspectRatio: 1,
                backgroundColor: "#333",
                borderRadius: 999,
                paddingTop: 0,
                marginTop: 0,
              }}
            />
            <View style={{ marginVertical: 20 }}>
              <FText
                style={{
                  fontFamily: "800",
                  fontSize: 24,
                  textAlign: "center",
                }}
              >
                {habit.name}
              </FText>
              {habit.description && (
                <FText
                  style={{
                    fontFamily: "500",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {habit.description}
                </FText>
              )}
              {habit.image && <LinkImage image={habit.image} />}
            </View>
            <View
              style={{
                width: 15,
                aspectRatio: 1,
                backgroundColor: "#333",
                borderRadius: 999,
                paddingTop: 0,
                marginTop: 0,
              }}
            />
          </Card.Content>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default LinkedHabits;
