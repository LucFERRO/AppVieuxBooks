import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import { useNavigate } from 'react-router-native'
import * as colors from './Colors'

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
                <Text style={Styles.text}>Retour</Text>
            </Pressable>
        </View>
    );
}

const Styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: colors.purple,
        borderColor: colors.orange,
        borderWidth: 2,
    },
    text: {
        color: colors.orange,
        fontSize: 20
    }
});