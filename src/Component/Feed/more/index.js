import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "./style";
import { memo } from "react";

const CustomMoreComponent = ({ data, onClick }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onClick()
            }}
            activeOpacity={0.5}
            style={styles.buttonStyle}>
            <View style={styles.container}>
                <Image
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                    source={data?.icon}
                />
                <Text
                    style={styles.titleStyle}>{data?.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(CustomMoreComponent)