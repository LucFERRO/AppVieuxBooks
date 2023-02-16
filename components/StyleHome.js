import { StyleSheet, Dimensions } from 'react-native';
import * as colors from './Colors'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export const homeStyle = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 100,
        left: 0
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        fontStyle: 'italic',
        color: colors.pink,
        textShadowColor: colors.orange,
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 10,
    },
    button: {
        borderRadius: 50,
        width: width / 2,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.purple,
        borderColor: colors.orange,
        borderWidth: 2,
    },
    buttonText: {
        color: colors.orange,
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: '600'
    }
});