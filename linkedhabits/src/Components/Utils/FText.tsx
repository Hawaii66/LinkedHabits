import React, { Ref } from "react";
import { StyleProp, TextStyle, Text, LayoutChangeEvent } from "react-native";
import { FontFamily, FontFamilyToFont } from "../Wrappers/FontWrapper";

interface Props {
  children: React.ReactNode;
  style:
    | Omit<StyleProp<TextStyle>, FontFamily>
    | {
        fontFamily: FontFamily;
      };
  ref?: Ref<Text>;
  onLayout?: (e: LayoutChangeEvent) => void;
  numberOfLines?: number;
  getLines?: (lines: number) => void;
}

function FText({
  children,
  style,
  numberOfLines,
  ref,
  onLayout,
  getLines,
}: Props) {
  return (
    <Text
      onTextLayout={(e) =>
        getLines ? getLines(e.nativeEvent.lines.length) : undefined
      }
      onLayout={onLayout}
      ref={ref}
      style={{
        ...style,
        fontFamily: FontFamilyToFont((style as any).fontFamily),
      }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

export default FText;
