import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation }) => {

    const Out = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        navigation.navigate('Login');
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <TouchableOpacity
                onPress={() => Out()}
                style={{
                    backgroundColor: '#F96D41',
                    padding: 15,
                    borderRadius: 8
                }}
            >
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
