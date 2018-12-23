import React, {Component} from 'react';
import {Alert, Text, View, Button} from 'react-native';
import '@firebase/auth'
import { TextInput } from 'react-native-gesture-handler';
import {firebaseApp} from '../components/FirebaseConfig'

class SignUpScreen extends Component {
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
        title: "Sign Up"  
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
            'Sign up failed',
            'Sign up failed',
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
          <Button title="Sign Up" onPress={() => {this.submitData()}}/>
        </View>
      );
    }
  }

  export default SignUpScreen;