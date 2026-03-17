import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import MealPlansScreen from '../screens/MealPlansScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import DishDetailScreen from '../screens/DishDetailScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const MealPlansStack = createNativeStackNavigator();
const CommunityStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
        <HomeStack.Screen name="Home" component={HomeScreen}/>
        <HomeStack.Screen name="DishDetail" component={DishDetailScreen}/>
    </HomeStack.Navigator>
)
const MealPlansStackScreen = () => (
    <MealPlansStack.Navigator screenOptions={{headerShown:false}}>
        <MealPlansStack.Screen name="MealPlans" component={MealPlansScreen} />
    </MealPlansStack.Navigator>
)
const CommunityStackScreen = () => (
    <CommunityStack.Navigator screenOptions={{headerShown:false}}>
        <CommunityStack.Screen name="Community" component={CommunityScreen} />
    </CommunityStack.Navigator>
)
const ProfileStackScreen = () => (
    <ProfileStack.Navigator screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
)

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == "Home") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name == "MealPlans") {
                        iconName = focused ? "restaurant" : "restaurant-outline"
                    } else if (route.name == "Community") {
                        iconName = focused ? "people" : "people-outline"
                    } else if (route.name == "Profile") {
                        iconName = focused ? "person" : "person-outline"
                    }
                    return <Ionicons name={iconName as any} size={size} color={color} />
                },
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "#666",
                headerShown: false,
            })}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="MealPlans" component={MealPlansStackScreen} />
            <Tab.Screen name="Community" component={CommunityStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({})