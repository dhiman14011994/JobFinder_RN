import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Strings from "../../Resources/Strings";
import { style } from "./style";

const ReportSuccessComponent = ({ userName, setShow }) => {

    useEffect(() => {
        setTimeout(lastTimerCount => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        <View style={style.container}>
            <Text
                style={style.titleStyle}>
                {Strings.REPORT_POST.POST_REMOVED}
            </Text>

            <Text
                style={style.subTitleStyle}>
                {`${Strings.REPORT_POST.NO_LONGER_SEE_POST_1} ${userName} ${Strings.REPORT_POST.NO_LONGER_SEE_POST_2}`}
            </Text>
        </View>

    )
}

export default ReportSuccessComponent