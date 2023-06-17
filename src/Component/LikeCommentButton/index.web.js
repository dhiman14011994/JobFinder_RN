import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ActivethumbsUpIcon,
  BlockUser,
  CancelFilled,
  EyeClose,
  ReportFlag,
  messageIcon,
  moreIcon,
  shareIcon,
  thumbsUpIcon,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import HidePost from '../HidePost';
import style from './style';
import EndPoint from '../../Redux/constants/EndPoint';
import Type from '../../Constants/Type/type';
import { CustomText } from '../CustomComponent';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { mxHeight } from '../../Util';
import Strings from '../../Resources/Strings';

const LikeCommentButton = ({
  onLike,
  onComment,
  onShare,
  onHide,
  item,
  userId,
  SeeMoreDetails,
}) => {
  const toolTipRef = useRef(null);
  let isId = item?.like?.findIndex((element) => element.user_id == userId);
  const [showMore, setShowMore] = useState(false);
  const [hideModal, sethideModal] = useState(false);
  const [hideType, setHideType] = useState('');

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <TouchableOpacity
          onPress={() => onLike(item?._id)}
          style={style.likeButton}
        >
          <Image
            resizeMode="contain"
            style={style.likeImage}
            source={isId == -1 ? thumbsUpIcon : ActivethumbsUpIcon}
          />
          <Text style={style.likeText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onComment(item?.comment, item?._id)}
          style={style.commentButton}
        >
          <Image
            resizeMode="contain"
            style={style.likeImage}
            source={messageIcon}
          />
          <Text style={style.likeText}>Comment</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            onShare(item?._id);
          }}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 22, width: 22 }}
            source={shareIcon}
          />
          <Text
            style={{
              ...theme.fontRegular,
              fontSize: 12,
              color: '#777E90',
              paddingLeft: 6,
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
        {item?.user_id !== userId && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}
            onPress={() => {
              if (item?.user_id !== userId) {
                SeeMoreDetails();
              }
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 22, width: 22 }}
              source={moreIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LikeCommentButton;
