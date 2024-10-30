import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials } from '../../types/auth.types';

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('isAuth'),
  user: localStorage.getItem('user')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginCredentials>) => {
      if (action.payload.username === 'admin' && action.payload.password === 'admin') {
        state.isAuthenticated = true;
        state.user = action.payload.username;
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', action.payload.username);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;