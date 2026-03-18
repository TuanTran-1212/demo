import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createSlice} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface AuthState {
  user: { id: string; email: string; name: string } | null;
  token: string | null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    } as AuthState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem('auth');
        },
    },
})

export const {setUser, logout} = authSlice.actions;
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// ===== TYPES HOOK =====
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ===== CUSTOM HOOK =====
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;