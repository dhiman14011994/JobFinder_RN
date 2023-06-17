import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import style from './style';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import FastImage from 'react-native-fast-image';
import { UserPlaceholder } from '../../Resources/assets';
import { mxWidth } from '../../Util';

const ChatRow = ({
  data,
  userId,
  receiverData,
  viewDocumentFile,
  index,
  readIndex,
  lastSince,
}) => {
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor:
            data.senderId == userId
              ? Colors.Cultured
              : Colors.PaleCornflowerBlue,
          alignSelf: data.senderId == userId ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      {data.maessageType == 'text' ? (
        <Text
          style={{
            marginRight: data.maessageType == 'text' ? mxWidth * 0.1 : 0,
          }}
        >
          {data.message}
        </Text>
      ) : data.maessageType == 'image' ? (
        <TouchableOpacity
          onPress={() =>
            viewDocumentFile({
              data: EndPoint.baseAssestURL + data.message,
              type: data.maessageType,
            })
          }
          style={style.imageView}
        >
          <FastImage
            resizeMode="contain"
            style={style.imageView}
            source={{ uri: EndPoint.baseAssestURL + data.message }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={style.imageView}
          onPress={() =>
            viewDocumentFile({
              data: EndPoint.baseAssestURL + data.message,
              type: data.maessageType,
            })
          }
        >
          <FastImage
            resizeMode="contain"
            style={style.imageView}
            source={require('../../Resources/assets/PdfIcon.png')}
          />
        </TouchableOpacity>
      )}
      {data.senderId == userId ? (
        index == readIndex ? (
          <FastImage
            resizeMode="contain"
            style={style.userImageView}
            defaultSource={UserPlaceholder}
            source={
              receiverData?.image
                ? { uri: EndPoint.baseAssestURL + receiverData?.image }
                : UserPlaceholder
            }
          />
        ) : (
          <View />
        )
      ) : (
        <View />
      )}

      <Text style={{ textAlign: 'right', color: Colors.lightGray }}>
        {lastSince}
      </Text>
    </View>
  );
};

export default ChatRow;
