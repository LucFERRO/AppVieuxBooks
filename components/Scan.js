import { View, Text } from "react-native";
import BackButton from "./BackButton";
import ScannerQR from "./ScannerQR";
import { scannerStyles } from "./StyleScan";

export default function Scan({ buttonText }) {
  return (
    <View style={scannerStyles.container}>
      <Text style={scannerStyles.description}>Scannez votre {buttonText}</Text>
      <View style={scannerStyles.full}>
        <ScannerQR />
      </View>
      <View>
        <BackButton />
      </View>
    </View>
  );
}
