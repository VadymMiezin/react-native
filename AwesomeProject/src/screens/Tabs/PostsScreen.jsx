import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  getUserAvatar,
  getUserEmail,
  getUserName,
} from "../../redux/auth/authSelectors";
import PostItem from "../../components/Posts/PostItem";

export default function PostsScreen() {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const avatar = useSelector(getUserAvatar);
  const [serverPosts, setServerPosts] = useState([]);

  useEffect(() => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (data) => {
      const dbPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedDbPosts = dbPosts.sort((a, b) => a.createdAt - b.createdAt);
      setServerPosts(sortedDbPosts);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: avatar }}
            alt="User photo"
          />
          <View style={styles.userData}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <FlatList
          data={serverPosts}
          renderItem={({ item }) => (
            <PostItem
              key={item.id}
              id={item.id}
              title={item.title}
              photoLocation={item.photoLocation}
              url={item.photo}
              geoLocation={item.geoLocation}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 45,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    minHeight: Dimensions.get("window").height - 150,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 11,
  },
  postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});
