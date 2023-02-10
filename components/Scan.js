import { View, Text } from "react-native";
import BackButton from "./BackButton";
import ScannerQR from "./ScannerQR";
import { scannerStyles } from "./StyleScan";

export default function Scan({ buttonText, test = null}) {

  const [test, setTest] = useState(test)

  return (
    <View style={scannerStyles.container}>
      <Text style={scannerStyles.description}>Scannez votre {buttonText}</Text>
      <View style={scannerStyles.full}>
        <ScannerQR mode={buttonText} test={test} setTest={setTest}/>
      </View>
      <View>
        <BackButton />
      </View>
    </View>
  );
}
