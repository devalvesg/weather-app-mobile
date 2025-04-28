import React, { useCallback, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, View } from 'react-native';
import { themeApp } from '@/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from "lodash";
import { fetchLocationForecast, fetchWeatherForecast } from '@/api/weather'
import { weatherImages } from '@/constants';

import { storeData, getData } from '@/utils/asyncStorage';

import * as Progress from 'react-native-progress';
import Loading from '@/components/Loading';

export function HomeScreen() {

    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
    const { current, location } = weather;

    function handleLocation(loc: string) {
        setLoading(true);
        setLocations([]);
        setShowSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
            //storeData('city', data);

        });

    }

    function handleSearch(value: string) {

        if (value.length > 1) {
            fetchLocationForecast({ cityName: value }).then(data => {
                setLocations(data);
            })
        }
    }

    async function fetchMyWeatherData() {

        //let myCity = await getData('city');
        let cityName = 'Maringa';
        //if (myCity) cityName = myCity;

        fetchWeatherForecast({
            cityName: cityName,
            days: '7'
        }).then(data => {
            setWeather(data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchMyWeatherData();
    }, [])

    return (
        <View className='flex-1 relative '>
            <Image
                blurRadius={70}
                source={require('@/assets/images/bg.png')}
                className='absolute h-full w-full'
            />

            {
                loading
                    ? (
                        <View className='flex-1 flex-row justify-center items-center'>
                            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
                        </View>
                    )
                    : (

                        <SafeAreaView className='flex flex-1 mt-20'>

                            {/* Input Search */}
                            <View style={{ height: '7%' }} className='mx-4 relative z-50'>
                                <View className='flex-row justify-end items-center rounded-full'

                                    style={{ backgroundColor: showSearch ? themeApp.colors.bgWhite(0.2) : 'transparent' }}>
                                    {
                                        showSearch
                                            ? (
                                                <TextInput

                                                    onChangeText={handleTextDebounce}
                                                    placeholder='Search city'
                                                    placeholderTextColor={'lightgray'}
                                                    className='pl-6 h-12 pb-1 flex-1 text-base text-white'
                                                />
                                            )
                                            : null
                                    }

                                    <TouchableOpacity
                                        style={{ backgroundColor: themeApp.colors.bgWhite(0.3) }}
                                        className='rounded-full p-3 m-1'
                                        onPress={() => setShowSearch(!showSearch)}
                                    >
                                        <MagnifyingGlassIcon size='25' color='white' />
                                    </TouchableOpacity>
                                </View>

                                {
                                    locations.length > 0 && showSearch
                                        ? (
                                            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                                                {
                                                    locations.map((loc, index) => {

                                                        let showBorder = index + 1 != locations.length;
                                                        let borderClass = showBorder ? 'border-b-2 border=b-gray-400' : '';

                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                className={'flex-row items-center border-0 p-3 px4 mb-1 ' + borderClass}
                                                                onPress={() => handleLocation(loc)}
                                                            >
                                                                <MapPinIcon size="20" color="gray" />
                                                                <Text className='text-black text-lg ml-2' >{loc?.name}, {loc?.region}, {loc?.country}</Text>
                                                            </TouchableOpacity>

                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                        : null
                                }
                            </View>

                            {/* forescast Section */}
                            <View className='mx-4 flex justify-around flex-1 mb-2'>
                                <Text className='text-white text-center text-2xl font-bold'>
                                    {location?.name},
                                    <Text className=' text-lg font-semibold text-gray-300 '>
                                        {' ' + location?.country}
                                    </Text>
                                </Text>

                                {/* weather image */}
                                <View className='flex-row justify-center'>
                                    <Image
                                        source={weatherImages[current?.condition?.text]}
                                        className='w-52 h-52'
                                    />
                                </View>

                                {/* degree celcius */}
                                <View className='space-y-2'>
                                    <Text className='text-center font-bold text-white text-6xl ml-5'>
                                        {current?.temp_c}&#176;
                                    </Text>
                                    <Text className='text-center font-bold text-white tracking-widest'>
                                        {current?.condition?.text}
                                    </Text>
                                </View>

                                {/* other stars */}
                                <View className='flex-row justify-between mx-4'>
                                    <View className='flex-row space-x-2 items-center'>
                                        <Image
                                            source={require('@/assets/icons/wind.png')}
                                            className='h-6 w-6'
                                        />
                                        <Text className='text-white font-semibold text-base'>{current?.wind_kph}km</Text>
                                    </View>
                                    <View className='flex-row space-x-2 items-center'>
                                        <Image
                                            source={require('@/assets/icons/drop.png')}
                                            className='h-6 w-6'
                                        />
                                        <Text className='text-white font-semibold text-base'>{current?.humidity}%</Text>
                                    </View>
                                    <View className='flex-row space-x-2 items-center'>
                                        <Image
                                            source={require('@/assets/icons/sun.png')}
                                            className='h-6 w-6'
                                        />
                                        <Text className='text-white font-semibold text-base'>
                                            {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* forecast for next days */}
                            <View className='mb-2 space-y-3'>
                                <View className='flex-row items-center mx-5 space-x-2'>
                                    <CalendarDaysIcon size='22' color='white' />
                                    <Text className='text-white text-base'>Daily forecast</Text>

                                </View>
                                <ScrollView
                                    horizontal
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    showsHorizontalScrollIndicator={false}
                                >

                                    {
                                        weather?.forecast?.forecastday?.map((item, index) => {

                                            const date = new Date(item.date);
                                            const options = { weekday: "long" };
                                            let dayName = date.toLocaleDateString("en-US", options);
                                            dayName = dayName.split(",")[0];

                                            return (
                                                <View
                                                    key={index}
                                                    className="mr-4 flex w-28 items-center justify-center space-y-1 rounded-lg py-3"
                                                    style={{ backgroundColor: themeApp.colors.bgWhite(0.15) }}
                                                >
                                                    <Image
                                                        source={weatherImages[item?.day?.condition?.text || "other"]}
                                                        className="h-11 w-14"
                                                    />
                                                    <Text className="text-white">{dayName}</Text>
                                                    <Text className="text-xl font-semibold text-white">
                                                        {item?.day?.avgtemp_c}&#176;
                                                    </Text>
                                                </View>
                                            );
                                        })}


                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    )
            }

        </View>

    );
}