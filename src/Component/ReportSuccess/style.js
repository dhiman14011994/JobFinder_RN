import { StyleSheet } from "react-native";
import { mxHeight, mxWidth } from "../../Util";
import { theme } from "../../Util/constant";
import { fontResize } from "../../Util/font";
import Colors from "../../Resources/Colors";

export const style = StyleSheet.create({
    container: {
        paddingHorizontal: mxWidth * 0.03,
        paddingVertical: mxHeight * 0.01,
        borderWidth: 1,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: Colors.PrimaryLightGray,
    },

    titleStyle: {
        width: mxWidth * 0.6,
        ...theme.fontBold,
        fontSize: fontResize(20),
        color: Colors.Black,
    },

    subTitleStyle: {
        paddingVertical: mxHeight * 0.01,
        ...theme.fontSemiBold,
        fontSize: fontResize(15),
        color: Colors.DimGray,
    },

    containerWeb: {
        paddingHorizontal: mxWidth * 0.01,
        paddingVertical: mxHeight * 0.01,
        backgroundColor: Colors.White,
        marginBottom: mxHeight * 0.02
    },

})