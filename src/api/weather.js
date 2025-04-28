import axios from 'react-native-axios';
import { apiKey } from "@/constants";

const forecastEndpoint = params =>
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationsEndpoint = params =>
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;


const apiCall = async (endpoint) => {

    const options = {
        method: 'GET',
        url: endpoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('Error Axios: ', error);
    }
}


export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocationForecast = params => {
    return apiCall(locationsEndpoint(params));
}


