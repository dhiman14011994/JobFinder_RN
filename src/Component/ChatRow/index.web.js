import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import style from './style';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import { UserPlaceholder } from '../../Resources/assets';
import PdfIcon from '../../Resources/assets/PdfIcon.png';

const ChatRow = ({
  data,
  userId,
  receiverData,
  viewDocumentFile,
  index,
  readIndex,
}) => {
  // const viewDocumentFile = data => {
  //   Linking.openURL(data);
  // };
  return (
    <View
      style={[
        style.containerWeb,
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
        <Text>{data.message}</Text>
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
          <Image
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
          <Image
            resizeMode="contain"
            style={style.imageView}
            source={PdfIcon}
          />
        </TouchableOpacity>
      )}
      {data.senderId == userId ? (
        index == readIndex ? (
          <Image
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
    </View>
  );
};

export default ChatRow;
