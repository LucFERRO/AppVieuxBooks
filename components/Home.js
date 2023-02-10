import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Text, View, Pressable } from 'react-native';
import { useNavigate, Link } from 'react-router-native'
import { scannerQRStyles } from './StyleHome'
import { useState, useEffect, useRef } from 'react';

export default function Home() {

    const navigate = useNavigate()

    const switchScreen = (page) => {
        return navigate(`/${page}`)
    }

    return (
        <View style={scannerQRStyles.container}>
            <Text>App Vieux Books</Text>
            <Pressable onPress={() => switchScreen('card')} style={scannerQRStyles.button}>
                <Text>
                    Emprunter un livre
                </Text>
            </Pressable>
            <Pressable onPress={() => switchScreen('spot')} style={scannerQRStyles.button}>
                <Text>
                    Rendre un livre
                </Text>
            </Pressable>
            <StatusBar style="none" />
        </View>
    );

}
