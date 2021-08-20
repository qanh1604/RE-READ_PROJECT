import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Animated } from 'react-native'

const LiveDivider = () => {
    return(
        <View style={{width: 1, paddingVertical: 5}}>
            <View style={{
                flex: 1,
                borderLeftColor: '#EFEFF0',
                borderLeftWidth: 1,
            }}></View>
        </View>
    )
}

const DetailBooks = ({route, navigation}) => {

    const [data, setData] = React.useState([]);
    const [scrollViewholeHeight, setScrollViewholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

        React.useEffect(() => {
            let {data} = route.params;
            setData(data)
        }, [data])

    function renderBookInfoSection() {
        return(
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={{uri: data.uri}}
                    resizeMode="cover"
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                />

                <View
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(247,239,219,0.9)'
                    }}
                >

                </View>

                <View style={{ 
                    flexDirection: 'row',
                    paddingHorizontal: 12,
                    height: 80,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity
                        style={{ marginLeft: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../icons/back_arrow_icon.png')}
                            resizeMode="contain"
                            style={{ 
                                width: 25,
                                height: 25,
                                tintColor: '#000'
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ 
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 18, lineHeight: 22}}>Book Detail</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRight: 8 }}
                        onPress={() => console.log("Click More")}
                    >
                        <Image
                            source={require('../icons/more_icon.png')}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: '#000',
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>

                </View>

                <View style={{ 
                    flex: 5, 
                    paddingTop: 36,
                    alignItems: 'center',
                }}>
                    <Image
                        source={{uri: data.uri}}
                        resizeMode="contain"
                        style={{ 
                            flex: 1,
                            width: 150,
                            height: "auto"
                        }}
                    />
                </View>

                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, lineHeight: 30, color: '#000'}}>{data.name}</Text>
                    <Text style={{fontSize: 16, lineHeight: 30, color: '#000'}}>{data.author}</Text>
                </View>

                <View
                    style={{ 
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >

                    <View style={{ flex: 1, alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff'}}>{data.rating}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: '#fff'}}>Rating</Text>
                    </View>

                    <LiveDivider/>

                    <View style={{ flex: 1, alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff'}}>{data.pageNo}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: '#fff'}}>Chapter</Text>
                    </View>

                    <LiveDivider/>

                    <View style={{ flex: 1, alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff'}}>{data.language}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: '#fff'}}>Language</Text>
                    </View>

                </View>

            </View>
        )
    }

    function renderBookDescription() {

        const indicatorSize = scrollViewholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * 
        scrollViewVisibleHeight / scrollViewholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ?
        scrollViewVisibleHeight - indicatorSize: 1

        return(
            <View style={{ flex: 1, flexDirection: 'row', padding: 24}}>

                <View style={{ width: 4, height: "100%", backgroundColor: '#282C35'}}>
                    <Animated.View
                        style={{ 
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: '#7D7E84',
                            transform: [{
                                translateY: Animated.multiply(indicator, 
                                scrollViewVisibleHeight / scrollViewholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                <ScrollView
                    contentContainerStyle={{paddingLeft: 36}}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewholeHeight(height)
                    }}
                    onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: indicator}}}],
                        {useNativeDriver: false}
                    )}
                >
                    <Text style={{
                        fontSize: 20,
                        color: '#fff',
                        marginBottom: 24,
                        lineHeight: 30
                    }}>Description</Text>
                    <Text style={{
                        fontSize: 18,
                        color: '#64676D',
                        lineHeight: 30
                    }}>{data.description}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderBottomButton() {
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: '#25282F',
                        marginLeft: 24,
                        marginVertical: 8,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Image
                        source={require('../icons/bookmark_icon.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#EFEFF0'
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#F96D41',
                        marginHorizontal: 8,
                        marginVertical: 8,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Start Reading")}
                >
                    <Text style={{fontSize: 16, lineHeight: 22, color: '#fff'}}>Start Reading</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (data){
        return (
            <View style={{flex: 1, backgroundColor: '#1E1B26'}}>
                <View style={{ flex: 4 }}>
                    {renderBookInfoSection()}
                </View>

                <View style={{ flex: 2 }}>
                    {renderBookDescription()}
                </View>

                <View style={{height: 70}}>
                    {renderBottomButton()}
                </View>
            </View> 
        )
    }else{
        return (<></>)
    }

}

export default DetailBooks

const styles = StyleSheet.create({})
