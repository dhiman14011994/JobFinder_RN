import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { empty } from '../../Util/constant';
import Colors from '../../Resources/Colors';
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
      {!empty(item?.media) && (
        <View style={style.imageWebView}>
          <Image
            resizeMode={'contain'}
            style={style.postWebImage}
            defaultSource={PostPlaceholder}
            source={
              item?.media
                ? {
                    uri: EndPoint.baseAssestURL + item?.media,
                  }
                : PostPlaceholder
            }
          />
        </View>
      )}
    </View>
  );
};

export default PostDescription;
