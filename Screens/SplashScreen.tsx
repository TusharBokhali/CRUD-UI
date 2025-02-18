import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
      const { navigate,replace } = useNavigation<any>();
    
    useEffect(()=>{
        let GetUser = async() =>{
          try {
            let data = await  AsyncStorage.getItem('user');
            let user = JSON.stringify(data);
            if(user){
              replace('Bottom');
            }else{
                replace('LogIn');
            }
          } catch (error) {
            console.log(error);
 
          }
        }
        GetUser();
      },[])
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