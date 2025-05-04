import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import filesReducer from '../features/files/filesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    files: filesReducer,
  },
});

export default store;
