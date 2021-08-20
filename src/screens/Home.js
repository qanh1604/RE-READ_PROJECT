import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ImageBackground, Image, LogBox } from 'react-native'
import database from '@react-native-firebase/database';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import Couches from '../common/Couches'

const Home = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tls, setTls] = useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(1);

    useEffect(() => {
        const loadData = async () => {
            await database()
                .ref('/Products/')
                .on('value', (snapshot) => {
                    var dulieu = [];
                    console.log(snapshot);
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

        const loadCategoriesData = async () => {
            await database()
                .ref('/CategoriesData/')
                .on('value', (snapshot) => {
                    var dulieu = []
                    snapshot.forEach((child) => {
                        dulieu.push({
                            id: child.val().id,
                            categoryName: child.val().categoryName,
                        });
                        setCategories(dulieu);
                    })
                })
        }
        loadCategoriesData();
        loadData();
    }, []);
    console.log("Data: ", data);


    function renderCategoryHeader() {

        <View style={{ flex: 1, paddingLeft: 24 }}>
            <FlatList
                data={categories}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={{ flex: 1, marginRight: 24 }}
                        onPress={() => setSelectedCategory(item.id)}
                    >
                        {
                            selectedCategory == item.id &&
                            <Text style={{ color: 'black' }}>{item.categoryName}</Text>
                        }
                        {
                            selectedCategory != item.id &&
                            <Text style={{ color: 'lightGray' }}>{item.categoryName}</Text>
                        }
                    </TouchableOpacity>
                }
                keyExtractor={item => `${item.id}`}
                horizontal
            />
        </View>
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: "#25282F",
                paddingHorizontal: 20
            }}
        >
            <View style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 20,
                alignItems: "center",
            }}>
                <View style={{
                    width: "50%"
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: '#fff'
                    }}>Hello there!</Text>
                </View>
                <View style={{
                    width: "50%",
                    alignItems: "flex-end"
                }}>
                    <Image
                        source={require('../images/logo.png')}
                        style={{
                            width: 16,
                            height: 20,
                            tintColor: '#64676D'
                        }}
                    />
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginVertical: 30
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    elevation: 2,
                    width: "85%",
                    backgroundColor: "#fff",
                    paddingHorizontal: 20,
                    height: 35,
                    borderRadius: 10,
                    marginLeft: 1
                }}>
                    <Icon name="search"
                        size={22}
                        color="#4f4a4a"
                    />
                    <TextInput
                        placeholder="Search unique furniture..."
                        style={{
                            fontFamily: "Medium",
                            paddingHorizontal: 10,
                            fontSize: 12,
                        }}
                    />

                </View>

                <View style={{
                    alignItems: "center",
                    elevation: 2,
                    width: "10%",
                    backgroundColor: "#fff",
                    height: 35,
                    borderRadius: 10,
                    marginLeft: 10,
                    justifyContent: "center"
                }}>
                    <Image
                        source={require('../images/sort.png')}
                        style={{
                            width: 18,
                            height: 25
                        }}
                    />
                </View>

            </View>
            <View style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center"
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 18
                }}>
                    My Book
                </Text>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 5,
                    }}
                    onPress={() => console.log("See More")}
                >
                    <Text style={{ color: '#64676D', textDecorationLine: 'underline', alignSelf: 'flex-start', lineHeight: 22 }}>see more</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Couches
                        source={{ uri: item.uri }}
                        name={item.name}
                        onPress={() => navigation.navigate('DetailBooks', {
                            data: item
                        })}
                    // onPress={() => setData1()}
                    />
                )}
                keyExtractor={item => `${item.id}`}
                horizontal
            />
            <View style={{ flex: 1, marginTop: 12 }}>
                <View style={{ flex: 1, paddingLeft: 12 }}>
                    <FlatList
                        data={categories}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ flex: 1, marginRight: 24 }}
                                onPress={() => setSelectedCategory(item.id)}
                            >
                                {
                                    selectedCategory == item.id &&
                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#fff', lineHeight: 30 }}>{item.categoryName}</Text>
                                }
                                {
                                    selectedCategory != item.id &&
                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#64676D', lineHeight: 30 }}>{item.categoryName}</Text>
                                }
                            </TouchableOpacity>

                        }
                        keyExtractor={item => `${item.id}`}
                        horizontal
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 8 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, flexDirection: 'row' }}
                                    onPress={() => navigation.navigate('DetailBooks', {
                                        data: item
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
                                                fontFamily: 'Roboto-Bold', color: '#64676D'
                                            }}>{item.author}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
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

                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>

                                            {
                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 8,
                                                    marginRight: 8,
                                                    backgroundColor: '#213432',
                                                    height: 40,
                                                    borderRadius: 12
                                                }}
                                                >
                                                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: '#31Ad66' }}>Adventure</Text>
                                                </View>
                                            }
                                            {

                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 8,
                                                    marginRight: 8,
                                                    backgroundColor: '#31262F',
                                                    height: 40,
                                                    borderRadius: 12
                                                }}
                                                >
                                                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: '#C5505E' }}>Romance</Text>
                                                </View>
                                            }
                                            {

                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 8,
                                                    marginRight: 8,
                                                    backgroundColor: '#22273B',
                                                    height: 40,
                                                    borderRadius: 12
                                                }}
                                                >
                                                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: '#424BAF' }}>Drama</Text>
                                                </View>
                                            }
                                        </View>

                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 5, right: 15 }}
                                    onPress={() => console.log("Detail")}
                                >
                                    <Image
                                        source={require('../icons/bookmark_icon.png')}
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
            </View>


            <Text style={{
                marginTop: 20,
                color: "#fff",
                fontSize: 18,
            }}>
                Recommendations
            </Text>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            margin: 10,
                            justifyContent: 'center'
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

        </ScrollView >
    )

}

export default Home

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    }
})
