import React, {Component} from 'react';
import {AsyncStorage, Alert, Text, View, Button} from 'react-native';
import '@firebase/auth'
import { TextInput } from 'react-native-gesture-handler';
import {firebaseApp} from '../components/FirebaseConfig'

class SignInScreen extends Component {
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
        title: "Log In"  
      }
    }
  
    moveToSignUp = () => {
      this.props.navigation.navigate('SignUp');
    }
  
    login = () => {
      firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(()=>{
          Alert.alert(
            'Log in successfully',
            'Log in successfully',
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
            'Log in failed',
            'Log in failed',
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
          <Text>Email: </Text>
          <TextInput ref={this.textEmail} placeholder="Input your email" onChangeText={(text) => {this.saveEmail(text)}}></TextInput>
          <Text>Password: </Text>
          <TextInput secureTextEntry={true} ref={this.textPassword} placeholder="Input your password" onChangeText={(text) => {this.savePassword(text)}}></TextInput>
          <Button title="Log In" onPress={() => {this.login()}} />
          <Button title="Sign Up" onPress={()=>{this.moveToSignUp()}} />
        </View>
      );
    }
  }

  export default SignInScreen;