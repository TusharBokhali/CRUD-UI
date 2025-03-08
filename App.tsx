/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-quotes */
import { View, Text, StatusBar, useColorScheme, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogIn from './Screens/LogIn';
import SingIn from './Screens/SingIn';
import Verifications from './Screens/Verifications';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Bottom from './Screens/Bottom';
import SMS from './Screens/SMS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './Screens/SplashScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const isDark = useColorScheme() === 'dark';
  // const {replace} = useNavigation<any>();
  // let userData = ''
  // // useEffect(() => {
  // //   const fetchUser = async () => {
  // //     try {
  // //       let data = await AsyncStorage.getItem('user');
  // //        userData = data ? JSON.parse(data) : null;
  // //        setUser(userData)
  // //      console.log(userData);
  // //     } catch (error) {
  // //       console.log(error);
  // //     }
  // //     finally {
  // //       setLoading(false);
  // //     }
  // //   };

  // //   fetchUser();
  // // }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>; // You can use a custom splash screen here
  // }

  // const data = "static"
  // console.log("userApp",data);
  // console.log("data userApp",user);
  // const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {

  }, []);
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor='transparent' translucent={true} barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='LogIn' component={LogIn} />
          <Stack.Screen name='SingIn' component={SingIn} />
          <Stack.Screen name='Verifications' component={Verifications} />
          <Stack.Screen name='Bottom' component={Bottom} />
          <Stack.Screen name='SMS' component={SMS} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  )
}
