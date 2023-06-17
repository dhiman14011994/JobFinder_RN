import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { UserPlaceholder } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';

const CommentsView = ({ onUserProfile, item, containerStyle }) => {
  const viewUserProfile = (name) => {
    if (item.tagged_users[0]?.name) {
      var newLetter = name.split('');
      if (newLetter[0] == '@') {
        var afterChar = name.slice(1);
        var filteredArr = item.tagged_users.filter((val) =>
          val?.name?.toLowerCase().includes(afterChar.toLowerCase())
        );
        if (filteredArr.length !== 0) {
          onUserProfile(filteredArr[0]?.user_id || filteredArr[0]?.id);
        }
      } else {
        var filteredCharArr = item.tagged_users.filter((val) =>
          val.name.toLowerCase().includes(name.toLowerCase())
        );
        if (filteredCharArr.length != -1) {
          onUserProfile(filteredCharArr[0]?.user_id || filteredCharArr[0]?.id);
        }
      }
    } else {
      if (item.tagged_users.length == 1) {
        onUserProfile(item?.tagged_users[0]?.user_id || item?.tagged_users[0]);
      }
    }
  };

  const checkChar = ({ firstname, lastname }) => {
    var firstLetter = firstname.split('');
    var lastLetter = lastname.split('');
    if (firstLetter[0] !== '@') {
      return false;
    } else {
      if (lastLetter[0] == '@') {
        return false;
      } else {
        if (item?.tagged_users[0]?.name) {
          var afterChar = firstname.slice(1);
          var margeChar = `${afterChar} ${lastname}`;
          console.log('firstLetter', margeChar);
          const filteredArr = item.tagged_users.filter((val) =>
            val?.name?.toLowerCase().includes(margeChar.toLowerCase())
          );
          if (filteredArr.length == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  };
  return (
    <View
      style={[
        {
          paddingVertical: 12,
          flexDirection: 'row',
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={() => onUserProfile(item?.user_id)}>
        <Image
          style={{
            height: 33,
            width: 33,
            borderRadius: 22,
            borderColor: Colors.Blueberry,
            borderWidth: 1,
          }}
          defaultSource={UserPlaceholder}
          source={
            item?.image
              ? {
                  uri: EndPoint.baseAssestURL + item?.image,
                }
              : UserPlaceholder
          }
        />
      </TouchableOpacity>
      <View style={{ justifyContent: 'space-between', paddingLeft: 12 }}>
        <Text
          style={{
            ...theme.fontSemiBold,
            fontSize: fontResize(13),
            color: Colors.Black,
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            width: mxWidth * 0.95,
            flexDirection: 'row',
          }}
        >
          {item.comment.split(' ').map((it, i) => {
            if (it !== '') {
              var firstChar = it.split('');
              return (
                <Text
                  disabled={
                    firstChar[0] == '@'
                      ? false
                      : !checkChar({
                          firstname:
                            item.comment.split(' ')[i == 0 ? i : i - 1],
                          lastname: it,
                        })
                  }
                  onPress={() => {
                    viewUserProfile(it);
                  }}
                  style={{
                    ...theme.fontRegular,
                    fontSize: fontResize(15),
                    color:
                      firstChar[0] == '@'
                        ? Colors.Blueberry
                        : checkChar({
                            firstname:
                              item.comment.split(' ')[i == 0 ? i : i - 1],
                            lastname: it,
                          })
                        ? Colors.Blueberry
                        : Colors.Black,
                    marginLeft: 5,
                  }}
                >
                  {it}
                </Text>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

export default CommentsView;
