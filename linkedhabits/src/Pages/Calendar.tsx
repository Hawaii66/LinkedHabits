import React from "react";
import FText from "../Components/Utils/FText";
import { SafeAreaView, View } from "react-native";
import {
  CalendarProvider,
  TimelineList,
  WeekCalendar,
} from "react-native-calendars";
import HeaderInfo from "../Components/HeaderInfo";

function Calendar() {
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
          title="Calendar"
          description="Add a timed habit to show it in the calendar"
        />
        <View style={{ width: "100%", flexGrow: 1 }}>
          <CalendarProvider date="2023-07-23">
            <WeekCalendar
              firstDay={1}
              markedDates={{
                "2023-07-23": {
                  marked: true,
                },
                "2023-07-22": {
                  marked: true,
                },
              }}
              onPress={(e) => console.log(e)}
            />
            <View style={{ flex: 1 }}>
              <TimelineList
                events={{
                  "2023-07-23": [
                    {
                      start: "2023-07-23 06:30",
                      end: "2023-07-23 07:30",
                      title: "What",
                    },
                  ],
                  "2023-07-22": [
                    {
                      start: "2023-07-22 06:50",
                      end: "2023-07-22 12:30",
                      title: "Something weird",
                    },
                  ],
                }}
                timelineProps={{
                  format24h: true,
                }}
                showNowIndicator
                scrollToFirst={true}
              />
            </View>
          </CalendarProvider>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Calendar;
