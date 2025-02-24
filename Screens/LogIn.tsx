/* eslint-disable react-native/no-inline-styles */
import { View, Text, useColorScheme, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { shadow, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import db from '../firebase.config';
import { getAuth } from "firebase/auth";
import Loader from './Loader';
import 'firebase/compat/auth'
import { getApp, getApps } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn() {
  const isDark = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [Loading,setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<any>(false);
  const [data,setData] = useState<any>({});
  const [Alluser,setAlluser] =useState<any>();
  const { navigate,replace } = useNavigation<any>();

  const LoginHandle =async ()=>{
    setLoading(true);
    if(data.email.includes('@')){
      const q = query(collection(db, "users"), where("email", "==", data.email));
      let user:any = null
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        user = {id: doc.id, ...doc.data()}
      });
      if(!user){
        Alert.alert("Email not found")
      } else if(user?.password == data.password){
        // redirect 
        let store = async(user:any)=>{
          try {
            await AsyncStorage.setItem('user',JSON.stringify(user))
          } catch (error) {
            console.log(error); 
          }
        }
        store(user)
        Alert.alert("Logn SuccessFully");
        replace('Bottom');
      } else {
        Alert.alert("Password wrong!")
        console.log(data.password);
        
      }
      setLoading(false);
    }else{
      console.log("Mobile")
      const q = query(collection(db, "users"), where("phonenumber", "==", data.number));
      let user:any = null
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        user = {id:doc.id,...doc.data()}
      })
      if(!user){
        Alert.alert('Account not found');
      }else if(user.password === data.password){
        Alert.alert("Login SuccessFully");
        let store = async(user:any)=>{
          try {
            await AsyncStorage.setItem('user',JSON.stringify(user))
          } catch (error) {
            console.log(error); 
          }
        }
        store(user)
        replace('Bottom');
        console.log("user Moble" , user);
      }else{
        Alert.alert('Password not cuurect!');
      }
      setLoading(false);
    }
  }

  return (
    <Animated.View entering={FadeInLeft.delay(200).duration(400)} style={[styles.container, { backgroundColor: isDark ? 'black' : 'white', }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, height: height - height * 0.11, paddingTop: width * 0.3 }}>
          <Animated.Text entering={FadeInLeft.delay(200).duration(400)} style={styles.Text}>Log In</Animated.Text>
          <Text style={{ opacity: 0.5, color: isDark ? 'white' : 'black', fontSize: 18, fontWeight: '500', textAlign: 'center' }}>Welcome to Company Name</Text>
          <View style={{ width: width - 40, marginTop: 50, marginHorizontal: 'auto' }}>
            <TextInput
              mode="outlined"
              label="Phone or Email"
              textContentType='emailAddress'
              placeholder="Phone or Email"
              outlineColor={isDark ? 'gray' : 'black'}
              activeOutlineColor={isDark ? '#000000' : 'black'}
              value={data.email}
              onChangeText={(value)=> setData({...data,email:value})}
              outlineStyle={{
                borderRadius: 15,
                borderWidth: 1,
                width: '100%',
              }}
              style={{
                width: '100%',
                marginHorizontal: 'auto',
                fontWeight: "700",
                paddingLeft: 10,
                backgroundColor: 'white'
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
              <TextInput
                mode="outlined"
                label="Password"
                maxLength={10}
                placeholder="Password"
                outlineColor={isDark ? 'gray' : 'black'}
                activeOutlineColor={isDark ? '#000000' : 'black'}
                outlineStyle={{
                  borderRadius: 15,
                  borderWidth: 1,
                  width: '100%',
                }}
                keyboardType='number-pad'
                value={data.number}
              onChangeText={(value)=> setData({...data,password:value})}
                secureTextEntry={show}
                style={{
                  width: '100%',
                  marginHorizontal: 'auto',
                  fontWeight: "700",
                  paddingLeft: 10,
                  backgroundColor: 'white'
                }}
              />
              <TouchableOpacity style={{ position: 'absolute', right: '8%', }} onPress={() => setShow(!show)}>
                {
                  !show ? (
                    <Image
                      source={require('../assets/Images/eyeSeen.png')}
                      style={{ width: 22, height: 15.5, }}
                    />
                  ) : (
                    <Image
                      source={require('../assets/Images/eyeHide.png')}
                      style={{ width: 22, height: 15.5, }}
                    />
                  )
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={{ width: '90%', marginHorizontal: 'auto', marginLeft: 25, marginTop: 10, fontSize: 14, fontWeight: '600' }}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity disabled={Loading} style={styles.BTN} onPressIn={LoginHandle}>
            {
              Loading ? <Loader /> :
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '600', }}>Log In</Text>
            }
          </TouchableOpacity>

          <Animated.View entering={FadeInLeft.damping(12).springify().duration(400).delay(600)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=48&id=17949&format=png' }}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                  borderRadius:100
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://img.icons8.com/?size=48&id=uLWV5A9vXIPu&format=png' }}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                  borderRadius:100
                }}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(600).springify()} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <TouchableOpacity style={[styles.BTNs]} onPress={() => navigate('SingIn')}>
              <Text style={{ color: '#3F74FD', fontSize: 22, fontWeight: '400', }}>Create New Account</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  Text: {
    color: '#3F74FD',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center'
  },
  BTN: {
    width: '90%',
    marginHorizontal: 'auto',
    backgroundColor: '#3F74FD',
    height: 60,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40
  },
  BTNs: {
    width: '90%',
    marginHorizontal: 'auto',
    height: 60,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3F74FD',
  }
})

