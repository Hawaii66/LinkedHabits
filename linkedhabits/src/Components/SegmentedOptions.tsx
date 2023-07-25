import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import FText from "./Utils/FText";

interface Props {
  values: { label: string; value: number }[];
  seleced: number[];
  onChange: (d: number[]) => void;
  columns: number;
}

function SegmentedOptions({ onChange, seleced, values, columns }: Props) {
  const onPress = (value: number) => {
    if (seleced.includes(value)) {
      onChange(seleced.filter((i) => i !== value));
      return;
    }
    onChange([...seleced, value]);
  };

  return (
    <FlatList
      data={values}
      renderItem={(e) => (
        <TouchableOpacity
          onPress={() => onPress(e.item.value)}
          key={e.item.value}
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: seleced.includes(e.item.value) ? 3 : 4,
            borderRadius: 4,
            margin: 1,
            borderColor: seleced.includes(e.item.value) ? "#00DFA2" : "#222",
            borderWidth: seleced.includes(e.item.value) ? 2 : 1,
          }}
        >
          <FText style={{ fontFamily: "600" }}>{e.item.label}</FText>
        </TouchableOpacity>
      )}
      numColumns={columns}
    />
  );
}

export default SegmentedOptions;
