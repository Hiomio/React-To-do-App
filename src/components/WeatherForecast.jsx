import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/actions/weatherActions';

const WeatherForecast = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const { loading, weather, error } = useSelector((state) => state.weather);

    const handleFetchWeather = () => {
        if (city.trim() !== '') {
            dispatch(fetchWeather(city));
        }
    };

    const handleAutoLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeather(`${latitude},${longitude}`));
                },
                () => {
                    dispatch(fetchWeather('India')); // Default fallback
                }
            );
        } else {
            dispatch(fetchWeather('India')); // Default fallback
        }
    }, [dispatch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFetchWeather();
        }
    };

    useEffect(() => {
        handleAutoLocation();
    }, [handleAutoLocation]);

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-100 to-indigo-50 dark:from-indigo-900 dark:to-indigo-800 rounded-lg shadow-xl w-full mx-auto max-w-7xl">
            <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Weather Forecast</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter city name to override"
                        className="border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleFetchWeather}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 w-full sm:w-auto"
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={handleAutoLocation}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 mb-6 w-full"
                >
                    Detect Location
                </button>
            </div>
            <div>
                {loading && <p className="text-center text-gray-700 dark:text-gray-300">Loading weather data...</p>}
                {error && <p className="text-red-600 dark:text-red-400 text-center">{error}</p>}
                {weather && weather.forecast && (
                    <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
                        {weather.forecast.forecastday.map((day) => (
                            <div key={day.date} className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full md:w-1/3 lg:w-1/4 shadow-md">
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{day.date}</h3>
                                <div className="flex items-center mt-3">
                                    <img
                                        src={day.day.condition.icon}
                                        alt={day.day.condition.text}
                                        className="w-12 h-12 mr-6"
                                    />
                                    <div>
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                            {day.day.condition.text}, {day.day.avgtemp_c}°C
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">Max Temp: {day.day.maxtemp_c}°C</p>
                                        <p className="text-gray-600 dark:text-gray-300">Min Temp: {day.day.mintemp_c}°C</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherForecast;