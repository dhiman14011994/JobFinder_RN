import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { UserPlaceholder } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import { theme } from '../../Util/constant';
import moment from 'moment';

const PostUserDetails = ({ onUserProfile, item }) => {
  var date = new Date(item?.created_at);
  var formatted = moment(date).format('D MMMM YYYY');
  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          borderRadius: mxWidth * 0.05,
          height: mxWidth * 0.05,
          width: mxWidth * 0.05,
          borderColor: Colors.yellow[400],
          borderWidth: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          style={{ borderRadius: mxWidth * 0.2, overflow: 'hidden' }}
          onPress={() => onUserProfile(item?.user_id)}
        >
          <Image
            style={{
              height: mxWidth * 0.05,
              width: mxWidth * 0.05,
              borderRadius: mxWidth * 0.2,
            }}
            resizeMode="cover"
            defaultSource={UserPlaceholder}
            source={
              item?.user?.image
                ? { uri: EndPoint.baseAssestURL + item?.user?.image }
                : UserPlaceholder
            }
          />
        </TouchableOpacity>
      </View>
      {/* // User Info */}
      <View style={{ justifyContent: 'space-around', paddingLeft: 12 }}>
        <Text
          onPress={() => onUserProfile(item?.user_id)}
          style={{ ...theme.fontBold, fontSize: 16, color: Colors.Black }}
        >
          {item?.user?.name || ''}
        </Text>
        {item?.user?.skill && (
          <Text
            style={{
              ...theme.fontRegular,
              fontSize: 14,
              color: Colors.CodGray,
            }}
          >
            {item?.user?.skill || ''}
          </Text>
        )}
        <Text
          style={{ ...theme.fontRegular, fontSize: 12, color: Colors.CodGray }}
        >
          {formatted}
        </Text>
      </View>
    </View>
  );
};

export default PostUserDetails;
