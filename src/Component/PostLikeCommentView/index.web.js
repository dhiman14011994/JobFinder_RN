import React from 'react';
import { View, Text } from 'react-native';
import style from './style';
import Strings from '../../Resources/Strings';

const PostLikeCommentView = ({ item }) => {
  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={style.likeText}>
          {item?.likes
            ? `${item?.likes || ''} ${Strings.LIKES}`
            : Strings.NO_LIKE}
        </Text>

        <Text style={style.comment}>
          {item?.comment && item?.comment?.length === 0
            ? Strings.NO_COMMENT
            : `${item?.comment?.length || ''} ${
                item?.comment?.length == 1 ? Strings.COMMENT : Strings.COMMENTS
              }`}
        </Text>
      </View>
      <Text style={style.shareText}>
        {item?.share
          ? item?.share == 1
            ? Strings.ONE_SHARE
            : `${item?.share} ${Strings.SHARES}`
          : Strings.ZERO_SHARE}
      </Text>
    </View>
  );
};

export default PostLikeCommentView;
