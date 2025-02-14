/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, useColorScheme, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';

export default function SingIn() {
  const isDark = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [show, setShow] = useState<any>(false);
  const { goBack } = useNavigation<any>();

  const AnimationBtn = Animated.createAnimatedComponent(TouchableOpacity)
  
  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: isDark ? 'black' : 'white', height: height }]}>
        <AnimationBtn entering={FadeInLeft.delay(200).duration(600).damping(12).springify()} onPress={() => goBack()}>
          <Ionicons name='chevron-back' size={36} color={isDark ? 'white' : 'black'} />
        </AnimationBtn>
        <View style={[styles.Main, { marginTop: '30%' }]}>
          <Animated.Text entering={FadeInUp.delay(300).duration(600).damping(12).springify()} style={styles.Text}>Sign Up</Animated.Text>
          <Animated.Text entering={FadeInUp.delay(400).duration(600).damping(12).springify()} style={{ opacity: 0.5, color: isDark ? 'white' : 'black', fontSize: 18, fontWeight: '500', textAlign: 'center' }}>Welcome to Company Name</Animated.Text>
          <Animated.View entering={FadeInUp.delay(500).duration(600).damping(12).springify()} style={{ width: width - 40, marginTop: 30, marginHorizontal: 'auto' }}>
            <TextInput
              mode="outlined"
              label="Name"
              placeholder="Name"
              outlineColor={isDark ? 'gray' : 'black'}
              activeOutlineColor={isDark ? '#000000' : 'black'}
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
                marginTop: 20,
                backgroundColor: 'white'
              }}
            />

            <TextInput
              mode="outlined"
              label="Phone Number"
              placeholder="Phone Number"
              outlineColor={isDark ? 'gray' : 'black'}
              activeOutlineColor={isDark ? '#000000' : 'black'}
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
                marginTop: 20,
                backgroundColor: 'white'
              }}
            />

            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Email"
              outlineColor={isDark ? 'gray' : 'black'}
              activeOutlineColor={isDark ? '#000000' : 'black'}
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
                marginTop: 20,
                backgroundColor: 'white'

              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', marginTop: 20 }}>
              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Password"
                secureTextEntry={show}
                outlineColor={isDark ? 'gray' : 'black'}
                activeOutlineColor={isDark ? '#000000' : 'black'}
                outlineStyle={{
                  borderRadius: 15,
                  borderWidth: 1,
                  width: '100%',
                  overflow: 'hidden'
                }}
                style={{
                  width: '100%',
                  marginHorizontal: 'auto',
                  fontWeight: "700",
                  paddingLeft: 10,
                  backgroundColor: 'white'

                }}
              />
              <TouchableOpacity style={{ position: 'absolute', right: '8%', }}
                onPress={() => setShow(!show)}>
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

          </Animated.View>
          <AnimationBtn entering={FadeInDown.delay(600).duration(600).damping(12).springify()} style={styles.BTN} >
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '600', }}>Sign Up</Text>
          </AnimationBtn>
          <Animated.View entering={FadeInDown.delay(700).duration(600).damping(12).springify()} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontWeight: '600' }}>Already Have Account?</Text>
            <AnimationBtn onPress={() => goBack()}>
              <Text style={{ textDecorationLine: 'underline', color: '#3F74FD', fontWeight: '600', fontSize: 14, marginLeft: 5 }}>Log In</Text>
            </AnimationBtn>
          </Animated.View>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // justifyContent: 'center',
  },
  Main: {

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
    marginTop: 20
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
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',

  }
})