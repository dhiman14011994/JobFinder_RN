//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Dimensions, Image } from 'react-native';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { mxHeight, mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import CustomButton from '../../Component/CustomButton';
import { fontResize } from '../../Util/font';
import { splashPeople } from '../../Resources/assets';

// create a component
const OurMission = ({navigation}) => {
    const window = useWindowDimensions();
    const { width, height } = Dimensions.get("window")
    return (
        <View style={styles.container}>
            <Text
                style={styles.ourMissionTx}
            >
                {Strings.OUR_MISSION}
            </Text>

            <View style={styles.descriptionStyle}>
                <Text
                    style={styles.ourDetailTx}
                >
                    {Strings.OUR_DETAILS}
                </Text>
            </View>

            <View style={styles.triangleShape} />


            <Image
                resizeMode="contain"
                style={{ width: '100%', height: 300, marginTop: window.height * 0.06 }}
                source={splashPeople}
            />

            <CustomButton
                height={'60px'}
                buttonContainer={[styles.buttonStyle, { marginBottom: '5%' }]}
                text={Strings.OK}
                textColor={Colors.Blueberry}
                onPress={() => {
                    navigation.popToTop();
                }}
                fontFamily={"'Gilroy-SemiBold'"}
                fontSize={'16px'}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Blueberry,
        padding: mxWidth * 0.06
    },
    ourMissionTx: {
        ...theme.fontSemiBold,
        width: '100%',
        color: Colors.White,
        fontSize: fontResize(30),
        marginTop: mxHeight * 0.06,
    },
    ourDetailTx: {
        ...theme.fontSemiBold,
        width: '100%',
        color: "#56555F",
        fontSize: fontResize(16),
        padding: 10,
        textAlign: 'justify',
        lineHeight: 25,

    },
    descriptionStyle: {
        backgroundColor: Colors.White,
        marginTop: mxHeight * 0.03,
        borderRadius: 10,
        padding: mxWidth * 0.03,
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.White,
        borderRadius: 10
    },
    triangleShape: {
        width: 0,
        height: 0,
        transform: [{skewY: '45deg'}],
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 50,
        marginTop:-20,
        marginStart:mxWidth * 0.15,
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white'
      }
});

//make this component available to the app
export default OurMission;
