import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/button/button";

export default function VerifyAccountScreen() {
  const [code, setCode] = useState(new Array(4).fill(""));

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text.slice(0, 1);
    setCode(newCode);

    if (code && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }

    if (newCode.every((code) => code === "")) {
      inputs.current[0].current.focus();
    }
  };

  const handleSubmit = async () => {
    router.push("/(routes)/login")
    // const otp = code.join("");
    // const activation_token = await AsyncStorage.getItem("activation_token");

    // await axios.post("http://localhost:8080/active-user", {
    //   activation_token,
    //   activation_code: otp
    // })
    // .then(async (res) => {
    //   setCode(new Array(4).fill(""));
    //   router.push("/(routes)/login")
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Verify Code</Text>
      <Text style={styles.subText}>
        We have sent verification code to your email address
      </Text>
      <View style={styles.inputContainer}>
        {code.map((item, index) => (
          <TextInput
            key={index}
            value={code[index]}
            ref={inputs.current[index]}
            autoFocus={index === 0}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.inputBox}
            onChangeText={(text) => handleInput(text, index)}
          />
        ))}
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Submit" onPress={handleSubmit}></Button>
      </View>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
          Back To?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  inputBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 15,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
  },
  backText: { fontSize: 16 },
});
