import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';

const Products = ({ navigation }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            await database()
                .ref('/Products/')
                .on('value', (snapshot) => {
                    var dulieu = [];
                    snapshot.forEach((child) => {
                        dulieu.push({
                            id: child.val().id,
                            name: child.val().name,
                            author: child.val().author,
                            pageNo: child.val().pageNo,
                            readed: child.val().readed,
                            rating: child.val().rating,
                            language: child.val().language,
                            description: child.val().description,
                            uri: child.val().uri,
                        });
                        setData(dulieu);
                    })
                })
        }
        getData();
    }, []);
    console.log('data: ', data);

    return (

        <View style={{ flex: 1, backgroundColor: '#25282F', padding: 20 }}>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff', fontFamily: 'Roboto-Bold' }}>Book List</Text>
            </View>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 35,
                    top: 20,
                }}
                onPress={() => navigation.navigate('Detail')}>
                <Image
                    source={require('../icons/plus_icon.png')}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: '#64676D',
                        backgroundColor: '#fff',
                    }}
                />
            </TouchableOpacity>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 8 }}>
                        <TouchableOpacity
                            style={{ flex: 1, flexDirection: 'row' }}
                            onPress={() => navigation.navigate('UpdateBook', {
                                id: item.id,
                            })}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                resizeMode="cover"
                                style={{ width: 100, height: 150, borderRadius: 10 }}
                            />

                            <View
                                style={{ flex: 1, marginLeft: 8 }}
                            >
                                <View>
                                    <Text style={{
                                        paddingRight: 24, fontSize: 20, lineHeight: 30,
                                        fontFamily: 'Roboto-Bold', color: '#fff'
                                    }}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: 18, lineHeight: 22,
                                        fontFamily: 'Roboto-Bold', color: '#64676D', marginTop: 8
                                    }}>Author: {item.author}</Text>
                                    <Text style={{
                                        fontSize: 18, lineHeight: 22,
                                        fontFamily: 'Roboto-Bold', color: '#64676D', marginTop: 8
                                    }}>Language: {item.language}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <Image
                                        source={require('../icons/page_filled_icon.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: '#64676D'
                                        }}
                                    />
                                    <Text style={{
                                        fontFamily: 'Roboto-Regular', fontSize: 18, lineHeight: 22,
                                        color: '#64676D', paddingHorizontal: 12
                                    }}>{item.pageNo}</Text>
                                    <Image
                                        source={require('../icons/read_icon.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: '#64676D'
                                        }}
                                    />
                                    <Text style={{
                                        fontFamily: 'Roboto-Regular', fontSize: 18, lineHeight: 22,
                                        color: '#64676D', paddingHorizontal: 12
                                    }}>{item.readed}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 5, right: 15 }}
                            onPress={() => {
                                try {
                                    database()
                                        .ref('/Products/' + item.id)
                                        .remove();
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        >
                            <Image
                                source={require('../icons/delete_icon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: '#64676D'
                                }}
                            >
                            </Image>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Products;