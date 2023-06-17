import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';
import { UserPlaceholder } from '../../Resources/assets';
import { getDateTime, theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';

const ReceiverUserProfile = ({ data, isView, window }) => {
  const newTime = data?.dateTime
    ? new Date(
        data?.dateTime?.seconds * 1000 + data?.dateTime?.nanoseconds / 1000000
      )
    : '';
  const atTime = data?.dateTime ? newTime.toLocaleTimeString() : '';
  const time = data?.dateTime ? atTime : data?.created_at;
  const lastSince = getDateTime(newTime);
  return (
    <View style={{ marginLeft: window.width * 0.01, marginVertical: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            borderRadius: window.width * 0.2,
            height: window.width * 0.02,
            width: window.width * 0.02,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <TouchableOpacity
            style={{ borderRadius: window.width * 0.2, overflow: 'hidden' }}
            // onPress={() => onUserProfile(data?.id)}
          >
            <Image
              style={{
                height: window.width * 0.02,
                width: window.width * 0.02,
                borderRadius: window.width * 0.2,
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
            // onPress={() => onUserProfile(data?.id)}
            style={{ ...theme.fontBold, fontSize: 16, color: Colors.Black }}
          >
            {data?.name || ''}
          </Text>
          <Text
            style={{
              ...theme.fontRegular,
              fontSize: 12,
              color: Colors.CodGray,
              marginTop: 5,
            }}
          >
            {data?.status == 'online' ? data?.status : lastSince}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReceiverUserProfile;

const styles = StyleSheet.create({});
