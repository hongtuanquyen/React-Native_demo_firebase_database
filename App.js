/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, View, Button, ActivityIndicator} from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { TextInput } from 'react-native-gesture-handler';
import {firebaseApp} from './FirebaseConfig'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~App HomeScreen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Welcome to my app"  
    }
  }
  
  logout = async() => {
    try{
      await AsyncStorage.setItem('email'," ");
      await AsyncStorage.setItem('password', " ");
      this.props.navigation.navigate('AuthLoading');
    }catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <View>
        <Text>Welcome to my app</Text>
        <Button title="Logout" onPress={()=>{this.logout()}} />
      </View>
    );
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Log in Screen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '' ,
      temp: ''
    };
    this.textEmail = React.createRef();
    this.textPassword = React.createRef();
  }
  
  static navigationOptions = ({navigation}) => {
    return {
      title: "Login"  
    }
  }

  moveToSignUp = () => {
    this.props.navigation.navigate('Signup');
  }

  login = () => {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(()=>{
        Alert.alert(
          'Login Successfully',
          'Login Successfully',
          [
            {text: 'OK'}
          ],
          { cancelable: true }
        )
        this.textEmail.current.clear();
        this.textPassword.current.clear();
        this.saveAccount();
      }).catch((error) => {
        Alert.alert(
          'Login Failed',
          'Login Failed',
          [
            {text: 'OK'}
          ],
          { cancelable: true }
        )
      })  
  }

  saveAccount = async() => {
    try{
      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('password', this.state.password); 
      this.props.navigation.navigate('App');
    }
    catch (error) {
      console.log(error.message);
    }
  }

  saveEmail = (text) => {
    this.setState({
      email: text
    })
  }

  savePassword = (text) => {
    this.setState({
      password: text
    })
  }

  render() {
    return (
      <View>
        <Text>{this.state.temp}</Text>
        <Text>Email: </Text>
        <TextInput ref={this.textEmail} placeholder="Input your email" onChangeText={(text) => {this.saveEmail(text)}}></TextInput>
        <Text>Password: </Text>
        <TextInput secureTextEntry={true} ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)}}></TextInput>
        <Button title="Login" onPress={() => {this.login()}} />
        <Button title="Signup" onPress={()=>{this.moveToSignUp()}} />
      </View>
    );
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Sign Up Screen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '' 
    };
    this.textEmail = React.createRef();
    this.textPassword = React.createRef();
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: "Signup"  
    }
  }

  saveEmail= (text) => {
    this.setState({
      email: text
    })
  }

  savePassword = (text) => {
    this.setState({
      password: text
    })
  }

  submitData = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(()=>{
        Alert.alert(
          'Sign up Successfully',
          'Sign up Successfully',
          [
            {text: 'OK'}
          ],
          { cancelable: true }
        )
        this.textEmail.current.clear();
        this.textPassword.current.clear();
        this.props.navigation.navigate('SignIn');
      }).catch((error) => {
        Alert.alert(
          'Sign up Failed',
          'Sign up Failed',
          [
            {text: 'OK'}
          ],
          { cancelable: true }
        )
      })
  }
  
  render() {
    return (
      <View>
        <Text>Email: </Text>
        <TextInput ref={this.textEmail} placeholder="Input your Email" onChangeText={(text) => {this.saveEmail(text)} }></TextInput>
        <Text>Password: </Text>
        <TextInput secureTextEntry={true} ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)} } ></TextInput>
        <Button title="Signup" onPress={() => {this.submitData()}}/>
      </View>
    );
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~AuthLoadingScreen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.getAccount();
  }

  getAccount = async() => {
    try{
      emailItem = await AsyncStorage.getItem('email');
      passwordItem = await AsyncStorage.getItem('password');
      firebaseApp.auth().signInWithEmailAndPassword(emailItem, passwordItem)
      .then(()=>{
        this.props.navigation.navigate('App');
      }).catch((error) => {
        this.props.navigation.navigate('Auth');
      })  
    }catch (error) {
      console.log(error.message);
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Settings~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
const AppStack = createStackNavigator(
  {
    Home: HomeScreen 
  },
  {
    initialRouteName: "Home"
  }
);
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen, 
    Signup: SignupScreen
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

