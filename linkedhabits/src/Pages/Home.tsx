import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { GetMockData } from "../Functions/MockData";
import { Button, Card, TextInput } from "react-native-paper";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import Preview from "../Components/LinkedChain/Preview";
import LinkedChain from "./LinkedChain";
import HeaderInfo from "../Components/HeaderInfo";
import Create from "./Create";

function Home() {
  const [links, setLinks] = useState(GetMockData());
  const [searchQuery, setSearchQuery] = useState("");
  const [link, setLink] = useState<LinkedHabit | null>(null);
  const [edit, setEdit] = useState<LinkedHabit | null>(null);

  const goToLink = (link: LinkedHabit) => {
    setLink(link);
    setSearchQuery("");
  };

  if (edit) {
    return <Create initalHabit={edit} />;
  }

  if (link) {
    return <LinkedChain onBack={() => setLink(null)} link={link} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeaderInfo
          title="Home"
          description="Complete and manager your linked habits"
        />
        <View
          style={{
            width: "90%",
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 10,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 12,
            }}
          >
            {links
              .filter((link) =>
                link.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((link) => (
                <Preview
                  key={link.name}
                  link={link}
                  onClick={() => goToLink(link)}
                  onEdit={() => {}}
                />
              ))}
            <Card
              style={{
                width: "80%",
                paddingVertical: 10,
                gap: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{ width: "40%" }}
                icon="plus"
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="elevated"
                onPress={() =>
                  setEdit({
                    durationSeconds: 5 * 60,
                    habits: [
                      {
                        name: "Clean bedroom",
                      },
                    ],
                    name: "habit name",
                    trigger: {
                      type: "Spot",
                      name: "",
                      description: "",
                    },
                    reward: {
                      name: "reward",
                      description: "",
                    },
                  })
                }
              >
                Create
              </Button>
            </Card>
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={{ width: "100%" }}
        >
          <TextInput
            label={"Search"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            right={
              <TextInput.Icon
                icon={() => (
                  <SearchIcon
                    style={{
                      transform: [
                        {
                          scale: 2.5,
                        },
                      ],
                    }}
                    name="search"
                  />
                )}
              />
            }
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

export default Home;
