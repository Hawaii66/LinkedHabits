import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import HeaderInfo from "../Components/HeaderInfo";
import {
  Card,
  Divider,
  IconButton,
  SegmentedButtons,
  TextInput,
  Button,
  Switch,
} from "react-native-paper";
import FText from "../Components/Utils/FText";
import SegmentedOptions from "../Components/SegmentedOptions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addMinutes } from "date-fns";

interface Props {
  initalHabit: LinkedHabit;
}

function Create({ initalHabit }: Props) {
  const [habit, setHabit] = useState(initalHabit);

  const setTriggerType = (type: Trigger["type"]) => {
    if (type === "Spot") {
      setHabit({
        ...habit,
        trigger: {
          type: "Spot",
          name: "",
          description: "",
        },
      });
    }
    if (type === "Time") {
      setHabit({
        ...habit,
        trigger: {
          type: "Time",
          days: [],
          name: "",
          time: 0,
        },
      });
    }
  };

  const changeTriggerDescription = (description: string) => {
    if (habit.trigger.type === "Spot") {
      setHabit({
        ...habit,
        trigger: {
          ...habit.trigger,
          description: description,
        },
      });
    }
  };

  const changeTriggerDays = (days: number[]) => {
    if (habit.trigger.type === "Time") {
      setHabit({
        ...habit,
        trigger: {
          ...habit.trigger,
          days: days,
        },
      });
    }
  };

  const changeTriggerTime = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    if (habit.trigger.type === "Time") {
      setHabit({
        ...habit,
        trigger: { ...habit.trigger, time: hours * 60 + minutes },
      });
    }
  };

  const addHabit = () => {
    setHabit({
      ...habit,
      habits: [
        ...habit.habits,
        {
          name: "",
          description: "",
          image: "",
        },
      ],
    });
  };

  function array_move<T>(arr: T[], old_index: number, new_index: number) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  }

  const changeHabitName = (index: number, name: string) => {
    const old = [...habit.habits];
    old[index].name = name;
    setHabit({ ...habit, habits: old });
  };

  const changeHabitDescription = (index: number, name: string) => {
    const old = [...habit.habits];
    old[index].description = name;
    setHabit({ ...habit, habits: old });
  };

  const moveHabitUp = (index: number) => {
    const old = [...habit.habits];
    array_move(old, index, index - 1);
    setHabit({ ...habit, habits: old });
  };

  const moveHabitDown = (index: number) => {
    const old = [...habit.habits];
    array_move(old, index, index + 1);
    setHabit({ ...habit, habits: old });
  };

  const deleteHabit = (index: number) => {
    const old = [...habit.habits];
    old.splice(index, 1);
    setHabit({ ...habit, habits: old });
  };

  const changeRewardName = (name: string) => {
    setHabit({
      ...habit,
      reward: {
        ...habit.reward,
        name: name,
      },
    });
  };

  const changeRewardDescription = (description: string) => {
    setHabit({
      ...habit,
      reward: habit.reward && {
        ...habit.reward,
        description: description,
      },
    });
  };

  const changeRewardToggle = (state: boolean) => {
    if (state) {
      setHabit({
        ...habit,
        reward: {
          name: "",
          description: "",
        },
      });
    } else {
      setHabit({ ...habit, reward: undefined });
    }
  };

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
        <HeaderInfo title="Create" description="Create a new linked habit" />
        <FlatList
          renderItem={() => <></>}
          data={[]}
          contentContainerStyle={{
            gap: 16,
          }}
          ListEmptyComponent={
            <>
              <Card style={{ minWidth: "90%" }}>
                <Card.Content>
                  <FText
                    style={{
                      fontFamily: "800",
                      marginTop: 10,
                      fontSize: 24,
                    }}
                  >
                    Information
                  </FText>
                  <TextInput
                    label={"Name"}
                    value={habit.name}
                    onChangeText={(e) =>
                      setHabit({
                        ...habit,
                        name: e,
                      })
                    }
                  />
                  <TextInput
                    keyboardType="number-pad"
                    label={"Estimated Time (minutes)"}
                    value={
                      habit.durationSeconds === 0
                        ? ""
                        : habit.durationSeconds.toString()
                    }
                    onChangeText={(e) =>
                      setHabit({
                        ...habit,
                        durationSeconds:
                          e === "" ? 0 : parseInt(e.replaceAll(",", ".")),
                      })
                    }
                  />
                </Card.Content>
              </Card>
              <Card style={{ minWidth: "90%" }}>
                <Card.Content>
                  <FText
                    style={{
                      fontFamily: "800",
                      marginTop: 10,
                      fontSize: 24,
                    }}
                  >
                    Trigger
                  </FText>
                  <SegmentedButtons
                    value={habit.trigger.type}
                    onValueChange={(e) => setTriggerType(e as Trigger["type"])}
                    buttons={[
                      {
                        value: "Time",
                        label: "Time of day",
                      },
                      {
                        value: "Spot",
                        label: "Place",
                      },
                    ]}
                  />
                  <Divider style={{ marginVertical: 5 }} />

                  {habit.trigger.type === "Spot" && (
                    <>
                      <TextInput
                        label={"Place"}
                        value={habit.trigger.name}
                        onChangeText={(e) =>
                          setHabit({
                            ...habit,
                            trigger: { ...habit.trigger, name: e },
                          })
                        }
                      />
                      <TextInput
                        label={"Description"}
                        value={habit.trigger.description}
                        onChangeText={changeTriggerDescription}
                      />
                    </>
                  )}
                  {habit.trigger.type === "Time" && (
                    <>
                      <TextInput
                        label={"Name"}
                        value={habit.trigger.name}
                        onChangeText={(e) =>
                          setHabit({
                            ...habit,
                            trigger: { ...habit.trigger, name: e },
                          })
                        }
                      />
                      <FText
                        style={{
                          fontFamily: "800",
                          marginTop: 10,
                          fontSize: 24,
                        }}
                      >
                        Active days
                      </FText>
                      <SegmentedOptions
                        columns={3}
                        onChange={changeTriggerDays}
                        seleced={habit.trigger.days}
                        values={[
                          {
                            label: "Mon",
                            value: 0,
                          },
                          {
                            label: "Tue",
                            value: 1,
                          },
                          {
                            label: "Wed",
                            value: 2,
                          },
                          {
                            label: "Thu",
                            value: 3,
                          },
                          {
                            label: "Fri",
                            value: 4,
                          },
                          {
                            label: "Sat",
                            value: 5,
                          },
                          {
                            label: "Sun",
                            value: 6,
                          },
                        ]}
                      />
                      <FText
                        style={{
                          fontFamily: "800",
                          marginTop: 10,
                          fontSize: 24,
                        }}
                      >
                        Time of day
                      </FText>
                      <DateTimePicker
                        mode="time"
                        display="spinner"
                        locale="SE-se"
                        is24Hour
                        value={addMinutes(new Date(0), habit.trigger.time - 60)}
                        onChange={(e) =>
                          changeTriggerTime(
                            new Date(e.nativeEvent.timestamp || 0)
                          )
                        }
                        minuteInterval={5}
                      />
                    </>
                  )}
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <FText
                    style={{
                      fontFamily: "800",
                      marginTop: 10,
                      fontSize: 24,
                    }}
                  >
                    Linked Habits
                  </FText>
                  {habit.habits.map((linked, idx) => (
                    <Card key={idx} style={{ marginVertical: 4 }}>
                      <Card.Content>
                        <TextInput
                          label={"Name"}
                          value={linked.name}
                          onChangeText={(e) => changeHabitName(idx, e)}
                        />
                        <TextInput
                          label={"Description"}
                          value={linked.description}
                          onChangeText={(e) => changeHabitDescription(idx, e)}
                        />
                      </Card.Content>
                      <Card.Actions>
                        {idx !== 0 && (
                          <IconButton
                            onPress={() => moveHabitUp(idx)}
                            mode="contained"
                            icon={"arrow-up"}
                          />
                        )}
                        {idx !== habit.habits.length - 1 && (
                          <IconButton
                            onPress={() => moveHabitDown(idx)}
                            mode="contained"
                            icon={"arrow-down"}
                          />
                        )}
                        <IconButton
                          onPress={() => deleteHabit(idx)}
                          mode="contained"
                          icon={"delete"}
                        />
                      </Card.Actions>
                    </Card>
                  ))}
                  <Card
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      gap: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Button
                      style={{ width: "40%" }}
                      icon="plus"
                      contentStyle={{ flexDirection: "row-reverse" }}
                      mode="elevated"
                      onPress={addHabit}
                    >
                      Add habit
                    </Button>
                  </Card>
                </Card.Content>
              </Card>
              <Card style={{ marginVertical: 4 }}>
                <Card.Content>
                  <FText
                    style={{
                      fontFamily: "800",
                      marginTop: 10,
                      fontSize: 24,
                    }}
                  >
                    Reward
                  </FText>
                  <Switch
                    style={{ marginBottom: 4 }}
                    value={habit.reward ? true : false}
                    onChange={() =>
                      changeRewardToggle(!(habit.reward ? true : false))
                    }
                  />
                  {habit.reward && (
                    <>
                      <TextInput
                        label={"Reward"}
                        value={habit.reward?.name}
                        onChangeText={(e) => changeRewardName(e)}
                      />
                      <TextInput
                        label={"Description"}
                        value={habit.reward?.description}
                        onChangeText={(e) => changeRewardDescription(e)}
                      />
                    </>
                  )}
                </Card.Content>
              </Card>
              <Card
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  gap: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Button
                  style={{ width: "40%" }}
                  icon="plus"
                  contentStyle={{ flexDirection: "row-reverse" }}
                  mode="elevated"
                >
                  Create
                </Button>
              </Card>
              <View style={{ height: 300 }} />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default Create;
