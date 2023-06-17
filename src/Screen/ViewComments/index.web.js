import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
} from 'react-native-web';
import React, { useEffect, useState } from 'react';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import CustomInputText from '../../Component/CustomInputText';
import Strings from '../../Resources/Strings';
import EndPoint from '../../Redux/constants/EndPoint';

import CustomButton from '../../Component/CustomButton';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import { useSelector } from 'react-redux';
import CustomTagView from '../../Component/CustomTagView';

var textLength = 0;

const ViewCommentsWeb = ({
  comments,
  onSubmitComment,
  postId,
  onUserProfile,
}) => {
  const [textDescription, setTextDescription] = useState('');
  const allUsers = useSelector((state) => state.profile.allUser);
  const [allComments, setAllComments] = useState(comments);
  const [readMore, setReadMore] = useState(false);
  const window = useWindowDimensions();
  const [lastValue, setLastValue] = useState('');
  const [tagValue, setTagValue] = useState([]);
  const [istag, setTag] = useState(false);
  const [tagUser, setTagUser] = useState([]);
  const [commentText, setCommentText] = useState('');

  const addComment = (text) => {
    if (allComments.length == 0) {
      var newComment = {
        _id: user?.data?._id,
        comment: text,
        created_at: new Date(),
        image:
          type == Strings.PROFESSIONAL
            ? userInfo?.image
              ? userInfo?.image
              : ''
            : userInfo?.userinfo?.profile_pic
            ? userInfo?.userinfo?.profile_pic
            : '',
        name: userInfo?.name,
        post_id: '62f1f01098349071530d6f8d',
        updated_at: new Date(),
        user_id: userInfo?._id,
        tagged_users: tagUser,
      };
      let updateData = allComments;
      updateData.push(newComment);
      setAllComments(updateData);
      setTextDescription('');
    } else {
      var newComment = {
        _id: allComments[0]?._id,
        comment: text,
        created_at: new Date(),
        image: allComments[0]?.image,
        name: allComments[0]?.name,
        post_id: allComments[0]?.post_id,
        updated_at: new Date(),
        user_id: allComments[0]?.user_id,
        tagged_users: tagUser,
      };
      let updateData = allComments;
      updateData.push(newComment);
      setAllComments(updateData);
      setTextDescription('');
    }
    setTextDescription('');
  };

  const renderItems = ({ item, index }) => {
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
            onUserProfile(
              filteredCharArr[0]?.user_id || filteredCharArr[0]?.id
            );
          }
        }
      } else {
        if (item.tagged_users.length == 1) {
          onUserProfile(
            item?.tagged_users[0]?.user_id || item?.tagged_users[0]
          );
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
      <View style={{ paddingVertical: 12, flexDirection: 'row' }}>
        <Image
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            borderColor: Colors.Blueberry,
            borderWidth: 1,
          }}
          source={{ uri: EndPoint.baseAssestURL + item?.image }}
        />
        <View style={{ justifyContent: 'space-between', paddingLeft: 12 }}>
          <Text
            style={{ ...theme.fontSemiBold, fontSize: 13, color: Colors.Black }}
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

  useEffect(() => {
    var length = readMore ? comments.length : 3;

    var newValues = comments.filter((item, index) => {
      if (index < length) {
        return item;
      }
    });
    setAllComments(newValues);
  }, []);

  const onReadMore = () => {
    setReadMore(!readMore);

    var length = !readMore ? comments.length : 3;

    var newValues = comments.filter((item, index) => {
      if (index < length) {
        return item;
      }
    });
    setAllComments(newValues);
  };

  const onChangeText = (text) => {
    if (text.length == 1 && text == '@') {
      setTag(true);
      textLength = text.length;
      setTagValue(allUsers || []);
    } else if (
      text.charAt(text.length - 1) == '@' &&
      text.charAt(text.length - 2) == ' '
    ) {
      textLength = text.length;
      setTag(true);
      const before_ = text.substring(0, text.length - 1);
      setLastValue(before_);
      setTagValue(allUsers || []);
    } else if (istag) {
      var afterChar = text.slice(textLength);
      var tagData = allUsers || [];
      const filteredArr = tagData.filter((val) =>
        val.name.toLowerCase().includes(afterChar)
      );
      setTagValue(filteredArr);
    }
    if (text.length == 0) {
      setTag(false);
    }

    if (
      text.charAt(text.length - 1) !== '@' ||
      text.charAt(text.length - 2) !== ' '
    ) {
      var newCommentText = `${commentText}${text.charAt(text.length - 1)}`;
      if (!istag) {
        setCommentText(newCommentText);
      }
    }

    setTextDescription(text);
  };

  const addTagData = ({ item }) => {
    setTextDescription('');
    let newText = `${lastValue} @${item.name} `;
    let newCommenttagText = `${commentText} [${item.name}](${item._id}) `;
    setTextDescription(newText);
    setCommentText(newCommenttagText);
    setTag(false);

    var oldTagValue = tagUser;
    var checkIndex = oldTagValue.findIndex(
      (element) => element.user_id == item._id
    );
    if (checkIndex == -1) {
      oldTagValue.push({ user_id: item._id, name: item.name });
      setTagUser(oldTagValue);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 12,
      }}
    >
      {istag ? (
        <View>
          {tagValue.map((item, index) => (
            <CustomTagView
              item={item}
              index={index}
              addTagData={() => addTagData({ item })}
            />
          ))}
        </View>
      ) : allComments?.length > 0 ? (
        <View>
          <FlatList data={allComments} renderItem={renderItems} />
          {comments.length > 3 && (
            <CustomButton
              width={'30%'}
              height={'40px'}
              backgroundColor={Colors.White}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'12px'}
              textColor={Colors.Blueberry}
              onPress={onReadMore}
              text={readMore ? Strings.LESS : Strings.READ_MORE_COMMENTS}
            />
          )}
        </View>
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Text
            style={{ ...theme.fontSemiBold, fontSize: 16, color: Colors.Black }}
          >
            Be the first to comment
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CustomInputText
          window={window}
          label={''}
          labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
          inputOuterView={{
            borderColor: '#C2C5CE',
            borderWidth: 1,
          }}
          value={textDescription}
          width={'68%'}
          onChangeText={(text) => onChangeText(text)}
          placeholder={'Write a comment'}
        />
        <CustomButton
          width={'30%'}
          height={'44px'}
          marginTop={'2 px'}
          backgroundColor={Colors.Blueberry}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          fontFamily={'Gilroy-SemiBold'}
          fontSize={'18px'}
          textColor={Colors.White}
          onPress={() => {
            onSubmitComment(postId, textDescription, tagUser);
            addComment(textDescription);
            setTextDescription('');
          }}
          text={Strings.SEND}
        />
      </View>
    </View>
  );
};

export default ViewCommentsWeb;
