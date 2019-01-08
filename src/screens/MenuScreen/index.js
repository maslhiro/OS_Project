import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
    StackActions,
    NavigationActions,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { FirebaseAuth } from '../../configs'

export class MenuScreen extends Component {

    onPress_Touchable = (name) => {
        let toStack = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: name })],
        });
        this.props.navigation.dispatch(toStack);
    }

    checkSignIn = () => {
        return FirebaseAuth.currentUser ? true : false
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.grid}>

                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.onPress_Touchable("Home") }}>
                        <Icon name="ios-home" color="black" size={50} />
                        <Text style={styles.text}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.props.navigation.push("SignIn") }}>
                        <Icon name="ios-log-in" color="black" size={40} />
                        <Text style={styles.text}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!this.checkSignIn()}
                        style={styles.button}
                        onPress={() => { this.props.navigation.push("Post") }}>
                        <Icon name="ios-paper-plane" color="black" size={40} />
                        <Text style={styles.text}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!this.checkSignIn()}

                        style={styles.button}
                        onPress={() => { this.onPress_Touchable("Profile") }}>
                        <Icon name="ios-contact" color="black" size={50} />
                        <Text style={styles.text}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this.onPress_Touchable("Home") }}>
                        <Icon name="ios-information-circle" color="black" size={50} />
                        <Text style={styles.text}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity

                        disabled={!this.checkSignIn()}
                        style={styles.button}
                        onPress={() => { FirebaseAuth.signOut().then(()=>alert("Log Out Successful")) }}>
                        <Icon name="ios-log-out" color="black" size={40} />
                        <Text style={styles.text}>Log Out</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}
