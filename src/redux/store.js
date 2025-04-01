import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer, weatherReducer, authReducer } from './reducers';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    weather: weatherReducer,
    auth: authReducer,
  }
});

export default store;
