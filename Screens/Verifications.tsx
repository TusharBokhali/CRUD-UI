import { View, Text, StyleSheet, useColorScheme, TextInput, Dimensions, TouchableOpacity,  } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
const width = Dimensions.get('window').width;

export default function Verifications() {
    const isDark = useColorScheme() === 'dark';
    const inputs = useRef<Array<TextInput | null>>([]);
    const [focus, setFocus] = useState('')
    const { goBack,replace} = useNavigation<any>();
    const AnimationBtn = Animated.createAnimatedComponent(TouchableOpacity);
    const handleInputChange = (text: string, index: number) => {
        if (text.length === 1 && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus(); 
        }
    };

    const handleKeyPress = (e: any, index: number) => {

        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: isDark ? 'black' : '#fff', flex: 1,padding:15}}>
            <AnimationBtn entering={FadeInLeft.delay(100).duration(400).damping(12).springify()} onPress={() => goBack()}>
                <Ionicons name='chevron-back' size={36} color={isDark ? 'white' : 'black'} />
            </AnimationBtn>
            <View style={styles.container}>
                <Animated.Text entering={FadeInLeft.delay(300).duration(700).damping(12).springify()} style={styles.TextMain}>Verify Your Number</Animated.Text>
                <Animated.Text entering={FadeInLeft.delay(300).duration(700).damping(12).springify()} style={[styles.Descreption, { color: isDark ? 'white' : 'black' }]}>Enter the otp code here</Animated.Text>
                <Animated.View entering={FadeInLeft.delay(300).duration(600).damping(12).springify()} style={styles.MainFlex}>
                    {
                        [...Array(6)].map((el, inx) => {
                            return (
                                <View style={[styles.Inputs, { borderColor: isDark ? 'white' : 'black' }]} key={inx}>
                                    <TextInput
                                       
                                        textContentType="oneTimeCode"
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={(e) => handleKeyPress(e, inx)}
                                        ref={(ref) => (inputs.current[inx] = ref)}
                                        onChangeText={(text: any) => handleInputChange(text, inx)}
                                        style={{ width: '100%', height: '100%', textAlign: 'center', fontSize: 28 }}
                                    />
                                </View>
                            )
                        })
                    }
                </Animated.View>
                <AnimationBtn entering={FadeInLeft.delay(300).duration(700).damping(12).springify()}>
                    <Text style={{
                        textDecorationLine: "underline",
                        opacity: 0.5,
                        fontWeight: '600',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: width * 0.1,
                        color: isDark ? 'white' : 'black'
                    }}>Resend?</Text>
                </AnimationBtn>
                <AnimationBtn entering={FadeInLeft.delay(300).duration(700).damping(12).springify()} style={styles.BTN} onPress={()=>replace('Bottom')}>
                    <Text style={styles.BTNText}>Continue</Text>
                </AnimationBtn>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: width * 0.3
    },
    TextMain: {
        fontSize: 32,
        fontWeight: '700',
        color: '#3F74FD',
        textAlign: 'center'
    },
    Descreption: {
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '500',
        opacity: 0.5,
    },
    MainFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        marginTop: width * 0.1
    },
    Inputs: {
        width: width * 0.1,
        height: 55,
        borderBottomWidth: 1,
    },
    BTN: {
        width: '90%',
        marginHorizontal: "auto",
        backgroundColor: '#3F74FD',
        height: 60,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.1
    },
    BTNText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600'
    }
})