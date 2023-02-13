import { View, Text } from "react-native";
import { useState } from "react";
import BackButton from "./BackButton";
import ScannerQR from "./ScanSpotUser";
import { scannerStyles } from "./StyleScan";

export default function Scan({ buttonText }) {

    return (
        <View style={scannerStyles.container}>
            <Text style={scannerStyles.description}>Scannez votre {buttonText}</Text>
            <View style={scannerStyles.full}>
                <ScannerQR mode={buttonText} />
            </View>
            <View>
                <BackButton />
            </View>
        </View>
    );
}
