import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, Alert, Linking, View } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import SiteSelection from '../screens/SiteSelection'
import GerQualityActivity from '../screens/GerQualityActivity'
import FavQualityActivity from '../screens/FavQualityActivity'
import OhaQualityActivity from '../screens/OhaQualityActivity'
import ScreenNavigator from '../screens/ScreenNavigator'
import CheckList from '../screens/CheckList'
import HarQualityActivity from '../screens/HarQualityActivity'


const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer>



            <Stack.Navigator
                initialRouteName='SiteSelection'

                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2C903D'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false
                }

                }



                headerMode='float'>


                <Stack.Screen name='SiteSelection' component={SiteSelection} options={{ title: 'T&G Global' }} />


                <Stack.Screen name='GerQualityActivity' component={GerQualityActivity} options={({ navigation }) => ({
                    headerRight: () =>
                        <View style={{ margin: 5 }}>

                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                onPress={() => navigation.navigate('CheckList')}>
                                <Image source={require('../assets/menu32.png')}

                                    style={styles.FloatingButtonStyle2} />

                            </TouchableOpacity>

                            <View style={{
                                marginRight: 3
                            }}></View>
                        </View>
                    , title: 'T&G Global', headerLeft: () => null
                })} />

              

                <Stack.Screen name='HarQualityActivity' component={HarQualityActivity} options={({ navigation }) => ({
                    headerRight: () =>
                        <View style={{ margin: 5 }}>

                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                onPress={() => navigation.navigate('CheckList')}>
                                <Image source={require('../assets/menu32.png')}

                                    style={styles.FloatingButtonStyle2} />

                            </TouchableOpacity>

                            <View style={{
                                marginRight: 3
                            }}></View>
                        </View>
                    , title: 'T&G Global', headerLeft: () => null
                })} />

                <Stack.Screen name='FavQualityActivity' component={FavQualityActivity} options={({ navigation }) => ({
                    headerRight: () =>
                        <View style={{ margin: 5 }}>

                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                onPress={() => navigation.navigate('CheckList')}>
                                <Image source={require('../assets/menu32.png')}

                                    style={styles.FloatingButtonStyle2} />

                            </TouchableOpacity>

                            <View style={{
                                marginRight: 3
                            }}></View>
                        </View>
                    , title: 'T&G Global', headerLeft: () => null
                })} />

                <Stack.Screen name='OhaQualityActivity' component={OhaQualityActivity} options={({ navigation }) => ({
                    headerRight: () =>
                        <View style={{ margin: 5 }}>

                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                onPress={() => navigation.navigate('CheckList')}>
                                <Image source={require('../assets/menu32.png')}

                                    style={styles.FloatingButtonStyle2} />

                            </TouchableOpacity>

                            <View style={{
                                marginRight: 3
                            }}></View>
                        </View>
                    , title: 'T&G Global', headerLeft: () => null
                })} />

                <Stack.Screen name='ScreenNavigator' component={ScreenNavigator} options={{ headerLeft: () => null, title: 'T&G Global' }} />

                <Stack.Screen name='CheckList' component={CheckList} options={{ title: 'T&G Global' }} />

            </Stack.Navigator>

        </NavigationContainer >



    )
}

const styles = StyleSheet.create({


    text: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 10
    },

    TouchableOpacityStyle11: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },


    TouchableOpacityStyle: {


        alignItems: 'center',
        justifyContent: 'center',
        right: 5,

    },

    FloatingButtonStyle2: {

        resizeMode: 'contain',
        width: 24,
        height: 24,
    },



    TouchableOpacityStyle2: {


        alignItems: 'center',
        justifyContent: 'center',
        right: 5,

    },


})



export default MainStackNavigator