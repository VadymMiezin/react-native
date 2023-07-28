import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

import Bg from "../images/bg-image.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const navigation = useNavigation();

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);
      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const keyboardIsHidden = () => {
    Keyboard.dismiss();
  };

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Всі поля мають бути заповнені!");
      return;
    }

    if (!validEmail) {
      Alert.alert("Будь ласка, введіть правильну адресу електронної пошту");
    }

    Alert.alert("Вітаємо!");
    console.log(`email: ${email}, password: ${password}`);
    setEmail("");
    setPassword("");
    Keyboard.dismiss();

    navigation.navigate("Home", { screen: "PostsScreen" });
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.container}>
          <ImageBackground
            style={{
              ...styles.backgroundImg,
              width: phoneWidth,
              height: phoneHeight,
            }}
            source={Bg}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrap,
                  width: phoneWidth,
                }}
              >
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Увійти</Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => setIsFocusEmail(false)}
                    placeholder="Адреса електронної пошти"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    value={password}
                    onChangeText={setPassword}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={onLogin}>
                    <Text style={styles.btnText}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.textLink}>
                      Немає акаунту?
                      <Text
                        style={styles.textLinkUnderline}
                        onPress={() =>
                          navigation.navigate("RegistrationScreen")
                        }
                      >
                        Зареєстуватися
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  containerWrap: {
    flex: 1,
    height: 550,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 400,
  },

  title: {
    marginTop: 35,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },

  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
  },

  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 265,
    paddingRight: 16,
  },

  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  btn: {
    height: 50,
    marginTop: 43,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  btnText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },

  textLink: {
    marginTop: 16,
    marginBottom: 110,
    textAlign: "center",
    color: "#1B4371",
  },

  textLinkUnderline: {
    textDecorationLine: "underline",
  },
});
