import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigate, Link } from 'react-router-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { apiService } from '../services/APIService';

const list = [
    {
        "name": "Gaetan",
        "code": "43DZFDFR"
    },
    {
        "name": "Marc",
        "code": "ZAFH34R"
    },
    {
        "name": "LucF",
        "code": "A4JAF432"
    },
    {
        "name": "LucV",
        "code": "FZAEU3D3A"
    },
    {
        "name": "Nico",
        "code": "U34R543"
    },
    {
        "name": "Flo",
        "code": "IN43NI32"
    },
    {
        "name": "Léonard",
        "code": "FIF34R34R"
    },
    {
        "name": "Rémy",
        "code": "Ff3AF432"
    },
    {
        "name": "Vincent",
        "code": "1R3FAF"
    },
    {
        "name": "Ghedeon",
        "code": "343DJIE"
    },
    {
        "name": "Alexis",
        "code": "34RNJ3D"
    },
    {
        "name": "Brigitte",
        "code": "JI34NF32",
        "admin": true
    }
]

export default function ScannerBook({ mode }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

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
        if (mode == 'Livre') {
            setScanned(true);

            let res = data.split('spotId')

            if (res.length == 1) return alert('apprends à lire enculé')
            
            res = JSON.parse(res[0] + '"' + "spotId" + '"' + res[1])
            const chosenSpot = listSpot.filter(spot => spot._id == res.spotId)[0]
            if (!chosenSpot) return console.log('SPOT NOT FOUND')
            // apiService.post('list', data).then(res=>console.log(res))
            switchScreen('book')
        }
        // setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
        // width: 300,
        // height: 200,
        backgroundColor: "red",
        flex: 1
    },
}); 