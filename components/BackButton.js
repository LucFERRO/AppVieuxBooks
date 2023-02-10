import { View, Text, Pressable,StyleSheet, Dimensions } from 'react-native'
import { useNavigate } from 'react-router-native'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function BackButton() {

    const navigate = useNavigate()

    const back = () => {
        return navigate(-1)
    }


  return (
    <View>
      <Pressable onPress={() => back()} style={Styles.button}>
        <Text>Retour</Text>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        backgroundColor: "none",
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "gold",
        borderWidth: 2,
        backgroundColor: 'gold',
       },
  });