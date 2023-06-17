import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import Colors from '../../Resources/Colors';
import FastImage from 'react-native-fast-image';
import { PostPlaceholder } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import Strings from '../../Resources/Strings';
import style from './style';

const PostDescription = ({ userData, item }) => {
  const [showMore, setShowMore] = useState(false);
  const [numberOfLine, setNumberOfLine] = useState(0);

  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const onTextLayout = useCallback((e) => {
    setNumberOfLine(e.nativeEvent.lines.length);
  }, []);

  function empty(str) {
    if (str == '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View>
      <View style={style.container}>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={showMore ? undefined : 3}
          style={style.descriptionText}
        >
          {item?.description || ''}
        </Text>
        {numberOfLine >= 3 && (
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <Text style={{ color: Colors.Blueberry }}>
              {!showMore ? Strings.SEE_MORE : Strings.SEE_LESS}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {item?.media != '' && (
        <View style={style.imageView}>
          {typeof item?.media == 'string' ? (
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={style.postImage}
              defaultSource={PostPlaceholder}
              source={
                item?.media
                  ? {
                      uri: EndPoint.baseAssestURL + item?.media,
                      priority: FastImage.priority.high,
                    }
                  : PostPlaceholder
              }
            />
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={style.postImage}
              defaultSource={PostPlaceholder}
              source={
                item?.media
                  ? item?.media[0]?.type == 'image'
                    ? {
                        uri: EndPoint.baseAssestURL + item?.media[0].file,
                        priority: FastImage.priority.high,
                      }
                    : PostPlaceholder
                  : PostPlaceholder
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

export default PostDescription;
