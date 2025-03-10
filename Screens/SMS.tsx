import { View, Text, StyleSheet, useColorScheme, Touchable, TouchableOpacity, Image, Dimensions, TextInput, Pressable, Animated, Scro, TouchableOpacityllView, Modal, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { measure } from 'react-native-reanimated';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { addDoc, collection, getDocs, onSnapshot, where, Timestamp, serverTimestamp, or, orderBy, and, doc, updateDoc, query } from 'firebase/firestore';
import db from '../firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Use } from 'react-native-svg';
const width = Dimensions.get('window').width;
export default function SMS() {
    const animation = useRef(new Animated.Value(0)).current;
    const AnimationBTn = Animated.createAnimatedComponent(TouchableOpacity);
    const isDark = useColorScheme() == 'dark';
    const [click, setClick] = useState(false);
    const [massage, setMassge] = useState<string>('');
    const [focuse, setFocus] = useState<boolean>(false);
    const [chatData, setChatData] = useState<any[]>([]);
    const { goBack } = useNavigation<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>();
    const [ChatDataFire, setChatDataFire] = useState<any[]>([]);
    const [Typing, setTyping] = useState(false);
    const [KeyboardSet, setKeyboard] = useState(false)
    const [chatUsers, setchatUsers] = useState<any>({});
    const Route = useRoute<any>();
    const User = Route.params.user;


    const OnMeassege = async () => {
        try {
            if (massage.length) {
                setShowModal(false)
                const q = query(collection(db, "message"), or(
                    where("ChatId", "==", `${User.id}_${currentUser.id}`),
                    where("ChatId", "==", `${currentUser.id}_${User.id}`)
                ))
                let message: any = null
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    message = { id: doc.id, ...doc.data() }
                });
                if (message && message !== null) {
                    message.OnMessageList.push({
                        message: massage,
                        sender: currentUser.id,
                        receiver: User.id,
                        createdAt:new Date(),
                        read: false
                    })
                    const CloseData = async () => {
                        currentUser.Active = false
                        const userRef = doc(db, "message", message.id);
                        await updateDoc(userRef, message)
                        return
                    }
                    CloseData()
                } else {
                    const MassgeCreateFire = () => {
                        let Data = {
                            ChatId: `${User.id}_${currentUser.id}`,
                            OnMessageList: [
                                {
                                    message: massage,
                                    sender: currentUser.id,
                                    receiver: User.id,
                                    createdAt:new Date(),
                                    read: false
                                }
                            ]
                        }
                        addDoc(collection(db, "message"), Data)
                            .then((res) => {
                                setTyping(!Typing)
                            })
                            .catch((error) => {

                                Alert.alert("error")
                                console.log(error);
                            })

                    }
                    MassgeCreateFire();
                }
                setMassge('');
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        let user: any;
        const GeCurentyUser = async () => {
            try {
                let data = await AsyncStorage.getItem('user');
                user = JSON.parse(data as never);
                setCurrentUser(user)
                try {
                    const q = query(collection(db, "message"), or(
                        where("ChatId", "==", `${User.id}_${user.id}`),
                        where("ChatId", "==", `${user.id}_${User.id}`)
                    ))
                    onSnapshot(q, (snapshot) => {
                        let array: any;
                        snapshot.forEach((doc) => {
                            array = doc.data().OnMessageList
                        });
                        setChatDataFire(array);
                        // console.log("Array",array);
                        
                        const CloseData = async () => {
                            let data = {...User,lastData:array[array.length - 1].message,Time:array[array.length - 1]?.createdAt}
                            const userRef = doc(db, "users", User.id);
                            return await updateDoc(userRef, data)
                          }
                          CloseData();
                    })

                    const qchatUser = doc(db, "users", User.id)
                    onSnapshot(qchatUser, (snapshot) => {
                        setchatUsers({ ...snapshot.data(), id: snapshot.id })
                    })
                } catch (error) {
                    console.log("error", error)
                }
            } catch (error) {
                console.log(error);
            }
        }
        GeCurentyUser();

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            async () => {
                try {
                    const userRef = doc(db, "users", user.id);
                    let update: any = {
                        ...user,
                        keyboard: User.id
                    }
                    await updateDoc(userRef, update)
                } catch (error) {
                    console.log(error);
                }
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            async () => {
                try {
                    const userRef = doc(db, "users", user?.id);
                    let update: any = {
                        ...user,
                        keyboard: null
                    }
                    return await updateDoc(userRef, update)
                } catch (error) {
                    console.log("error", error)
                }
            }
        );

    }, [])
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
                            <Text style={{ fontWeight: '600' }}>{User.name}</Text>
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
            {
                ChatDataFire?.length ? (
                    <AutoScrollFlatList
                        showsVerticalScrollIndicator={false}
                        showScrollToEndIndicator={false}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        data={ChatDataFire}
                        keyExtractor={(item, index: number) => `${index}`}
                        renderItem={({ item, index }) => {
                            const date = new Date(item?.createdAt?.seconds * 1000 + item?.createdAt?.nanoseconds / 1e6);
                            const timeString = date.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true, 
                              });
                              let time = timeString.slice(0,5);
                              let day = timeString.slice(8,11)
                            return (
                                currentUser.id === ChatDataFire[index].sender ? (
                                    <View style={[styles.ChatMain, {
                                        alignSelf: 'flex-end', borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderBottomLeftRadius: 10,
                                    }]} key={index}>
                                        <Text style={styles.chatTExt}>{item.message}</Text>
                                        <Text style={styles.Time}>{`${time} ${day}`}</Text> 
                                    </View>
                                ) : (
                                    <View style={[styles.ChatMain, {
                                        alignSelf: 'flex-start', borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }]} key={index}>
                                        <Text style={styles.chatTExt}>{item.message}</Text>
                                        <Text style={styles.Time}>{`${time} ${day}`}</Text> 
                                    </View>
                                )
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
            {
                chatUsers?.keyboard && chatUsers?.keyboard == currentUser?.id ?
                    (
                        <View style={{
                            width: 70,
                            borderRadius: 10,
                            height: 100,
                            backgroundColor: 'gray'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16
                            }}>Typing</Text>
                        </View>
                    ) : null
            }
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
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
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
        fontSize: 10,
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
})