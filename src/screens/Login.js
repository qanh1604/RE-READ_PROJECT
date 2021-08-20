import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Dimensions, ToastAndroid, ImageBackground, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameAdmin, setUsernameAdmin] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');

    useEffect(() => {
        const getData = async () => {
            await database()
                .ref('/Manager/admin')
                .on('value', (snapshot) => {
                    setUsernameAdmin(snapshot.val().username);
                    setPasswordAdmin(snapshot.val().password);
                })
        }
        getData();
    }, []);

    const checkRole = () => {
        if (email == usernameAdmin && password == passwordAdmin) {
            ToastAndroid.show('Welcome Admin', ToastAndroid.SHORT);
            navigation.navigate('Products');
        } else {
            check();
        }
    }

    const check = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate('BottomNav');
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
            <View>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Email Address"
                    onChangeText={(text) =>
                        setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => checkRole()}
            >
                <Text
                    style={styles.buttonText}>
                    Sign In
                </Text>
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
            >Don't have an account?</Text>

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Register')}>
                <Text
                    style={styles.navButtonText}>
                    Sign Up
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login

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
        marginBottom: 50,
        fontFamily: 'AkayaTelivigala-Regular'
    },
    navButton: {
        position: 'absolute',
        right: 40,
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
        marginTop: 50,
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
        lineHeight: 22,
        color: '#FFFFFF',
    },
})
