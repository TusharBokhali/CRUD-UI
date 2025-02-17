/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-quotes */
import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LogIn from './Screens/LogIn';
import SingIn from './Screens/SingIn';
import Verifications from './Screens/Verifications';
import { NavigationContainer } from '@react-navigation/native';
import Bottom from './Screens/Bottom';
import SMS from './Screens/SMS';
export default function App() {
  const Stack = createNativeStackNavigator();
  const isDark = useColorScheme() === 'dark';
    return (
    <NavigationContainer>
      <StatusBar backgroundColor={isDark ? 'black' : 'white'} barStyle={isDark ? 'light-content' : 'dark-content'}/>
    <Stack.Navigator initialRouteName='LogIn' screenOptions={{headerShown:false}}>
      <Stack.Screen name='LogIn' component={LogIn}/>
      <Stack.Screen name='SingIn' component={SingIn}/>
      <Stack.Screen name='Verifications' component={Verifications}/>
      <Stack.Screen name='Bottom' component={Bottom}/>
      <Stack.Screen name='SMS' component={SMS}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}
