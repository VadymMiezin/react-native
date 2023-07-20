import React, { useState, useEffect } from "react";
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
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Add from "../images/add.svg";

const RegistrationScreen = () => {
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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

  const [fonts] = useFonts({
    RobotoBold: require("../fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImg}
            source={require("../images/bg-image.png")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.containerWrap,
                  width: phoneWidth,
                  marginTop: phoneWidth > 400 ? 200 : 300,
                }}
              >
                <View
                  style={{
                    ...styles.imageWrap,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addBtn,
                    right: phoneWidth / 2 - 70,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Реєстрація</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusLogin ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusLogin(true)}
                    onBlur={() => setFocusLogin(false)}
                    placeholder="Логін"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    placeholder="Адреса електронної пошти"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    keyboardType="email-address"
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
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Зареєструватися</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.bottomLink}>Вже є акаунт? Увійти</Text>
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

export default RegistrationScreen;

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
    alignItems: "center",
    justifyContent: "flex-end",
    height: 550,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  imageWrap: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 25,
    height: 25,
  },

  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "RobotoMedium",
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
    fontFamily: "RobotoRegular",
    color: "#212121",
  },

  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 253,
    paddingRight: 16,
  },

  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },

  btn: {
    height: 50,
    marginTop: 40,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  btnText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },

  bottomLink: {
    marginTop: 15,
    marginBottom: 100,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },
});