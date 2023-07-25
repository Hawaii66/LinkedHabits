import React from "react";
import FText from "../Utils/FText";
import { Button, Card, IconButton } from "react-native-paper";
import { format } from "date-fns";
import { GetNextDay } from "../../Functions/Days";
import { TouchableOpacity, View } from "react-native";

interface Props {
  link: LinkedHabit;
  onClick: () => void;
  onEdit: () => void;
}

function Preview({ link, onClick, onEdit }: Props) {
  const triggerHeader = () => {
    if (link.trigger.type === "Spot") {
      return link.trigger.name;
    }

    link.trigger.days?.filter(
      (i) => format(new Date(), "i") === (i + 1).toString()
    ).length === 1;

    return GetNextDay(link.trigger.days);
  };

  const triggerSubHeader = () => {
    if (link.trigger.type === "Spot") {
      return link.trigger.description;
    }

    const hour = Math.floor(link.trigger.time / 60);
    const minute = link.trigger.time - hour * 60;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card style={{ width: "100%" }}>
      <TouchableOpacity onPress={onClick} style={{ paddingVertical: 5 }}>
        <Card.Content
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Card.Content>
            <FText style={{ fontFamily: "800", color: "#000", fontSize: 24 }}>
              {link.name}
            </FText>
            {link.reward && (
              <FText style={{ fontFamily: "500", color: "#222", fontSize: 16 }}>
                Reward: {link.reward.name}
              </FText>
            )}
          </Card.Content>
          <Card.Content>
            <FText
              style={{
                fontFamily: "500",
                textAlign: "right",
                color: "#000",
                fontSize: 20,
              }}
            >
              {triggerHeader()}
            </FText>
            <FText
              style={{
                fontFamily: "500",
                textAlign: "right",
                color: "#222",
                fontSize: 16,
              }}
            >
              {triggerSubHeader()}
            </FText>
          </Card.Content>
        </Card.Content>
        <Card.Actions>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton icon={"file-edit"} onPress={onEdit} />
            <Button
              icon="arrow-right"
              contentStyle={{ flexDirection: "row-reverse" }}
              mode="elevated"
              onPress={onClick}
            >
              Start
            </Button>
          </View>
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
}

export default Preview;
