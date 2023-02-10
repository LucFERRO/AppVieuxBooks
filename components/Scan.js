import { View, Text } from 'react-native'
import ScannerQR from './ScannerQR'

export default function Scan({ buttonText }) {
    return (
        <View>
            <Text>{buttonText}</Text>
            <View style={styles.full}>
                <ScannerQR />
            </View>
        </View>
    )
}