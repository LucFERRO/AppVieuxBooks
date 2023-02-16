import { View, Text, ImageBackground } from "react-native";
import { useState } from "react";
import BackButton from "./BackButton";
import ScanSpotUser from "./ScanSpotUser";
import ScanBook from "./ScanBook";
import { scannerStyles } from "./StyleScan";

export default function Scan({ buttonText }) {

    return (
        <ImageBackground source={require('../assets/livreIA.png')} style={scannerStyles.container}>
            <Text style={scannerStyles.description}>Scannez votre {buttonText}</Text>
            <View style={scannerStyles.full}>
                {buttonText == 'Livre' ? <ScanBook mode={buttonText} /> : <ScanSpotUser mode={buttonText} />}
            </View>
            <View>
                <BackButton />
            </View>
        </ImageBackground>
    );
}
