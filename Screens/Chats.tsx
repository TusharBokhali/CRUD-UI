import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import db from '../firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import Loader from './Loader'
import { CurrentUsers } from '../hooks/UseContext';

export default function Chats() {
  const isDark = useColorScheme() === 'dark';
  const { navigate } = useNavigation<any>();
  const [Alluser, setAlluser] = useState<any[]>([]);
  // const [currentUser,setCurrentUser] = useState<any>();
  const [userChatMassage, setuserChatMassage] = useState<string>('');
  const [ChatDataFire, setChatDataFire] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>()
  // const [userActive,setUserActive] = useState<boolean>(false)


  useEffect(() => {
    // setUserActive(true)

    const ref = collection(db, "users")
    onSnapshot(ref, async (QuerySnapshot) => {
      const users: any = [];
      let userData;
      try {
        let data = await AsyncStorage.getItem('user');
        userData = JSON.parse(data as never);
        userData.Active = true;
        // console.log("userData",userData);
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, userData)
  
    
        setCurrentUser(userData)
      } catch (error) {
        console.log(error);
      }
   
      if (userData && userData!=='') {
        QuerySnapshot.forEach((doc) => {
        
          if(userData.id !== doc.id)
          users.push({ id: doc.id, ...doc.data()})
      })
      // console.log(userData.id);
        setAlluser(users);
      }
    })


    return () => {
      const CloseData = async()=>{
        currentUser.Active = false
        const userRef = doc(db, "users", currentUser.id);
        return await updateDoc(userRef, currentUser)
      }      
      CloseData()
    }
  }, []);
console.log("AllUser:-",Alluser);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? 'black' : 'white' }]}>
      <View style={styles.Flex}>
        <Text style={styles.TEXT}>WhatsApp</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20
        }}>
          <TouchableOpacity>
            <MaterialIcons name='qr-code-scanner' size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='camera' size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name='more-vert' size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Search}>
          <Fontisto name='search' size={18} color={isDark ? 'gray' : 'gray'} />
          <TextInput
            placeholder='Ask Meta AI or Search'
            style={{
              // fontWeight:'500',
              fontSize: 16
            }}
          />
        </View>
        {
          Alluser.length ? (

            Alluser.map((el, inx) => {
              return (
                <TouchableOpacity style={styles.User} key={inx} onPress={() => navigate('SMS', { user: el })}>
                  <View style={{
                    width: '15%',
                    flexDirection:'row',
                  }}>
                    <Image
                      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDpy_pcfKg5nerCjf-g9HG7f5NNBfAk3LS7wNmRlOU7looHAEL6KIFBI&s' }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 70
                      }}
                    />
                    {
                      // console.log(el)
                      
                      // el.Active ?  <View 
                      // style={{
                      //   width:10,
                      //   height:10,
                      //   borderRadius:50,
                      //   backgroundColor:'green',
                      //   position: 'absolute',
                      // }}
                      // /> : null
                    }
                  </View>
                  <View style={{ width: '85%', paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                      <Text>{el.name}</Text>
                      <Text style={{ opacity: 0.5 }}>Time</Text>
                    </View>
                    <Text style={{
                      opacity: 0.5,
                      fontWeight: '500'
                    }}>{el.keyboard!==null ? "Typing..": "Good Mornning"}</Text>
                  </View>

                </TouchableOpacity>
              )
            })
          ) : (
            <Loader />
          )
        }
      </ScrollView>
      <TouchableOpacity style={styles.AddFixedAI}>
        <Image
          source={require('../assets/Images/MetaAi.png')}
          style={{
            width: 30,
            height: 30
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.AddFixed}>
        <MaterialCommunityIcons name='message-plus-outline' size={20} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  Flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  TEXT: {
    color: '#25d366',
    fontWeight: '600',
    fontSize: 28
  },
  Search: {
    width: '100%',
    backgroundColor: '#eeeded',
    paddingHorizontal: 15,
    borderRadius: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    marginVertical: 20
  },
  User: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginVertical: 5
  },
  AddFixedAI: {
    width: 40,
    height: 40,
    backgroundColor: '#ece5dd',
    borderRadius: 8,
    position: 'absolute',
    right: 15,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddFixed: {
    width: 50,
    height: 50,
    backgroundColor: '#25d366',
    borderRadius: 10,
    position: 'absolute',
    right: 15,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})