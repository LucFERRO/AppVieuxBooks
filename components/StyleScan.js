import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const scannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "red",
  },
  full: {
    width: width,
    height: height * .6,
  },
  description: {
    borderColor: "black",
    borderWidth: 3,
    padding: 30,
    color: "black",
    backgroundColor: 'gold'
  }
});
