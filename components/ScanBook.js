import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigate, Link, useParams } from 'react-router-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { apiService } from '../services/APIService';

export default function ScanBook({ mode }) {
    let { id } = useParams();
    let borrowOrReturn = id.length > 22 ? 'return' : 'borrow'

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

    const borrowOrReturnBookData = (borrowOrReturn, id) => {
        let data
        if (borrowOrReturn == 'borrow') {
            data = {
                user_id: id
            }
        } else {
            data = {
                date: null,
                user_id: null,
                spot_id: id
            }
        }
        return data
    }

    const handleBarCodeScanned = ({ type, data }) => {
        if (mode == 'Livre') {
            setScanned(true);

            let res = data.split('bookId')
            if (res.length == 1) return alert('apprends à lire')
            res = JSON.parse(res[0] + '"' + "bookId" + '"' + res[1])

            let updateData = borrowOrReturnBookData(borrowOrReturn, id)

            //triche éco ticket
            if (res.bookId == '63e50b1e8b98549100a6985c') res.bookId = '63ea12944bd6a95522e8486e'
            //

            apiService.put(`books/${res.bookId}`, updateData).then(res => console.log(res.message))
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
        backgroundColor: "blue",
        flex: 1
    },
}); 