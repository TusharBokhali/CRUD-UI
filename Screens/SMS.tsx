import { View, Text, StyleSheet, useColorScheme, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Link, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default function SMS() {
    const isDark = useColorScheme() == 'dark';
    const { goBack } = useNavigation<any>();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? 'black' : 'white' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons name='chevron-back' size={24} color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
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
                    <TouchableOpacity>
                        <AntDesign name='videocamera' size={24} color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='phone-outline' size={24} color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name='more-vert' size={24} color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }
})