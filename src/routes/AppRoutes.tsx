import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '@/screens/HomeScreen';

const { Screen, Navigator } = createStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Navigator>
        </NavigationContainer>
    );
}