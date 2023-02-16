import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigate, Link, useParams } from 'react-router-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { apiService } from '../services/APIService';
import * as colors from './Colors'

export default function ScanBook({ mode }) {
    let { id } = useParams();
    let borrowOrReturn = id.length > 22 ? 'return' : 'borrow'

    const [loggedUser, setLoggedUser] = useState(null)
    const [scannedSpot, setScannedSpot] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
        if (borrowOrReturn == 'borrow') {
            apiService.get('list').then(response => {
                setLoggedUser(response.data.filter(user => user.code == id)[0])
            }).catch(error => console.log(error))
        } else {
            apiService.get('spots').then(response => {
                setScannedSpot(response.data.filter(spot => spot._id == id)[0])
            }).catch(error => console.log(error))
        }
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

    const handleBarCodeScanned = async ({ type, data }) => {
        if (mode == 'Livre') {
            setScanned(true);

            let res = data.split('bookId')
            if (res.length == 1) return alert('apprends à lire')
            res = JSON.parse(res[0] + '"' + "bookId" + '"' + res[1])

            let updateData = borrowOrReturnBookData(borrowOrReturn, id)

            //triche éco ticket

            //étiquette de gauche
            if (res.bookId == '63e50b1e8b98549100a6985c') res.bookId = '63eb48947bdb1f5f405cb610'

            //étiquette de droite
            if (res.bookId == '63ea12944bd6a95522e8486f') res.bookId = '63eb48c67bdb1f5f405cb613'
            //

            try {
                apiService.put(`books/${res.bookId}`, updateData)
                // .then(res => console.log(res.message)).catch(error => throw new Error(error))
            } catch (error) {
                throw new Error(error)
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if (!loggedUser && !scannedSpot) return

    return (
        <View style={styles.container}>
            {
                borrowOrReturn == 'borrow' ?
                    <Text style={styles.user}>{`${loggedUser.admin ? 'Admin' : ''} ${loggedUser.name}`}</Text>
                    :
                    <Text style={styles.spot}>{scannedSpot.address}</Text>
            }
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={`${borrowOrReturn == 'return' ? 'Rendre' : 'Emprunter'} un autre livre?`} onPress={() => setScanned(false)} />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        flex: 1
    },
    user: {
        fontSize: 40,
        fontWeight: '900',
        fontStyle: 'italic',
        color: colors.pink,
        textShadowColor: colors.orange,
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10,
    },
    spot: {
        fontSize: 20,
        fontWeight: '900',
        fontStyle: 'italic',
        color: colors.pink,
        textShadowColor: colors.orange,
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10,
    }
}); 