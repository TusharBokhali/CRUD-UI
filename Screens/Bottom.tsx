import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Chats from './Chats';
import Calls from './Calls';
import Settings from './Settings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
export default function Bottom() {
    const isDark = useColorScheme() === 'dark';
    const Focused = useIsFocused();
    const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator options={{
        headerShown:false,  
        tabBarLabelStyle:{
            fontWeight:'500'
        }
    }}
    initialRouteName='Chats'
    >
        <Tab.Screen name='Chats' component={Chats}
        options={{
            tabBarIcon:({color,size,focused}:any)=>{
                return (
                    <MaterialCommunityIcons name='android-messages' size={24} color={focused ? '#25d366' : 'black'}/>
                )
            },
           
        }}
        />
        <Tab.Screen name='Calls' component={Calls}
        options={{
            tabBarIcon:({color,size,focused}:any)=>{
                return (
                    <MaterialCommunityIcons name='phone-outline' size={24} color={focused ? '#25d366' : 'black'}/>
                )
            }
        }}
        />
        <Tab.Screen name='Settings' component={Settings}
        options={{
            tabBarIcon:({color,size,focused}:any)=>{
                return (
                    <MaterialIcons  name='settings' size={24} color={focused ? '#25d366' : 'black'}/>
                )
            }
        }}
        />
    </Tab.Navigator>
  )
}