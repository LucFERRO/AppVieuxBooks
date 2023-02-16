import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Text, View, Pressable, ImageBackground } from 'react-native';
import { useNavigate, Link } from 'react-router-native'
import { homeStyle } from './StyleHome'
import { useState, useEffect, useRef } from 'react';

export default function Home() {

    const navigate = useNavigate()

    const switchScreen = (page) => {
        return navigate(`/${page}`)
    }

    return (
        <ImageBackground source={require('../assets/livreIA.png')} style={homeStyle.background}>
            <Text style={homeStyle.title}>App Vieux Books</Text>
            <Pressable onPress={() => switchScreen('card')} style={homeStyle.button}>
                <Text style={homeStyle.buttonText}>
                    Emprunter
                </Text>
            </Pressable>
            <Pressable onPress={() => switchScreen('spot')} style={homeStyle.button}>
                <Text style={homeStyle.buttonText}>
                    Rendre
                </Text>
            </Pressable>
            <StatusBar style="none" />
        </ImageBackground>
    );

}
