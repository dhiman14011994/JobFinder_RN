
import { View, Image } from "react-native";
import React from "react";
import styles from "./style";
import { Network } from "../../Resources/assets";
import { CustomText } from "../../Component/CustomComponent";
import { fontResize } from "../../Util/font";
import Colors from "../../Resources/Colors";
import Strings from "../../Resources/Strings";
import { mxHeight, mxWidth } from "../../Util";




const CheckInternet = () => {

    return (
        <View style={styles.container} >

            <Image source={Network} style={styles.imgStyle}></Image>
            <CustomText
                fontSize={fontResize(22)}
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.EerieBlack}
                style={styles.mainText}
            >
                {Strings.NO_NETWORK}
            </CustomText>
            <CustomText
                fontSize={fontResize(14)}
                fontFamily={'Gilroy-Medium'}
                textColor={Colors.EerieBlack}
                style={styles.subText}
            >
                {Strings.NO_NETWORK_DESCRIPTION}
            </CustomText>
            

        </View>
    );
};

export default CheckInternet;