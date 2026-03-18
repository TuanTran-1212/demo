/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import BottomTabNavigator from './navigation/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { setUser, store } from './store';

const AppContent= () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authData = await AsyncStorage.getItem("auth");
        if (authData) {
          const { user, token } = JSON.parse(authData);
          const decoded: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            await AsyncStorage.removeItem("auth");
            return;
          }
          dispatch(setUser({ user, token }))
        }
      } catch (error) {
        console.log("Error", error);
        await AsyncStorage.removeItem("auth")
      }
    }
    initializeAuth()
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
export default App;
