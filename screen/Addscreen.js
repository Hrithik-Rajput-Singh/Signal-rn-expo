import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFirestore } from "react-redux-firebase";

const Addscreen = ({ navigation }) => {
  const firestore = useFirestore();
  const [input, setinput] = useState("");

  const handleChatPress = async () => {
    await firestore
      .collection("project")
      .add({ chatName: input })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Add Name for Chat"
        autoFocus
        type=""
        value={input}
        onChangeText={(text) => setinput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />

      <Button disabled={!input} title="Enter chat" onPress={handleChatPress} />
    </View>
  );
};

export default Addscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    height: "100%",
  },
});
