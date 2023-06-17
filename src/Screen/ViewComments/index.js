import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import CustomInputText from '../../Component/CustomInputText';
import Strings from '../../Resources/Strings';
import { backIcon } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import { useSelector } from 'react-redux';
import CommentsView from '../../Component/commentsView';
import { mxHeight, mxWidth } from '../../Util';
import CustomTagView from '../../Component/CustomTagView';
import renderEmptyComponent from './Component/renderEmptyComponent';

var textLength = 0;

const ViewComments = ({
  comments,
  onSubmitComment,
  postId,
  onClose,
  onUserProfile,
}) => {
  const [textDescription, setTextDescription] = useState('');
  const allUsers = useSelector((state) => state.profile.allUser);
  const [comment, setComments] = useState(comments);
  const user = useSelector((state) => state.auth.userData);
  const type = user?.data?.role ? user?.data?.role : Strings.PROFESSIONAL;
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const window = useWindowDimensions();
  const [lastValue, setLastValue] = useState('');
  const [tagValue, setTagValue] = useState([]);
  const [istag, setTag] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [tagUser, setTagUser] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
    Keyboard.dismiss();
    setTextDescription('');
    let newText = `${lastValue} @${item.name} `;
    let newCommenttagText = `${commentText} [${item.name}](${item._id}) `;
    setTextDescription(newText);
    setCommentText(newCommenttagText);
    setTag(false);

    var oldTagValue = tagUser;
    var checkIndex = oldTagValue.findIndex((element) => element == item._id);
    if (checkIndex == -1) {
      oldTagValue.push({ user_id: item._id, name: item.name });
      setTagUser(oldTagValue);
    }
  };

  const addComment = () => {
    if (comment.length == 0) {
      var newComment = {
        _id: user?.data?._id,
        comment: textDescription,
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
        gold_member: userInfo?.gold_member ? true : false
      };
      let updateData = comment;
      updateData.push(newComment);
    } else {
      var newComment = {
        _id: comment[0]?._id,
        comment: textDescription,
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
        post_id: comment[0]?.post_id,
        updated_at: new Date(),
        user_id: userInfo?._id,
        tagged_users: tagUser,
        gold_member: userInfo?.gold_member ? true : false
      };
      let updateData = comment;
      updateData.push(newComment);
    }
    setTextDescription('');
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key == 'Backspace') {
      const lastWord = textDescription.split(' ').splice(-1);
      if (lastWord[0] == '') {
        setTag(false);
      }
    }
  };

  const renderFooterComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'space-between',
          width: mxWidth,
          position: 'absolute',
          bottom:
            Platform.OS == 'ios'
              ? isKeyboardVisible
                ? mxHeight * 0.37
                : 10
              : 10,
          backgroundColor: Colors.White,
          paddingHorizontal: '7%',
        }}
      >
        <CustomInputText
          window={window}
          label={''}
          value={textDescription}
          labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
          inputOuterView={{
            borderColor: '#C2C5CE',
            borderWidth: 1,
          }}
          width={'68%'}
          disabled
          onChangeText={(text) => onChangeText(text)}
          onKeyPress={handleKeyDown}
          placeholder={'Write a comment'}
        />
        <CustomButton
          width={'30%'}
          height={'55px'}
          backgroundColor={Colors.Blueberry}
          // marginTop={'22px'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          fontFamily={'Gilroy-SemiBold'}
          alignSelf={'flex-end'}
          fontSize={'18px'}
          textColor={Colors.White}
          disabled={textDescription.length == 0}
          onPress={() => {
            onSubmitComment(postId, textDescription, tagUser);
            addComment();
          }}
          text={Strings.SEND}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? -300 : -300}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.White,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 22,
          }}
        >
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{ padding: 12, position: 'absolute', left: -10 }}
                onPress={() => onClose()}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 24, width: 24 }}
                  source={backIcon}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    ...theme.fontSemiBold,
                    fontSize: 16,
                    color: Colors.Black,
                  }}
                >
                  Comments
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.White,
                marginTop: isKeyboardVisible ? mxHeight * 0.3 : 0,
                height: isKeyboardVisible ? '50%' : '80%',
                marginTop: isKeyboardVisible
                  ? Platform.OS == 'ios'
                    ? 0
                    : mxHeight * 0.2
                  : 0,
                marginBottom: isKeyboardVisible
                  ? mxHeight * 0.6
                  : mxHeight * 0.3,
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
              ) : comment?.length > 0 ? (
                comment.map((item, index) => (
                  <CommentsView
                    item={item}
                    onUserProfile={(id) => {
                      onUserProfile(id);
                    }}
                  />
                ))
              ) : (
                renderEmptyComponent()
              )}
            </View>
          </ScrollView>
          {renderFooterComponent()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ViewComments;
