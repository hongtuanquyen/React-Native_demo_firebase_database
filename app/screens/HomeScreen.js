import React, {Component} from 'react';
import {AsyncStorage, Text, View, Button} from 'react-native';

class HomeScreen extends Component {
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

  export default HomeScreen;