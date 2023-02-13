import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Text, View, Pressable } from 'react-native';
import ScannerQR from './ScanSpotUser'
import { scannerQRStyles } from './StyleHome'
import { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [borrowBook, setBorrowBook] = useState(false)
    const [returnBook, setReturnBook] = useState(false)

    const switchScreen = (bool) => {
        if (bool) return setBorrowBook(true)
        setReturnBook(true)
    }

    return (
        <View style={scannerQRStyles.container}>
            <Text>App Vieux Books</Text>
            <Pressable onPress={() => switchScreen(true)} style={scannerQRStyles.button}>
                <Text>
                    Emprunter un livre
                </Text>
            </Pressable>
            <Pressable onPress={() => switchScreen(false)} style={scannerQRStyles.button}>
                <Text>
                    Rendre un livre
                </Text>
            </Pressable>
            {/* <View style={styles.full}>
                <ScannerQR />
            </View> */}
            <StatusBar style="none" />
        </View>
    );

}
