import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import SearchInput from "@/components/search/search.input";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 50 }}
    > 
      <SearchInput />
      <ScrollView></ScrollView>
      <Header />
    </LinearGradient>
  );
}
