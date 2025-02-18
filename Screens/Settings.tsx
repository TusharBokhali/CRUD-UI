import { View, Text, StyleSheet, Touchable, TouchableOpacity, Switch, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
export default function Settings() {
  const isDark = useColorScheme() === 'dark';
  const [isEnabled, setIsEnabled] = useState(false);
  const { navigate,replace } = useNavigation<any>();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let GetUser = async() =>{
      try {
        AsyncStorage.clear();
        replace('LogIn');
      } catch (error) {
        console.log(error);
      }
    }
 
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:isDark ? 'black' : 'white'}]}>
      <Text style={[styles.Title,{color:isDark ? 'white' : 'black'}]}>Settings</Text>
      <TouchableOpacity style={styles.settings}>
        <TouchableOpacity>
          <Text style={[styles.TEXT,{color:isDark ? 'white' : 'black'}]}>Update</Text>
        </TouchableOpacity>
        <MaterialCommunityIcons name='autorenew' size={28} color={isDark ? 'white':'black'}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settings}>
        <TouchableOpacity>
          <Text style={[styles.TEXT,{color:isDark ? 'white' : 'black'}]}>Version</Text>
          <Text style={{
            fontSize:12,
            opacity:0.5
          }}>1.1</Text>
        </TouchableOpacity>
        <MaterialIcons name='update' size={28} color={isDark ? 'white':'black'}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settings}>
        <TouchableOpacity>
          <Text style={[styles.TEXT,{color:isDark ? 'white' : 'black'}]}>About</Text>
        </TouchableOpacity>
        <MaterialIcons name='more-time' size={28} color={isDark ? 'white':'black'}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settings} onPress={()=>toggleSwitch()}>
          <Text style={[styles.TEXT,{color:isDark ? 'white' : 'black'}]}>Dark Mode</Text>
        <Switch 
         trackColor={{false: '#767577', true: '#81b0ff'}}
         thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
         ios_backgroundColor="#3e3e3e"
         onValueChange={toggleSwitch}
         value={isEnabled}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.BTN} onPressIn={GetUser}>
        <Text style={{fontSize:18,fontWeight:'600',color:'white',textAlign:'center'}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  Title:{
    fontSize:20,
    fontWeight:'600',
    marginBottom:10
  },
  settings:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.5,
    height:70,
    justifyContent:'space-between',
    borderColor:'gray'
  },
  TEXT:{
    fontSize:18,
    fontWeight:'600',
  },
  BTN:{
    width: '100%',
    backgroundColor:'#25d366',
    padding:15,
    borderRadius:10,
    marginTop:120
  }
})