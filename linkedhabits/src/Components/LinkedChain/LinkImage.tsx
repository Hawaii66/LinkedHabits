import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";

interface Props {
  image: string;
}

function LinkImage({ image }: Props) {
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [size, setSize] = useState({ width: -1, height: -1 });
  const ref = useRef<Image | null>(null);

  useEffect(() => {
    Image.getSize(image, (w, h) => {
      setImageSize({
        width: w,
        height: h,
      });
    });
  }, []);

  return (
    <Image
      onLayout={(e) =>
        setSize({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        })
      }
      ref={ref}
      source={{
        uri: image,
      }}
      style={{
        width: size.width === -1 ? "100%" : size.width,
        borderRadius: 10,
        aspectRatio: imageSize.width / imageSize.height,
      }}
    />
  );
}

export default LinkImage;
