import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, ImageBackground, Alert, useEffect, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
let realm;

var houseSelected;

export default class CheckList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: '',
            FlatListItems: [],
            notFound: 'No Quality Checks Found',
        }

        realm = new Realm({ path: 'QualitySheetDatabase.realm' });
        var user_details = realm.objects('quality_sheet');
        this.state = {
            FlatListItems: user_details,
        };


    }


    componentDidMount() {




    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };
    render() {
        return (
            <View>
                <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>

                    {this.state.FlatListItems.length === 0 ? (<Text style={styles.message}>{this.state.notFound}</Text>) :
                        <FlatList
                            data={this.state.FlatListItems}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ backgroundColor: 'transparent', margin: 20 }}>
                                    <Text style={styles.textStyling}>Auditor Name:       {item.auditor_name}</Text>
                                    <Text style={styles.textStylingSpace}>House Number:    {item.house_number}</Text>
                                    <Text style={styles.textStylingSpace}>Row Number:        {item.row_number}</Text>
                                    <Text style={styles.textStylingSpace}>Week Number:      {item.week_number}</Text>
                                    {item.quality_percent <= 85 ? (<Text style={styles.textStylingSpace}>Quality Percent:   <Text style={styles.redColor}>{item.quality_percent}%</Text></Text>) : (<Text style={styles.textStylingSpace}>Quality Percent:   <Text style={styles.greenColor}>{item.quality_percent}%</Text></Text>)}
                                </View>
                            )}
                        />

                    }

                </ImageBackground>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#54B948',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    redColor: {

        color: 'red'

    },

    greenColor: {

        color: 'green'

    },
    submitText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        textAlign: 'center'

    },
    message: {
        padding: 16,
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      },
    textStyling: {

        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
        
    },

    textStylingSpace: {

        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },

    buttonContainer1: {
        //backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonContainer: {
        backgroundColor: '#D3D3D3',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontSize: 19,
        color: '#000000',
        fontWeight: 'bold',

    },

    backgroundImage: {

        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    TouchableOpacityStyle: {

        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {

        resizeMode: 'contain',
        width: 70,
        height: 70,
    },
    backgroundImage: {

        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    TouchableOpacityStyle2: {


        alignItems: 'center',
        justifyContent: 'center',
        right: 5,

    },

    FloatingButtonStyle2: {

        resizeMode: 'contain',
        width: 40,
        height: 40,
    },

    textInputStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "transparent"


    },
    text2: {
        color: '#0B5345',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 18,
        marginRight: 15,

    },

    text: {
        margin: 6,
        margin: 20,
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
    },
})