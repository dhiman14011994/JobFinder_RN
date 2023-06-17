import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {mxWidth} from '../../Util';
import {addStoryIcon, UserPlaceholder} from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import Colors from '../../Resources/Colors';
import FastImage from 'react-native-fast-image';
const StoriesCircle = ({
  isMyStory,
  alreadySeen,
  item,
  onPressOnCreateStory,
  onPressViewStory,
}) => {
  return (
    <View>
      {isMyStory ? (
        <View style={{alignItems: 'center', marginRight: 22}}>
          <TouchableOpacity
            onPress={onPressOnCreateStory}
            style={{
              borderRadius: mxWidth * 0.2,
              height: mxWidth * 0.18,
              width: mxWidth * 0.18,
              borderColor: '#C2C5CE',
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: mxWidth * 0.08,
                width: mxWidth * 0.08,
                borderRadius: mxWidth * 0.2,
              }}
              source={addStoryIcon}
            />
          </TouchableOpacity>
          <Text
            style={{
              paddingTop: 12,
              fontSize: 13,
              fontFamily: 'Gilroy-Regular',
              color: Colors.Black,
            }}>
            Your Story
          </Text>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginRight: 22}}>
          <TouchableOpacity
            onPress={() => onPressViewStory(item)}
            style={{
              borderRadius: mxWidth * 0.2,
              height: mxWidth * 0.18,
              width: mxWidth * 0.18,
              borderColor: alreadySeen ? '#828796' : '#99C24D',
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <FastImage
              style={{
                height: mxWidth * 0.16,
                width: mxWidth * 0.16,
                borderRadius: mxWidth * 0.2,
              }}
              defaultSource={UserPlaceholder}
              source={{uri: EndPoint.baseAssestURL + item?.image}}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              paddingTop: 12,
              fontSize: 13,
              fontFamily: 'Gilroy-Regular',
              width: mxWidth * 0.19,
              color: Colors.Black,
            }}>
            {item?.name || ''}
          </Text>
        </View>
      )}
    </View>
  );
};
export default StoriesCircle;
