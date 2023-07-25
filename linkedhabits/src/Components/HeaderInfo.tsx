import React from "react";
import FText from "./Utils/FText";
import { View } from "react-native";

interface Props {
  title: string;
  description: string;
}

function HeaderInfo({ description, title }: Props) {
  return (
    <View style={{ paddingBottom: 10, width: "90%" }}>
      <FText
        style={{
          fontFamily: "600",
          color: "#222",
          fontSize: 24,
        }}
      >
        {title}
      </FText>
      <FText style={{ fontFamily: "600", color: "#222", fontSize: 16 }}>
        - {description}
      </FText>
    </View>
  );
}

export default HeaderInfo;
