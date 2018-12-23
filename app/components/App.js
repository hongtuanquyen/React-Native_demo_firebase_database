/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, View, Button, ActivityIndicator} from 'react-native';
import '@firebase/auth'
import '@firebase/database';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen, 
    SignUp: SignUpScreen
  },
  {
    initialRouteName: "SignIn"
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
)); 

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

