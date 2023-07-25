import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View, ScrollView } from "react-native";
import HeaderInfo from "../Components/HeaderInfo";
import { Calendar } from "react-native-calendars";
import FText from "../Components/Utils/FText";
import { isBefore, isToday } from "date-fns";
import { GetMockData } from "../Functions/MockData";

const completed: TrackedHabit[] = [
  {
    completed: GetMockData(),
    date: "2023-07-20",
  },
  {
    completed: GetMockData().slice(0, 2),
    date: "2023-07-21",
  },
  {
    completed: GetMockData().slice(0, 1),
    date: "2023-07-16",
  },
];

const CountToColor = (count: number) => {
  if (count === 0) {
    return "#fff";
  }
  if (count === 1) {
    return "#E76161";
  }
  if (count === 2) {
    return "#F4D160";
  }

  return "#00DFA2";
};

const GetInfo = (date: string | undefined) => {
  const hasSpecial = completed.find((i) => i.date === date);

  const text = hasSpecial
    ? hasSpecial.completed.length.toString()
    : isBefore(new Date(date || ""), new Date())
    ? isToday(new Date(date || ""))
      ? ""
      : "-"
    : "";

  return {
    color: hasSpecial ? CountToColor(hasSpecial.completed.length) : "",
    text: text,
  };
};

function Track() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedTrackedTime = completed.find((i) => i.date === selected);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <HeaderInfo
          title="Track"
          description="See how many habits you have completed"
        />
        <View style={{ width: "90%", flex: 1 }}>
          <Calendar
            enableSwipeMonths
            firstDay={1}
            showWeekNumbers
            dayComponent={({ date, state }) => (
              <TouchableOpacity
                disabled={
                  completed.find((i) => i.date === date?.dateString) ===
                  undefined
                }
                onPress={() => setSelected(date?.dateString || null)}
              >
                <View
                  style={{
                    width: "60%",
                    aspectRatio: 1,
                    borderRadius: 999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: GetInfo(date?.dateString).color,
                    borderWidth: state === "today" ? 2 : 1,
                    borderColor:
                      state === "today"
                        ? "#3333ff"
                        : state === "disabled"
                        ? "#9BABB8"
                        : "#000000",
                  }}
                >
                  <FText style={{ fontFamily: "600" }}>
                    {GetInfo(date?.dateString).text}
                  </FText>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={{ flex: 1, margin: 5 }}>
            {selected !== null && (
              <>
                <FText
                  style={{
                    fontFamily: "800",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {selectedTrackedTime?.date}
                </FText>
                <ScrollView>
                  {selectedTrackedTime?.completed.map((tracked) => (
                    <View style={{ marginVertical: 4 }}>
                      <FText style={{ fontFamily: "600", fontSize: 20 }}>
                        • {tracked.name}
                      </FText>
                      <FText
                        style={{
                          fontFamily: "600",
                          fontSize: 18,
                          paddingLeft: 20,
                        }}
                      >
                        Trigger: {tracked.trigger.name}
                      </FText>
                      <FText
                        style={{
                          fontFamily: "600",
                          fontSize: 18,
                          paddingLeft: 20,
                        }}
                      >
                        Längd: {tracked.habits.length}
                      </FText>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Track;
