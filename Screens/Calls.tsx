import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function Calls() {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.TEXT}>Calls</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <TouchableOpacity>
            <MaterialIcons name='qr-code-scanner' size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Fontisto name='search' size={18} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons name='more-vert' size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 20 }}>Favourites</Text>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 15 }}>
        <TouchableOpacity style={styles.Box}>
          <Octicons name='heart-fill' size={22} color={'white'} />
        </TouchableOpacity>
        <Text style={{
          fontWeight: '600',
          fontSize: 16
        }}>Add Fovourites</Text>
      </TouchableOpacity>
      <Text style={{
        fontWeight: '600',
        fontSize: 16,
        marginVertical: 25,
      }}>Recent</Text>
      {
        [...Array(10)].map((el,inx)=>{
          return (
            <View style={styles.CallData} key={inx}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDpy_pcfKg5nerCjf-g9HG7f5NNBfAk3LS7wNmRlOU7looHAEL6KIFBI&s' }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 70
                }}
              />
              <View>
              {/* call-made */}
                <Text>RajeshSingh Software</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                  <MaterialIcons name={inx % 2 == 0 ? 'call-received' : 'call-made'} size={16} color={inx % 2 == 0 ? 'red' : 'green'}/>
                <Text style={{
                  opacity: 0.5,
                  fontWeight: '500'
                }}>{`${inx+1} February, 5:26`} {inx % 2 == 0 ? 'pm' : 'am'}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <AntDesign name='videocamera' size={18} color={'black'}/>
            </TouchableOpacity>
          </View>
          )
        })
      }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  TEXT: {
    fontSize: 22,
  },
  Box: {
    width: 50,
    height: 50,
    borderRadius: 70,
    backgroundColor: '#25d366',
    justifyContent: 'center',
    alignItems: 'center'
  },
  CallData: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
})