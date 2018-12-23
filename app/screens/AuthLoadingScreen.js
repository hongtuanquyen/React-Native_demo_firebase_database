import React, {Component} from 'react';
import {AsyncStorage, View, ActivityIndicator} from 'react-native';
import '@firebase/auth'
import {firebaseApp} from '../components/FirebaseConfig'

class AuthLoadingScreen extends Component {
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
          console.log(error.message);
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

export default AuthLoadingScreen;