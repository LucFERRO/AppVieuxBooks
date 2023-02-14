import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigate, Link } from 'react-router-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { apiService } from '../services/APIService';
import * as Speech from 'expo-speech';

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
            if (res.length == 1) {
                speak("apprend a lire !!")
                return alert('apprends à lire ')
            } 
            res = JSON.parse(res[0] + '"' + "memberId" + '"' + res[1])
            // const chosenUser = listUser.filter(user => user.code == res.memberId)[0]
            // apiService.post('list', data).then(res=> {
                // 
                // })
            // if (!chosenUser) return console.log('USER NOT FOUND')
            switchScreen(`book/${res.memberId}`)
        }
        
        if (mode == 'Code spot') {
            setScanned(true);
            console.log(data)
            let res = data.split('spotId')
            if (res.length == 1) return alert('apprends à lire enculé')
            res = JSON.parse(res[0] + '"' + "spotId" + '"' + res[1])
            // const chosenSpot = listSpot.filter(spot => spot._id == res.spotId)[0]
            // apiService.post('list', data).then(res=>console.log(res))
            // if (!chosenSpot) return console.log('SPOT NOT FOUND')
            switchScreen(`book/${res.spotId}`)
        }
    };

    if (hasPermission === null) {
        return <Text style={styles.errorMessage}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.errorMessage}>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: "red",
        flex: 1
    },
    errorMessage: {
        textAlign: 'center',
    }
}); 