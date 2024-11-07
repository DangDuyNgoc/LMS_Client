import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CoursesType[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadCartData  = async () => {
      const cart: any = await AsyncStorage.getItem("cart");
      setCartItems(cart ? JSON.parse(cart) : []);
    };
    loadCartData ();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const cart: any = await AsyncStorage.getItem("cart");
    setCartItems(cart ? JSON.parse(cart) : []);
    setRefreshing(false);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };

  const handleCourseDetails = (courseDetails: any) => {
    router.push({
      pathname: "/(routes)/course-details",
      params: { item: JSON.stringify(courseDetails) },
    });
  };

  const handleRemoveItem = async (item: any) => {
    const existingCartData = await AsyncStorage.getItem("cart");
    const cartData = existingCartData ? JSON.parse(existingCartData) : [];
    const updatedCartData = cartData.filter((i: any) => i._id !== item._id);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCartData));
    setCartItems(updatedCartData);
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      {orderSuccess ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("@/assets/images/account_confirmation.png")}
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
              marginBottom: 20,
            }}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <TouchableOpacity onPress={() => handleCourseDetails(item)}>
                  <Image
                    source={{ uri: item.thumbnail.url! }}
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 16,
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <TouchableOpacity onPress={() => handleCourseDetails(item)}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        fontFamily: "Nunito_700Bold",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 16,
                        }}
                      >
                        <Entypo name="dot-single" size={24} color={"gray"} />
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#808080",
                            fontFamily: "Nunito_400Regular",
                          }}
                        >
                          {item.level}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 16,
                        }}
                      >
                        <FontAwesome
                          name="dollar"
                          size={14}
                          color={"#808080"}
                        />
                        <Text
                          style={{
                            marginLeft: 3,
                            fontSize: 16,
                            color: "#808080",
                          }}
                        >
                          {item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FF6347",
                      borderRadius: 5,
                      padding: 5,
                      marginTop: 10,
                      width: 100,
                      alignSelf: "flex-start",
                    }}
                    onPress={() => handleRemoveItem(item)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: "Nunito_600SemiBold",
                      }}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Image
                  source={require("@/assets/images/empty_cart.png")}
                  style={{ width: 200, height: 200, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    marginTop: 20,
                    color: "#333",
                    fontFamily: "Raleway_600SemiBold",
                  }}
                >
                  Your cart is empty!
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View style={{ marginBottom: 25 }}>
            {cartItems?.length === 0 ||
              (cartItems?.length > 0 && (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 20,
                    fontFamily: "Nunito_700Bold",
                  }}
                >
                  Total Price: ${calculateTotalPrice()}
                </Text>
              ))}
            {cartItems?.length === 0 ||
              (cartItems?.length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center",
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    Go for payment
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </>
      )}
    </LinearGradient>
  );
}