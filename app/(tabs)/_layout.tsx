import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "index") {
            iconName = require("@/assets/icons/HouseSimple.png");
          } else if (route.name === "search") {
            iconName = require("@/assets/icons/search.png");
          } else if (route.name === "courses") {
            iconName = require("@/assets/icons/BookBookmark.png");
          } else if (route.name === "profile") {
            iconName = require("@/assets/icons/User.png");
          }
          return (
            <Image
              style={{ width: 25, height: 25, tintColor: color }}
              source={iconName}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}