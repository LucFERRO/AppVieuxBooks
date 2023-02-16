import { StyleSheet, Dimensions } from "react-native";
import * as colors from './Colors'

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const scannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  full: {
    width: width,
    height: height * .6,
  },
  description: {
    padding: 30,
    color: colors.orange,
    borderRadius: 10,
    backgroundColor: colors.purple,
    borderColor: colors.orange,
    borderWidth: 2,
    fontSize: 20
  }
});
