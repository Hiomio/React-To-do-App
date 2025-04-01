import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather } from '../../services/api';

// Async Thunk for fetching weather
export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city, { rejectWithValue }) => {
        try {
            const response = await getWeather(city);
            return response.data; // This will populate the `fulfilled` case
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Populate the `rejected` case
        }
    }
);
