import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import database from '@react-native-firebase/database';

const Favourite = () => {
    const [data, setData] = useState([]);
    const [tls, setTls] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            await database()
                .ref('/Products/')
                .on('value', (snapshot) => {
                    var dulieu = [];
                    snapshot.forEach((child) => {

                        const loadGenre = async () => {
                            await database()
                                .ref('/Products/' + child.val().id + '/genre/')
                                .on('value', (snapshot) => {
                                    var tl = []
                                    snapshot.forEach((child1) => {
                                        tl.push({
                                            namechild: child1.val().name,
                                        });
                                    })
                                    setTls(tl);
                                })
                        }
                        loadGenre();
                        dulieu.push({
                            id: child.val().id,
                            name: child.val().name,
                            author: child.val().author,
                            pageNo: child.val().pageNo,
                            readed: child.val().readed,
                            genre: tls,
                            rating: child.val().rating,
                            language: child.val().language,
                            description: child.val().description,
                            uri: child.val().uri,
                        });
                        setData(dulieu);
                    });
                });
        }
        loadData();
    }, []);
    return (

        

        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View
                    style={{
                        flex: 1,
                        margin: 15,
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={{ uri: item.uri }}
                        resize="cover"
                        style={{
                            width: 170,
                            height: 250,
                            borderRadius: 10,
                        }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 8, marginLeft: 12 }}>
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
            )}
            keyExtractor={item => `${item.id}`}
            numColumns={'2'}
        />

    )
}

export default Favourite

const styles = StyleSheet.create({})
