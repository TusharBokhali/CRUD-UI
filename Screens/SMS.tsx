import { View, Text, StyleSheet, useColorScheme, Touchable, TouchableOpacity, Image, Dimensions, TextInput, Pressable, Animated, Scro, TouchableOpacityllView, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Link, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { measure } from 'react-native-reanimated';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
const width = Dimensions.get('window').width;
export default function SMS() {
    const animation = useRef(new Animated.Value(0)).current;
    const AnimationBTn = Animated.createAnimatedComponent(TouchableOpacity);
    const isDark = useColorScheme() == 'dark';
    const [click, setClick] = useState(false);
    const [massage, setMassge] = useState<string>('');
    const [focuse, setFocus] = useState<boolean>(false)
    const [chatData, setChatData] = useState<any[]>([])
    const { goBack } = useNavigation<any>();
    const [showModal, setShowModal] = useState<boolean>(false)

    let show = [...chatData];
    const date = new Date();
    const OnMeassege = () => {
        if (massage.length) {
            setShowModal(false)

            let data = {
                title: massage,
                time: (() => {
                    let minute = date.getMinutes()
                    let hour = date.getHours()
                    console.log(minute);

                    let obj = {
                        hours: hour,
                        minu: minute
                    }
                    return obj;
                })(),
            }
            show.push(data);
            setChatData(show);
        } else {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
        }
        setMassge('');
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? 'black' : 'white' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AnimationBTn onPress={goBack}>
                        <Ionicons name='chevron-back' size={24} color={isDark ? 'white' : 'black'} />
                    </AnimationBTn>
                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDpy_pcfKg5nerCjf-g9HG7f5NNBfAk3LS7wNmRlOU7looHAEL6KIFBI&s' }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 70
                            }}
                        />
                        <View style={{}}>
                            <Text style={{ fontWeight: '600' }}>Rajesh Singh</Text>
                            <Text style={{ opacity: 0.5, fontSize: 12 }}>last seen today at 5:20</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                    <AnimationBTn>
                        <AntDesign name='videocamera' size={24} color={isDark ? 'white' : 'black'} />
                    </AnimationBTn>
                    <AnimationBTn>
                        <MaterialCommunityIcons name='phone-outline' size={24} color={isDark ? 'white' : 'black'} />
                    </AnimationBTn>
                    <AnimationBTn>
                        <MaterialIcons name='more-vert' size={24} color={isDark ? 'white' : 'black'} />
                    </AnimationBTn>
                </View>
            </View>



            {/* Center Part */}

            {
                show?.length ? (
                    // show.map((el, inx) => {
                    //     return (
                    //         <View style={styles.ChatMain} key={inx}>
                    //             <Text style={styles.chatTExt}>{el.title}</Text>
                    //             <Text style={styles.Time}>{`${el.time.hours}:${el.time.minu}`}</Text>
                    //         </View>
                    //     )
                    // })
                    <AutoScrollFlatList
                        showsVerticalScrollIndicator={false}
                        showScrollToEndIndicator={false}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        data={show}
                        keyExtractor={({ index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.ChatMain} key={index}>
                                    <Text style={styles.chatTExt}>{item.title}</Text>
                                    <Text style={styles.Time}>{`${item.time.hours}:${item.time.minu}`}</Text>
                                </View>
                            )
                        }}
                    />
                ) : (
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 20,
                        fontWeight: '500',
                    }}>No chat</Text>
                )
            }

            {/* Last Chating Keyboard Fix Position Part */}
            <View style={styles.Positions}>
                <Pressable style={[styles.InputsMain, { width: '80%' }]}>
                    <View style={{
                        width: massage.length ? '90%' : '65%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15
                    }}>
                        <AnimationBTn style={{ width: '10%' }}>
                            <Image
                                source={require('../assets/Images/smile.png')}
                                style={{ width: 25, height: 25 }}
                            />
                        </AnimationBTn>
                        <View style={{ width: '80%' }}>
                            <TextInput
                                // returnKeyLabel='Send'    
                                placeholder='Message'
                                returnKeyType='send'
                                value={massage}
                                onChangeText={setMassge}
                                onSubmitEditing={OnMeassege}
                                style={[styles.Input]}
                            />
                        </View>
                    </View>
                    <View style={{
                        width: '38%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5
                    }}>
                        <AnimationBTn>
                            <Image
                                source={require('../assets/Images/Attech.png')}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        </AnimationBTn>
                        {
                            massage.length ? (
                                null
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <AnimationBTn>

                                        <Image
                                            source={require('../assets/Images/rupee.png')}
                                            style={{
                                                width: 25,
                                                height: 25
                                            }}
                                        />
                                    </AnimationBTn>

                                    <AnimationBTn>

                                        <Image
                                            source={require('../assets/Images/camera.png')}
                                            style={{
                                                width: 25,
                                                height: 25
                                            }}
                                        />
                                    </AnimationBTn>
                                </View>
                            )
                        }

                    </View>
                </Pressable>
                <View style={{ width: '15%' }}>
                    <AnimationBTn style={styles.Circle} onPressIn={() => massage.length ? OnMeassege() : ''}>
                        {
                            massage.length ?
                                <AnimationBTn onPressIn={OnMeassege}>
                                    <Ionicons name='send' size={24} color={'white'} />
                                </AnimationBTn>

                                :
                                <AnimationBTn >
                                    <FontAwesome6 name='microphone' size={24} color={'white'} />
                                </AnimationBTn>
                        }
                    </AnimationBTn>
                </View>
            </View>
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}

            ><View style={styles.MainModal}>
                    <Image
                        source={require('../assets/Images/Whatsaap.png')}
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 20
                        }}
                    />
                    <Text style={styles.ModalTEXT}>Can't send empty message</Text>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    Positions: {
        width: width * 0.95,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 50,
    },
    Input: {
        fontSize: 18,
        fontWeight: '500',
    },
    InputsMain: {
        marginHorizontal: 'auto',
        shadowColor: '#000',
        elevation: 5,
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '80%',

    },
    ChatMain: {
        maxWidth: '85%',
        backgroundColor: '#685814',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        // borderBottomRightRadius:10,
        alignSelf: 'flex-end',
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    chatTExt: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF'
    },
    Circle: {
        width: 50,
        height: 50,
        backgroundColor: '#25d366',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Time: {
        fontSize: 12,
        color: 'white',
        fontWeight: '500',
        textAlign: 'right',
        alignSelf: 'flex-end',
    },
    MainModal: {
        flexDirection: 'row', gap: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 10,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        paddingVertical: 5,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    ModalTEXT: {
        fontWeight: '500',
        fontSize: 14
    },
    Skeleton: {
        // backgroundColor:'#685814',
    }
})