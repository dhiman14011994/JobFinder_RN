import {View, Text, TouchableOpacity, Image} from 'react-native-web';
import React from 'react';
import {mxWidth} from '../../Util';
import {addStoryIcon, dummyImage} from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import Colors from '../../Resources/Colors';
const StoriesCircleWeb = ({
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
              height: 60,
              width: 60,
              borderColor: '#C2C5CE',
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image style={{height: 40, width: 40}} source={addStoryIcon} />
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
              height: 60,
              width: 60,
              borderColor: alreadySeen ? '#828796' : '#99C24D',
              borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 56, width: 56, borderRadius: 30}}
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
              color: Colors.Black,
              // width: mxWidth * 0.19,
            }}>
            {item?.user?.name || ''}
          </Text>
        </View>
      )}
    </View>
  );
};
export default StoriesCircleWeb;
