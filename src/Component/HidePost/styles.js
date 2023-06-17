import { StyleSheet } from "react-native";
import Colors from "../../Resources/Colors";
import { mxHeight, mxWidth } from "../../Util";

const styles = StyleSheet.create({
    subContainer: {
        width: mxWidth,
        backgroundColor: Colors.White,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        paddingHorizontal: mxWidth * 0.03,
        paddingVertical: mxHeight * 0.02,
    },
});
export default styles;
