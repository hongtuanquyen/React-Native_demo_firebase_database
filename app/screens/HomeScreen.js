import React, {Component} from 'react';
import {TextInput, FlatList, AsyncStorage, Text, View, Button} from 'react-native';
import '@firebase/auth'
import '@firebase/database';
import {firebaseApp} from '../components/FirebaseConfig'

const rootRef = firebaseApp.database().ref();
const animalRef = rootRef.child('animals');

class HomeScreen extends Component {
    constructor() {
      super();
      this.state={
        animalName: '',
        animals: []
      }
      this.textAnimals = React.createRef();  
    }

    componentDidMount() {
      animalRef.on('value', (childSnapshot)=>{
        const animals = [];
        childSnapshot.forEach((doc)=>{
          animals.push({
            key: doc.key,
            animalName: doc.toJSON().animalName
          })
          this.setState({
            animals: animals
          });
        })
      })
    }

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
  
    insertToDatabase = () => {
      if(this.state.animalName.trim() !== ''){
        animalRef.push({
          animalName: this.state.animalName
        });
        this.setState({animalName:''});
        this.textAnimals.current.clear();
      }
    }

    render() {
      return (
        <View>
          <Text>Welcome to my app</Text>
          <TextInput ref={this.textAnimals} onChangeText={(text)=>{this.setState({animalName: text});}} />
          <Button title="+" onPress={()=>{this.insertToDatabase();}} />
          <FlatList
            data={this.state.animals}
            renderItem={({item}) => <Text>{item.animalName}</Text>}
          />
          <Button title="Logout" onPress={()=>{this.logout()}} />
        </View>
      );
    }
  }

  export default HomeScreen;