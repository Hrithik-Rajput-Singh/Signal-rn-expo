import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFirestore } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
// import ChatBot from 'react-native-chatbot';
// import steps from '../component/Steps'

const ChatScreen = ({ navigation, route }) => {
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);

  const sendMessageHandle = () => {
    Keyboard.dismiss();
    firestore
      .collection("project")
      .doc(route.params.id)
      .collection("message")
      .add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        message: input,
        email: auth.email,
        photo: auth.photoURL,
      });
    setinput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = firestore
      .collection("project")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setmessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [setmessages, firestore]);

  useLayoutEffect(() => {
    // in simple word we can say if messages exit (question mark is for that only)then in messages go to data then phoyourl.. questionmark sign is to say maybe it's undefine <Avatar rounded source={{uri: messages[0]?.data.photoUrl || 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>   here it is telling show photo of message whicch is equal to 0
    //so my logic i want to put is if taker message  then only show photoUrl ==if(message.data.email === auth.email && message.data.message > 0)then show image

    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
            }}
          />
          <Text
            style={{
              color: "blue",
              marginTop: 10,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            {route.params.chatname}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <Ionicons
            title="back"
            name="arrow-back-circle-outline"
            size={24}
            color="blue"
          />
        </TouchableOpacity>
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
          <TouchableOpacity>
            <AntDesign title="call" name="phone" size={27} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              title="phone"
              name="videocamera"
              size={27}
              color="blue"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
                   <ChatBot 
                        steps={steps}
                        size={27}
                        color="brown"
                    />
                   </TouchableOpacity> */}
        </View>
      ),
    });
  }, [route, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 16 }}>
              {messages.map((msg) =>
                msg.data.email === auth.email ? (
                  <View key={msg.id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={25}
                      //web style
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      source={{
                        uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
                      }}
                    />
                    <Text style={styles.recieverText}>{msg.data.message}</Text>
                  </View>
                ) : (
                  <View key={msg.id} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      size={25}
                      //web style
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoS96_vETK55r95MRsFeB2f7T3S6W6UCsElsdeeOwljS2Ugdwyfo8w4FLzrmFF6VpdkUk&usqp=CAU",
                      }}
                    />
                    <Text style={styles.senderText}>{msg.data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <TextInput
                value={input}
                placeholder="Type Message"
                style={styles.textinput}
                onSubmitEditing={sendMessageHandle}
                onChangeText={(text) => setinput(text)}
              />
              <TouchableOpacity onPress={sendMessageHandle}>
                <Ionicons name="send" size={24} color="brown" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#786f",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "#E6E6E6",
    marginLeft: 10,
    marginBottom: 15,
  },
  sender: {
    padding: 15,
    backgroundColor: "#2868E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "#E7E7E7",
    marginLeft: 10,
    marginBottom: 15,
  },
  // senderName: {
  //     left: 10,
  //     paddingRight: 10,
  //     fontSize: 10,
  //     color: "#286"
  // },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textinput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});

//

//{/* <Text style={styles.senderName}>{msg.data.displayName}</Text> */}
