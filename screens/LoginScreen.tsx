import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../store';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleAuth = async () => {
        const url = isLogin ? '/api/login' : '/api/register';
        const body = isLogin ? { email, password } : { name, email, password };

        const response = await axios.post(`http://localhost:3000${url}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const authData = { token: response.data.token, user: response.data.user };

        dispatch(setUser(authData));

        await AsyncStorage.setItem('auth', JSON.stringify(authData));
        navigation.navigate('Profile');
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        value={name}
                        placeholder="Name"
                        onChangeText={setName}
                        autoCapitalize='words'
                        placeholderTextColor='#666'
                    />
                )}
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Email"
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    placeholderTextColor='#666'
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    placeholderTextColor='#666'
                />
                <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                    <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>{isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        margin: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: 'white',
    },
    authButton: {
        backgroundColor: '#ff2d55',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
    },
    authButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    toggleText: {
        color: '#007AFF',
        textAlign: 'center',
        fontSize: 14,
    },
})