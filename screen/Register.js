import React ,{useState, useLayoutEffect}from 'react'
import { StyleSheet,  View ,KeyboardAvoidingView ,Text} from 'react-native';
import { Button , Image , Input} from 'react-native-elements';  
import {StatusBar} from 'expo-status-bar'; 

const Register = (props) => {
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [imageUrl, setimageUrl] = useState("")

    const register = () => {}

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [])


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style='light'/> 
        <Text h3 style={{marginBottom: 50}}>Create Signal Account</Text>  
        <View style={styles.inputcontainer}>
            <Input placeholder="firstName" autoFocus type='text' value={firstname} onChangeText={(text) => setfirstname(text)}/>
            <Input placeholder="LastName"  type='text' value={lastname} onChangeText={(text) => setlastname(lastname)}/>
            <Input placeholder="email"  type='email' value={email} onChangeText={(text) => setemail(text)}/>
            <Input placeholder="password"  type='password' secureTextEntry value={password} onChangeText={(text) => setpassword(text)}/>
            <Input placeholder="image"  type='text' value={imageUrl} onChangeText={(text) => setimageUrl(text)} onSubmitEditing={register}/>
        </View>
        <Button title="Register" onPress={register}/>  
        <View style={{height: 100}}/> 
        </KeyboardAvoidingView>
    )
};

// /**so ether on image submit or by pressing button we are gona register */

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputcontainer: {
        width: 300

    },
    button: {
        width: 200,
        marginTop: 10

    }
})
