import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Products from '../screens/Products';
import BottomNav from './BottomNav';
import Detail123 from '../screens/Detail'
import Home from '../screens/Home';
import Profile from '../screens/Profile'
import DetailBooks from '../screens/DetailBooks'
import UpdateBook from '../screens/UpdateBook'
import Favourite from '../screens/Favourite'

const Stack = createStackNavigator();
const stackNavigatorOptions = {
  headerShown: false
}
function MainNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackNavigatorOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail123} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="DetailBooks" component={DetailBooks} />
        <Stack.Screen name="UpdateBook" component={UpdateBook} />
        <Stack.Screen name="Favourite" component={Favourite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav

const styles = StyleSheet.create({})
