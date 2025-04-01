import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
});

export const getWeather = (city) => api.get(`/forecast.json?key=8b781be9ead24848b9f161320252101&q=${city}&days=3`);
