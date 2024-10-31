import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function CourseDetailsScreen() {
  const { item } = useLocalSearchParams();
  const courseData: CoursesType = JSON.parse(item as string);
  const [activeButton, setActiveButton] = useState("About");
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 15 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16 }}>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "#FFB013",
              borderRadius: 54,
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginTop: 8,
              marginLeft: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Best Seller
            </Text>
          </View>
          <View style={{ position: "absolute", zIndex: 14, right: 0 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#141517",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 3,
                marginTop: 8,
                marginRight: 8,
              }}
            >
              <FontAwesome name="star" size={14} color={"#FFB800"} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 4,
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {courseData?.ratings}
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: courseData?.thumbnail.url }}
            style={{ width: "100%", height: 230, borderRadius: 6 }}
          />
        </View>
        <Text
          style={{
            marginHorizontal: 16,
            marginTop: 15,
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "Raleway_700Bold",
          }}
        >
          {courseData?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 10,
            paddingTop: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#000",
                fontSize: 22,
                marginLeft: 10,
                paddingVertical: 10,
              }}
            >
              {courseData?.price}
            </Text>
            <Text
              style={{
                color: "#808080",
                fontSize: 20,
                marginLeft: 10,
                textDecorationLine: "line-through",
              }}
            >
              {courseData?.estimatedPrice}
            </Text>
          </View>
          <Text style={{ fontSize: 15 }}>{courseData?.purchased} students</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
            marginHorizontal: 16,
            backgroundColor: "#E1E9F8",
            borderRadius: 50,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "About" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "About" ? 50 : 0,
            }}
            onPress={() => setActiveButton("About")}
          >
            <Text
              style={{
                color: activeButton === "About" ? "#fff" : "#000",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "Lesson" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "Lesson" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Lesson")}
          >
            <Text
              style={{
                color: activeButton === "Lesson" ? "#fff" : "#000",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Lesson
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 42,
              backgroundColor:
                activeButton === "Reviews" ? "#2467EC" : "transparent",
              borderRadius: activeButton === "Reviews" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Reviews")}
          >
            <Text
              style={{
                color: activeButton === "Reviews" ? "#fff" : "",
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>
        {activeButton === "About" && (
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 25,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
              About course
            </Text>
            <Text
              style={{
                color: "#525258",
                fontSize: 16,
                marginTop: 10,
                textAlign: "justify",
                fontFamily: "Nunito_500Medium",
              }}
            >
              {isExpanded
                ? courseData?.description
                : courseData?.description.slice(0, 302)}
            </Text>
            {courseData?.description.length > 302 && (
              <TouchableOpacity
                style={{ marginTop: 3 }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Text
                  style={{
                    color: "#2467EC",
                    fontSize: 14,
                  }}
                >
                    {isExpanded ? "Show Less" : "Show More"}
                    {isExpanded ? "-" : "+"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
