//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { backIcon, CancelSubscriptionIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import Strings from '../../Resources/Strings';
import CustomButton from '../../Component/CustomButton';
import { mxHeight, mxWidth } from '../../Util';
import DeleteConfirmation from '../../Component/DeleteConfirmation';
import DeleteSuccess from '../../Component/DeleteSuccess';
// create a component
const DeleteUser = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const window = useWindowDimensions();
    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader
                constainerStyle={{ paddingHorizontal: 12 }}
                leftButtons={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 26, width: 26 }}
                            source={backIcon}
                        />
                    </TouchableOpacity>
                }
                rightButtons={<></>}
                title={Strings.SUPPORT}
            />
            <View style={styles.subContainer}>

                <View style={{
                    width: window.width * 0.25,
                    height: window.width * 0.25,
                    backgroundColor: Colors.LightPink,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{
                            width: window.width * 0.10,
                            height: window.width * 0.10,
                        }}
                        resizeMode="contain"
                        source={CancelSubscriptionIcon}
                    />
                </View>
                <Text
                    style={{
                        margin: window.width * 0.05,
                        fontSize: 20,
                        color: Colors.Black,
                        ...theme.fontSemiBold,
                    }}
                >
                    {Strings.DELETE_ACCOUNT}
                </Text>
                <Text
                    style={{
                        marginHorizontal: window.width * 0.10,
                        fontSize: 14,
                        color: Colors.Black,
                        ...theme.fontMedium,
                        textAlign: 'center'
                    }}
                >
                   {Strings.DELETE_ACCOUNT_DESC}
                </Text>
                
            </View>

            <View style={{ width: '80%', marginHorizontal: '10%', position: 'absolute', bottom: 0 }}>
                <CustomButton
                    height={'60px'}
                    buttonContainer={[styles.buttonStyle, { marginBottom: '5%' }]}
                    text={Strings.DELETE_ACCOUNT}
                    textColor={Colors.White}
                    onPress={() => {
                        setModalVisible(true)
                    }}
                    fontFamily={"'Gilroy-SemiBold'"}
                    fontSize={'16px'}

                />
                <CustomButton
                    height={'60px'}
                    buttonContainer={[styles.buttonStyle, { marginBottom: '5%', backgroundColor: Colors.gray2 }]}
                    text={Strings.CANCEL}
                    textColor={Colors.Black}
                    onPress={() => {


                    }}
                    fontFamily={"'Gilroy-SemiBold'"}
                    fontSize={'16px'}
                />
            </View>

            <DeleteConfirmation modalVisible = {modalVisible}
            setModalVisible={setModalVisible} />


        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: Colors.White,
    },
    subContainer: {
        width:"100%",
        height:mxHeight * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    buttonStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Blueberry,
        borderRadius: 10,
        // position: 'absolute',
        // bottom: '3%',
    },
});


//make this component available to the app
export default DeleteUser;




