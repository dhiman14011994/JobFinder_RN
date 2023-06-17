import { StyleSheet } from "react-native";
import Colors from "../../Resources/Colors";
import { mxHeight, mxWidth } from "../../Util";
import { fontResize } from "../../Util/font";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: 200,
        height: 200,
    },
    mainText: {
        paddingRight: mxWidth * 0.1,
        paddingLeft: mxWidth * 0.1,
        paddingTop: mxHeight * 0.03,
        paddingBottom: mxHeight * 0.02
    },
    subText:{
        paddingRight: mxWidth * 0.1,
        paddingLeft: mxWidth * 0.1,
        alignSelf: 'center',
        textAlign: 'center'
      }


});
export default styles;

