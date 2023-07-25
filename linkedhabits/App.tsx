import { Dimensions, View } from "react-native";
import FontWrapper from "./src/Components/Wrappers/FontWrapper";
import { useState } from "react";
import Navigation from "./src/Pages/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [loadingFonts, setLoadingFonts] = useState(true);

  const loading = loadingFonts;

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <NavigationContainer>
        <SafeAreaProvider>
          <FontWrapper setLoadingFonts={setLoadingFonts}>
            {loading ? <View></View> : <Navigation />}
          </FontWrapper>
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}
