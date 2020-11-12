import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


export default class logout extends React.Component {

    constructor(props) {
        super(props)




    }


    componentDidMount() {
        AsyncStorage.clear();
        console.log("Async Storage Cleared");
        this.props.navigation.navigate('SiteSelection')
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>OHA Home Screen</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})






