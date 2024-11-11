import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { widthPercentageToDP } from "react-native-responsive-screen";

import Loader from "@/components/loader/loader";
import useUser from "@/hook/auth/useUser";
import { SERVER_URI } from "@/utils/uri";
import QuestionsCard from "@/components/cards/question.card";
import { Toast } from "react-native-toast-notifications";

export default function CourseAccessScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { courseData } = useLocalSearchParams();
  const { user, loading } = useUser();
  const data: CoursesType = JSON.parse(courseData as string);
  const [courseContentData, setCourseContentData] = useState<CourseDataType[]>(
    []
  );
  const [activeVideoData, setActiveVideoData] = useState(0);
  const [activeButton, setActiveButton] = useState("About");
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const subscription = async () => {
      await fetchCourseContent();
    };
    subscription();
  });

  const fetchCourseContent = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    try {
      const res: any = axios.get(
        `${SERVER_URI}/course/get-course-content/${data?._id}`,
        {
          headers: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        }
      );

      setIsLoading(false);
      setCourseContentData(res.data.content);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      router.push("/(routes)/course-details");
    }
  };

  const handleQuestionSubmit = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    try {
      const res: any = axios.post(
        `${SERVER_URI}/course/add-question`,
        {
          question,
          courseId: data?._id,
          courseContentId: courseContentData[activeVideoData]?._id,
        },
        {
          headers: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        }
      );
      setQuestion("");
      Toast.show("Question created successfully!", {
        placement: "top",
        type: "success",
      });
      fetchCourseContent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1, padding: 10 }}>
          <View>
            <WebView
              source={{ uri: courseContentData[activeVideoData]?.videoUrl }}
              allowsFullscreenVideo={true}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={activeVideoData === 0}
              onPress={() => setActiveVideoData(activeVideoData - 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveVideoData(activeVideoData + 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {activeVideoData + 1}.{courseContentData[activeVideoData]?.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 25,
              marginHorizontal: 10,
              backgroundColor: "#E1E9F8",
              borderRadius: 50,
              gap: 10,
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
                  activeButton === "Q&A" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Q&A" ? 50 : 0,
              }}
              onPress={() => setActiveButton("Q&A")}
            >
              <Text
                style={{
                  color: activeButton === "Q&A" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Q&A
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
                  color: activeButton === "Reviews" ? "#fff" : "#000",
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
                  ? data?.description
                  : data?.description.slice(0, 302)}
              </Text>
              {data?.description.length > 302 && (
                <TouchableOpacity
                  style={{ marginTop: 4 }}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  {isExpanded ? "-" : "+"}
                </TouchableOpacity>
              )}
            </View>
          )}

          {activeButton === "Q&A" && (
            <View style={{ flex: 1, margin: 15 }}>
              <View>
                <TextInput
                  value={question}
                  onChangeText={setQuestion}
                  style={{
                    marginVertical: 20,
                    flex: 1,
                    textAlignVertical: "top",
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 100,
                    padding: 10,
                  }}
                  multiline={true}
                  placeholder="Enter your question....."
                >
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity
                      style={[styles.button]}
                      disabled={question === ""}
                      onPress={() => handleQuestionSubmit()}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TextInput>
              </View>
              <View style={{ marginBottom: 20 }}>
                {courseContentData[activeVideoData]?.questions
                  ?.slice()
                  .reverse()
                  .map((item: CommentType, index: number) => (
                    <QuestionsCard
                      item={item}
                      key={index}
                      fetchCourseContent={fetchCourseContent}
                      courseData={data}
                      contentId={courseContentData[activeVideoData]._id}
                    />
                  ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToDP("35%"),
    height: 40,
    backgroundColor: "#2467EC",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
