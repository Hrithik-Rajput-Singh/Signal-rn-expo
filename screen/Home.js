import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomList from "../component/CustomList";
import { Ionicons } from "@expo/vector-icons";
import { useFirestore } from "react-redux-firebase";

export default function Home({ navigation }) {
  const firestore = useFirestore();

  const [chats, setchats] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("project").onSnapshot((snapshot) =>
      setchats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  const uril = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS96_vETK55r95MRsFeB2f7T3S6W6UCsElsdeeOwljS2Ugdwyfo8w4FLzrmFF6VpdkUk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ16snWZu9Bn5QcCYYnTl8MM5MippWxrGjpAYfqCfZ5A&s",
    "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
  ];

  const randomDp = Math.floor(Math.random() * uril.length);
  console.log("randomdp", randomDp);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={() => {}}>
            <Avatar rounded source={{ uri: uril[randomDp] }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add");
            }}
          >
            <Ionicons
              title="Edit"
              name={Platform.OS === "android" ? "md-pencil" : "ios-pencil"}
              size={27}
              color="brown"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              title="Camera"
              name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
              size={27}
              color="brown"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterchat = (id, chatname) => {
    navigation.navigate("Chat", {
      id,
      chatname,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {chats.map((chat) => (
          <CustomList
            key={chat.id}
            id={chat.id}
            chatname={chat.data.chatName}
            enterChat={enterchat}
            photo={uril[randomDp]}
          />
        ))}
        <CustomList />
      </ScrollView>
    </SafeAreaView>
  );
}
