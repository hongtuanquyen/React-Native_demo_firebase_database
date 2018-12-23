/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, View, Button} from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TextInput } from 'react-native-gesture-handler';
import {firebaseApp} from './FirebaseConfig'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Successfully Logged in Screen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class LoginSuccessScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Welcome to my app"  
    }
  }

  render() {
    return (
      <View>
        <Text>Welcome to my app</Text>
        <Button title="Logout" />
      </View>
    );
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Log in Screen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '' ,
      temp: ''
    };
    this.textEmail = React.createRef();
    this.textPassword = React.createRef();
    this.getAccount();
  }

  getAccount = async() => {
    try{
      emailItem = await AsyncStorage.getItem('email');
      passwordItem = await AsyncStorage.getItem('password');
      this.setState({
        temp: passwordItem
      });
      firebaseApp.auth().signInWithEmailAndPassword(emailItem, passwordItem)
      .then(()=>{
        Alert.alert(
          'Login Successfully',
          'Login Successfully',
          [
            {text: 'OK'}
          ],
          { cancelable: true }
        )
        this.props.navigation.navigate('LoginSuccess');
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
    catch (error) {
      console.log(error.message);
    }
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
        this.saveAccount();
        this.textEmail.current.clear();
        this.textPassword.current.clear();

        this.props.navigation.navigate('LoginSuccess');
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
      this.setState({
        email: '',
        password: ''
      })
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
        <TextInput ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)}}></TextInput>
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
        this.setState({
          email: '',
          password: ''
        })
        this.textEmail.current.clear();
        this.textPassword.current.clear();
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
        <TextInput ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)} } ></TextInput>
        <Button title="Signup" onPress={() => {this.submitData()}}/>
      </View>
    );
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Settings~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
const AppNavigator = createStackNavigator(
  {
    LoginSuccess: LoginSuccessScreen,
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator); 

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

