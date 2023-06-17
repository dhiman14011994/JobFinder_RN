import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from '../CustomComponent';
import { style } from './style';
import { CancelIcon } from '../../Resources/assets/ProfileAssets';
import Strings from '../../Resources/Strings';

const MyEventComponent = ({
  image,
  title,
  date,
  time,
  cancelPress,
  type,
  data,
}) => {
  console.log('eventDatat>>>', title, type);
  if (type == Strings.PROFESSIONAL) {
    return (
      <View style={[style.container, { justifyContent: 'space-between' }]}>
        <Image
          width={'50px'}
          height={'50px'}
          borderRadius={'10px'}
          resizeMode="cover"
          source={{ uri: image }}
        />
        <Text style={[style.titleTx, { width: '25%' }]}>{title}</Text>
        <View style={style.dateTimeVw}>
          <Text style={style.dateTx}>{date}</Text>
          <Text style={style.timeTx}>{time}</Text>
        </View>
        <TouchableOpacity
          onPress={cancelPress}
          style={{ position: 'absolute', top: 10, right: 15 }}
        >
          <Image
            width={'24px'}
            height={'24px'}
            resizeMode={'cover'}
            borderRadius={'24px'}
            source={CancelIcon}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={style.container}>
        <Image
          width={'50px'}
          height={'50px'}
          borderRadius={'10px'}
          resizeMode="cover"
          source={{ uri: image }}
        />

        <View style={{ marginLeft: '5%' }}>
          <Text style={style.titleTx}>
            {`${data?.userinfo?.name} | `}{' '}
            <Text style={{ color: '#777E90' }}>{`${data?.note}`}</Text>
          </Text>
          <Text style={style.dateTx}>{date}</Text>
          <Text style={style.timeTx}>{time}</Text>
        </View>
        <TouchableOpacity
          onPress={cancelPress}
          style={{ position: 'absolute', top: 10, right: 15 }}
        >
          <Image
            width={'24px'}
            height={'24px'}
            resizeMode={'cover'}
            borderRadius={'24px'}
            source={CancelIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default MyEventComponent;
