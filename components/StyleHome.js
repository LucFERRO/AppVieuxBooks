import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const scannerQRStyles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'red',
        paddingVertical: 100,
        left: 0
    },
    title: {
        fontSize: 40
    },
    button: {
        borderRadius: 50,
        backgroundColor: "none",
        width: width / 2,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "gold",
        borderWidth: 2,
        backgroundColor: 'cyan',
    },
});