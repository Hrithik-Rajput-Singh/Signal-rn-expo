import React,{useState, useCallback, useEffect} from 'react'
import { StyleSheet, View, KeyboardAvoidingView ,Text} from 'react-native';
import  {useSelector, useDispatch } from 'react-redux';
import { Button , Image , Input} from 'react-native-elements';   // these is react native element 
import {StatusBar} from 'expo-status-bar';   //what these do is in iphone the time ,battery e.tc show in notch it will change color and by doing light it will turn into white
import * as openActions from '../store/action'
import { useFirestoreConnect} from 'react-redux-firebase';
import {useFirebase} from 'react-redux-firebase';

const Login = (props) => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const fetchingFromFirestore = useSelector(state => state.firestore.ordered.project)  

    useFirestoreConnect([
        { collection: 'project' } // or 'these is how we grab data frfom firestore first we get connect then describe coleection name then with the help of useSelector we get data'
    ])
    
    const handlePress = async () => {
        await firebase.login({email: email, password: password})
        props.navigation.navigate('home')
    }




    return (


        <KeyboardAvoidingView behavior="padding" style={styles.container} >

            <StatusBar style='light'/>  
            <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",}} style={{height: 200, width: 200}}/>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setemail(text)}/>
                <Input placeholder="Password"  secureTextEntry type="password" value={password} onChangeText={(text) => setpassword(text)}/>
            </View>   
            <Button title='Login' containerStyle={styles.button} onPress={handlePress}/>  
            <Button title='Register' containerStyle={styles.button} type='outline' onPress={() => {props.navigation.navigate('Register')}}/>
            <View style={{height: 100}}/> 
      
        </KeyboardAvoidingView>
        
        
    )
};

//dispatch(authActions.authentic(email , password))

// {/*these is reactnative elemenet button so we have to style it by container style and outline give let blur efect */}
//  {/**empty view because when keyboard avoiding view work the registr button is doesn't see so view with height to get liittle up */}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainer: {
        width: 300

    },
    button: {
        width: 200,
        marginTop: 10

    }
})
