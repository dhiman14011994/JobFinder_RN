import { View, FlatList, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import Strings from '../../Resources/Strings';
import { useState } from 'react';
import {
  BlockUser,
  CancelFilled,
  EyeClose,
  ReportFlag,
  shareIcon,
} from '../../Resources/assets';
import styles from './styles';
import CustomMoreComponent from '../Feed/more';
import { mxHeight, mxWidth } from '../../Util';
import Type from '../../Constants/Type/type';

const HidePost = ({ userName, onClick }) => {
  const [moreData, setMoreData] = useState([
    {
      title: Strings.MORE.I_DONT_WANT_TO_SEE_POST,
      icon: EyeClose,
    },
    {
      title: `${Strings.MORE.UNFOLLOW} ${userName}`,
      icon: CancelFilled,
    },
    {
      title: Strings.MORE.REPORT_POST,
      icon: ReportFlag,
    },
    {
      title: Strings.MORE.BLOCK_USER,
      icon: BlockUser,
    },
  ]);

  const renderMoreItem = ({ item, index }) => {
    return (
      <CustomMoreComponent
        data={item}
        onClick={() => {
          switch (index) {
            case 0: {
              onClick(Type.MORE.I_DONT_WANT_TO_SEE_POST);
              break;
            }
            case 1: {
              onClick(Type.MORE.UNFOLLOW);
              break;
            }
            case 2: {
              onClick(Type.MORE.REPORT_POST);
              break;
            }
            case 3: {
              onClick(Type.MORE.BLOCK);
              break;
            }
          }
        }}
      />
    );
  };

  return (
    <View style={styles.subContainer}>
      <FlatList bounces={false} data={moreData} renderItem={renderMoreItem} />
    </View>
  );
};

export default HidePost;
