import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useFirestore } from "react-redux-firebase";

const CustomList = ({ id, chatname, enterChat, photo }) => {
  const firestore = useFirestore();
  const [chat, setchat] = useState([]);

  //these here is working we say here if chat is there and also if it's 0 (means 1) then show there message
  //  let dp = chat?.[0]?.message
  //  console.log(dp);   it work

  useEffect(() => {
    const unsubscribe = firestore
      .collection("project")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchat(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, [setchat]);

  const uril = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS96_vETK55r95MRsFeB2f7T3S6W6UCsElsdeeOwljS2Ugdwyfo8w4FLzrmFF6VpdkUk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ16snWZu9Bn5QcCYYnTl8MM5MippWxrGjpAYfqCfZ5A&s",
    "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
  ];

  const randomDp = Math.floor(Math.random() * uril.length);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatname)}>
      <Avatar rounded source={{ uri: uril[randomDp] }} />
      <ListItem.Content>
        <ListItem.Title>{chatname}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chat?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomList;

const styles = StyleSheet.create({});
