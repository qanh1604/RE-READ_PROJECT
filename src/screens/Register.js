import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Dimensions, Image } from 'react-native'
import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            <Image
                source={require('../images/logo.png')}
                resizeMode="cover"
                style={{
                    width: 150,
                    height: 100,
                    marginBottom: 5
                }}
            />

            <Text style={styles.text}>RE:READ</Text>
            <TextInput style={styles.input} value={email} placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={() => Reg(email, password)}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                marginBottom: 15,
                marginLeft: 40,
                color: '#000',
                fontSize: 18
            }}
            >Already have an account?</Text>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Register

function Reg(em, pw) {
    auth()
        .createUserWithEmailAndPassword(em, pw)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(247,239,219,0.9)'
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
    },
    navButton: {
        position: 'absolute',
        marginLeft: 80,
        right: 110,
        marginBottom: 15,
        bottom: 0,
    },
    navButtonText: {
        fontSize: 18,
        color: '#424BAF',
    },
    input: {
        padding: 10,
        marginBottom: 10,
        width: width / 1.2,
        height: height / 15,
        fontSize: 16,
        borderBottomWidth: 1,
    },
    buttonContainer: {
        marginTop: 80,
        width: width / 1.2,
        height: height / 15,
        backgroundColor: '#F96D41',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
})
