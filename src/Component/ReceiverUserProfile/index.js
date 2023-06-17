import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';
import { UserPlaceholder } from '../../Resources/assets';
import FastImage from 'react-native-fast-image';
import { getDateTime, theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';

const ReceiverUserProfile = ({ data, isView, item }) => {
  return (
    <View style={{ marginLeft: mxWidth * 0.05, marginVertical: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            borderRadius: mxWidth * 0.2,
            height: mxWidth * 0.12,
            width: mxWidth * 0.12,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            style={{ borderRadius: mxWidth * 0.2, overflow: 'hidden' }}
            // onPress={() => onUserProfile(data?.id)}
          >
            <FastImage
              style={{
                height: mxWidth * 0.12,
                width: mxWidth * 0.12,
                borderRadius: mxWidth * 0.2,
              }}
              resizeMode="cover"
              defaultSource={UserPlaceholder}
              source={
                data?.image
                  ? { uri: EndPoint.baseAssestURL + data?.image }
                  : UserPlaceholder
              }
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingLeft: 12 }}>
          <Text
            style={{
              ...theme.fontBold,
              fontSize: 16,
              color: Colors.Black,
              textTransform: 'capitalize',
            }}
          >
            {data?.name || ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReceiverUserProfile;

const styles = StyleSheet.create({});
