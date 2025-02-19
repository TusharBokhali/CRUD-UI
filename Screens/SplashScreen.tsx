import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CurrentUsers } from '../hooks/UseContext';

export default function SplashScreen() {
      const { navigate,replace } = useNavigation<any>();
      // const user = useContext(CurrentUsers)
      const [user,setUser] = useState(CurrentUsers)
      useEffect(() => {
    const fetchUser = async () => {
      try {
        let data = await AsyncStorage.getItem('user');
         let userData =  JSON.parse(data as never);
        if(userData){
          replace('Bottom')
        }else{
          replace('LogIn');
        }
       console.log(userData);
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <Image 
      source={require('../assets/Images/Whatsaap.png')}
      style={{
        width:100,
        height:100,
        borderRadius:70
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})