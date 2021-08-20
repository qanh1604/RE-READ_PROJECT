import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

const { width, height } = Dimensions.get('screen')

const Detail = ({ route, navigation }) => {
    // const { status, proValue } = route.params;
    // var status = route.params.status;
    // var ID = route.params.id;
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [pageNo, setPageNo] = useState('');
    const [readed, setReaded] = useState('');
    const [rating, setRating] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [uri, setUri] = useState('');


    const fSave = () => {
        const key = database().ref().push().key;
        console.log('key: ', key);
        database()
            .ref('/Products/' + key)
            .set({
                id: key,
                name: name,
                author: author,
                pageNo: pageNo,
                readed: readed,
                rating: rating,
                language: language,
                description: description,
                uri: uri,
            })
            .then(() => {
                navigation.goBack();
                console.log('data set')
            });

    }

    return (
        <View style={{ flex: 1, marginLeft: 20, marginTop: 10 }}>
            <Text>Name</Text>
            <TextInput value={name} placeholder="Enter name"
                onChangeText={(text) => setName(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Author</Text>
            <TextInput value={author} placeholder="Enter author"
                onChangeText={(text) => setAuthor(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Number of Page</Text>
            <TextInput value={pageNo.toString()} placeholder="Enter number of page"
                onChangeText={(text) => setPageNo(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Number of readed</Text>
            <TextInput value={readed} placeholder="Enter number of readed"
                onChangeText={(text) => setReaded(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Rating</Text>
            <TextInput value={rating.toString()} placeholder="Enter rating"
                onChangeText={(text) => setRating(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Language</Text>
            <TextInput value={language} placeholder="Enter language"
                onChangeText={(text) => setLanguage(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Description</Text>
            <TextInput value={description} placeholder="Enter description"
                onChangeText={(text) => setDescription(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>
            <Text>Uri image</Text>
            <TextInput value={uri} placeholder="Enter uri image"
                onChangeText={(text) => setUri(text)}
                style={{
                    borderBottomWidth: 1,
                    padding: 10,
                    width: width / 1.1,
                    height: 50,
                    margin: 5
                }}
            ></TextInput>

            <TouchableOpacity
                onPress={() => fSave()}
                style={{
                    backgroundColor: '#F96D41',
                    width: width / 1.1,
                    alignItems: 'center',
                    marginTop: 15,
                    padding: 10,
                    borderRadius: 8
                }}
            >
                <Text>SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Detail;
