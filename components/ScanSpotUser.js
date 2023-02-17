import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigate, Link } from 'react-router-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { apiService } from '../services/APIService';
import * as Speech from 'expo-speech';
import * as colors from './Colors'

export default function ScanSpotUser({ mode }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const speak = async (text) => {
        Speech.speak(text);
    };

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const navigate = useNavigate()

    const switchScreen = (page) => {
        return navigate(`/${page}`)
    }

    const handleBarCodeScanned = ({ type, data }) => {

        if (mode == 'Carte membre') {
            setScanned(true);
            let res = data.split('memberCard')
            if (res.length == 1) return speak(("Scanner votre carte membre."))
            res = JSON.parse(res[0] + '"' + "memberId" + '"' + res[1])
            switchScreen(`book/${res.memberId}`)
        }

        if (mode == 'Code spot') {
            setScanned(true);
            let res = data.split('spotId')
            if (res.length == 1) return speak(("Scanner la carte spot."))
            res = JSON.parse(res[0] + '"' + "spotId" + '"' + res[1])

            // //étiquette de gauche
            // if (res.spotId == '63e4ed537d91ea19bcc06259') res.spotId = '63ef5979e88feace472348f4'

            // //étiquette de droite
            // if (res.spotId == '63e4ed95a4783b73dae3faf1') res.spotId = '63ef5964e88feace472348f2'

            switchScreen(`book/${res.spotId}`)
        }
    };

    if (hasPermission === null) {
        return <Text style={styles.errorMessage}>En attente de la caméra.</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.errorMessage}>Accès à la caméra refusé.</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Réessayer'} onPress={() => setScanned(false)} />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '900',
        fontStyle: 'italic',
        color: colors.pink,
        textShadowColor: colors.orange,
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10,
        zIndex: 10
    }
}); 