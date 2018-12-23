/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TextInput } from 'react-native-gesture-handler';

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

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Login"  
    }
  }

  moveToSignUp = () => {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View>
        <Text>Username: </Text>
        <TextInput placeholder="Input your username" ></TextInput>
        <Text>Password: </Text>
        <TextInput placeholder="Input your password" ></TextInput>
        <Button title="Login" />
        <Button title="Signup" onPress={()=>{this.moveToSignUp()}} />
      </View>
    );
  }
}

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '' 
    };
    this.textUsername = React.createRef();
    this.textPassword = React.createRef();
  }
  static navigationOptions = ({navigation}) => {
    return {
      title: "Signup"  
    }
  }

  saveUsername = (text) => {
    this.setState({
      username: text
    })
  }

  savePassword = (text) => {
    this.setState({
      password: text
    })
  }

  submitData = () => {
    firebase.database().ref('users/'.concat(this.state.username.toString())).set(
      {
        username : this.state.username,
        password: this.state.password
      }
    );
    this.textUsername.current.clear();
    this.textPassword.current.clear();
  }
  
  render() {
    return (
      <View>
        <Text>Username: </Text>
        <TextInput ref={this.textUsername} placeholder="Input your username" onChangeText={(text) => {this.saveUsername(text)} }></TextInput>
        <Text>Password: </Text>
        <TextInput ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)} } ></TextInput>
        <Button title="Signup" onPress={() => {this.submitData()}}/>
      </View>
    );
  }
}


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
  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAFwodbQlUP9v-FBf4t-XROaxw5SxzHSmY",
      authDomain: "fir-database-demo-80c9a.firebaseapp.com",
      databaseURL: "https://fir-database-demo-80c9a.firebaseio.com",
      projectId: "fir-database-demo-80c9a",
      storageBucket: "fir-database-demo-80c9a.appspot.com",
      messagingSenderId: "518682418033"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

