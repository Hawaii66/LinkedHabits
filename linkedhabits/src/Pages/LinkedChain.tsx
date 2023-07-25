import React, { useEffect, useRef, useState } from "react";
import FText from "../Components/Utils/FText";
import {
  Animated,
  Easing,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { CARD_GAP } from "../Functions/LinkedHabit";
import LinkedHabits from "../Components/LinkedChain/LinkedHabits";

interface Props {
  link: LinkedHabit;
  onBack: () => void;
}

function LinkedChain({ link, onBack }: Props) {
  const [cardHeight, setCardHeight] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [workingOn, setWorkingOn] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<FlatList | null>(null);

  const onClickHabit = (clickedIndex: number) => {
    if (clickedIndex < workingOn) {
      setWorkingOn(clickedIndex);
      setCurrent(clickedIndex - 1);
      scrollRef.current?.scrollToIndex({
        index: clickedIndex,
        animated: true,
        viewPosition: 0.5,
      });
      return;
    }

    if (workingOn === -1) {
      setWorkingOn(0);
      return;
    }

    setCurrent(workingOn);
    setWorkingOn((w) => (w + 1 < link.habits.length ? w + 1 : w));

    if (workingOn + 1 <= link.habits.length) {
      scrollRef.current?.scrollToIndex({
        index: workingOn + 1,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: ((current + 1) / link.habits.length) * 100,
      useNativeDriver: false,
      delay: 0,
      duration: 300,
      easing: Easing.bounce,
    }).start();
  }, [current]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <IconButton
            onPress={onBack}
            size={16}
            mode="contained"
            icon="arrow-left"
          />
        </View>
        <View style={{ width: "90%", paddingBottom: 10, paddingTop: 30 }}>
          <View style={{ position: "relative" }}>
            <FText
              style={{
                fontFamily: "800",
                textAlign: "center",
                fontSize: 24,
                color: "#222",
              }}
            >
              {link.name}
            </FText>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 20,
            }}
          >
            <Animated.View
              style={{
                left: 0,
                position: "absolute",
                width: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
                height: 20,
                backgroundColor: "#00ee00",
                borderRadius: 20,
              }}
            />
            <FText style={{ fontFamily: "800" }}>
              {current + 1} / {link.habits.length} completed
            </FText>
          </View>
        </View>

        <View
          style={{
            width: "100%",
          }}
        >
          <FlatList
            ref={scrollRef}
            data={
              [
                ...link.habits.map((i) => ({ type: "habit", item: i })),
                { type: "reward", item: link.reward },
              ].filter((i) => i !== undefined) as
                | (
                    | { type: "habit"; item: Habit }
                    | { type: "reward"; item: Slot }
                  )[]
            }
            contentContainerStyle={{
              width: "100%",
              gap: CARD_GAP,
              paddingTop: 10,
              paddingBottom: 120,
            }}
            renderItem={({ item, index }) => {
              if (item.type === "habit") {
                return (
                  <LinkedHabits
                    cardHeight={cardHeight}
                    current={current}
                    habit={item.item}
                    index={index}
                    link={link}
                    onClick={() => onClickHabit(index)}
                    setCardHeight={setCardHeight}
                    workingOn={workingOn}
                  />
                );
              }

              return (
                <TouchableOpacity
                  onPress={() => onClickHabit(link.habits.length)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40,
                  }}
                >
                  <Card
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 0,
                      padding: 0,
                      zIndex: -1000,
                      shadowColor:
                        current === link.habits.length - 1
                          ? "#00DFA2"
                          : "#00000000",
                      shadowOpacity: 0.8,
                      shadowRadius: 8,
                      width: "80%",
                      paddingVertical: 10,
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
                      {item.item && (
                        <>
                          <FText
                            style={{
                              fontFamily: "900",
                              fontSize: 24,
                              color: "#222",
                            }}
                          >
                            {item.item.name}
                          </FText>
                          <FText
                            style={{
                              fontFamily: "700",
                              fontSize: 16,
                              color: "#222",
                            }}
                          >
                            {item.item.description}
                          </FText>
                        </>
                      )}
                      <Button
                        mode="contained-tonal"
                        buttonColor="#00DFA2"
                        onPress={() => {}}
                        icon={"check"}
                      >
                        <FText style={{ fontFamily: "800" }}>Complete</FText>
                      </Button>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LinkedChain;
