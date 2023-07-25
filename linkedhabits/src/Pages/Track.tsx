import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import HeaderInfo from "../Components/HeaderInfo";
import { Calendar, DateData } from "react-native-calendars";
import FText from "../Components/Utils/FText";

const completed: { color: string; count: number; date: string }[] = [
  {
    color: "#F4D160",
    count: 3,
    date: "2023-07-20",
  },
  {
    color: "#00DFA2",
    count: 6,
    date: "2023-07-21",
  },
  {
    color: "#E76161",
    count: 1,
    date: "2023-07-16",
  },
];

const GetInfo = (date: string | undefined) => {
  const hasSpecial = completed.find((i) => i.date === date);

  return {
    color: hasSpecial ? hasSpecial.color : "#fff",
    text: hasSpecial ? hasSpecial.count.toString() : "",
  };
};

function Track() {
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
            dayComponent={({ date, state, marking }) => (
              <TouchableOpacity
                onPress={() => console.log("Day pressed: ", date, marking)}
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
                    borderWidth: state === "today" ? 1.5 : 1,
                    borderColor: state === "disabled" ? "#9BABB8" : "#000000",
                  }}
                >
                  <FText style={{ fontFamily: "600" }}>
                    {GetInfo(date?.dateString).text}
                  </FText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Track;
