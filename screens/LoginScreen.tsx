import { StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
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
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const API_BASE = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

    const handleAuth = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!email || !password || (!isLogin && !name)) {
            setErrorMessage('Name, email, and password are required.');
            return;
        }

        const url = isLogin ? '/api/login' : '/api/register';
        const body = isLogin ? { email, password } : { name, email, password };
        console.log('[Auth] Calling', `${API_BASE}${url}`, body);

        try {
            const response = await axios.post(`${API_BASE}${url}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });

            const authData = { token: response.data.token, user: response.data.user };
            dispatch(setUser(authData));
            await AsyncStorage.setItem('auth', JSON.stringify(authData));

            if (isLogin) {
                setSuccessMessage('Login success!');
            } else {
                setSuccessMessage('Registration successful. You are now logged in.');
            }
            navigation.navigate('Profile');
        } catch (error: any) {
            console.error('Auth error:', error?.response?.data ?? error.message ?? error);
            const serverMessage = error?.response?.data?.message;
            setErrorMessage(serverMessage || error?.message || 'Network error. Check backend server.');
        }
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
                {errorMessage ? <Text style={[styles.errorText, { color: '#ff4d4f' }]}>{errorMessage}</Text> : null}
                {successMessage ? <Text style={[styles.errorText, { color: '#2e7d32' }]}>{successMessage}</Text> : null}
                <TouchableOpacity onPress={() => {
                    setErrorMessage('');
                    setSuccessMessage('');
                    setIsLogin(!isLogin);
                }}>
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
    errorText: {
        color: '#ff4d4f',
        textAlign: 'center',
        marginBottom: 10,
    },
})