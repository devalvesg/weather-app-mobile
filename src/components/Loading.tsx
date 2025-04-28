import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, Text, View } from 'react-native';

type LoadingProps = ActivityIndicatorProps & {

}

export default function Loading({ ...rest }: LoadingProps) {
    return (
        <View className='flex-1 justify-center items-center ' >
            <ActivityIndicator {...rest} />
            <Text className='text-white text-1xl pt-3'>Loading...</Text>
        </View>
    );
}