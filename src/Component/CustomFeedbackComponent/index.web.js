import React, { memo } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import Type from "../../Constants/Type/type";
import { mxHeight, mxWidth } from "../../Util";
import { RadioOff, RadioOn } from "../../Resources/assets";

const CustomFeedbackWebComponent = ({ data, index, isSelected, setSelected }) => {
    return (
        <View style={style.container}>
            {data.type == Type.REPORT.TITLE ?
                <Text
                    style={style.textStyle}>
                    {data?.title}
                </Text>
                :
                data.type == Type.REPORT.SUBTITLE ?
                    <Text
                        style={style.noteStyle}>
                        {data?.title}
                    </Text>
                    :
                    data.type == Type.REPORT.NOTE
                        ?
                        <Text
                            style={[style.textStyle, { marginTop: mxHeight * 0.02 }]}>
                            {data?.title}
                        </Text>
                        :
                        data.type == Type.REPORT.REPORT_POST
                            ?
                            <Text
                                style={[style.textStyle, style.ReportStyle]} >
                                {data?.title}
                            </Text>
                            :
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setSelected()}>

                                <View style={style.radioContainer}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            height: 24,
                                            width: 24,
                                        }}
                                        source={isSelected == index ? RadioOn : RadioOff}
                                    />

                                    <Text
                                        style={[style.textStyle, { marginLeft: mxWidth * 0.01 }]}>
                                        {data?.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
            }
        </View>
    )
}

export default memo(CustomFeedbackWebComponent)