import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5, AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

export const BottomMenu = () => {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80, justifyContent: "center" },
        headerTitleAlign: "center",

        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <BottomTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name="grid-outline"
                size={20}
                color={"#212121"}
                strokeOpacity={0.8}
              />
            </View>
          ),
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Feather name="log-out" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <AntDesign
                name="plus"
                size={size}
                color={"#FFFFFF"}
                fillOpacity={0.8}
                fill={"#FFFFFF"}
              />
            </View>
          ),
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <AntDesign name="arrowleft" size={24} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Feather
                name="user"
                size={size}
                color={"#212121"}
                stroke={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
