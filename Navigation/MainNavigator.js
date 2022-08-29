import React from 'react'
import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/Login'
import Register from '../screen/Register';
import Home from '../screen/Home';
import Addscreen from '../screen/Addscreen';
import Chatscreen from '../screen/ChatScreen';

const defaultNavOption = {
    headerStyle: {backgroundColor: Platform.OS === 'android' ? 'grey' : 'white'  },
    headerTitleStyle: {color: 'blue'},
    headerTintColor: '#ff6347',
}

const loginStack = createStackNavigator();

export const LoginNavigator = () => {
    return(
    <loginStack.Navigator screenOptions={defaultNavOption}>
        <loginStack.Screen name="Login" component={Login} />
        <loginStack.Screen name="Register" component={Register}  />
        <loginStack.Screen name="home" component={Home}  />
        <loginStack.Screen name="Add" component={Addscreen} />
        <loginStack.Screen name="Chat" component={Chatscreen} />
    </loginStack.Navigator>
    )
};


const MainNavigator = () => {
    return (
        <NavigationContainer>
            <LoginNavigator />
        </NavigationContainer>
    )
};

export default MainNavigator


