import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ActivethumbsUpIcon,
  messageIcon,
  moreIcon,
  shareIcon,
  thumbsUpIcon,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Share from 'react-native-share';
import HidePost from '../HidePost';
import style from './style';
import EndPoint from '../../Redux/constants/EndPoint';
import RBSheet from 'react-native-raw-bottom-sheet';
import Type from '../../Constants/Type/type';
import { RouteName } from '../../Navigation/routeName';
import CustomConfirmationModal from '../CustomConfirmationModal';
import Strings from '../../Resources/Strings';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { unFollowUserAction } from '../../Redux/actions/profileAction';
import { blockuser } from '../../Redux/actions/homeAction';
import Tooltip from 'rn-tooltip';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { mxHeight, mxWidth } from '../../Util';

const LikeCommentButton = ({
  onLike,
  onComment,
  onShare,
  onHide,
  item,
  userId,
  navigation,
  setUpdate,
  onSelection,
  deletePostPopup,
}) => {
  const refRBSheet = useRef();
  const [modalType, setModalType] = useState('');
  const [showUnfollow, setShowUnfollow] = useState(false);
  let isId = item?.like?.findIndex((element) => element.user_id == userId);
  const dispatch = useDispatch();
  const toolTipRef = useRef(null);

  const unfollowUser = () => {
    try {
      dispatch(setLoading(true));
      const params = {
        follower_id: item?.user?._id,
      };
      dispatch(
        unFollowUserAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            setUpdate();
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const blockUser = () => {
    try {
      dispatch(setLoading(true));
      let params = {
        block_user_id: item?.user?._id,
        status: 'block',
      };
      dispatch(
        blockuser({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            setUpdate();
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <View>
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
              const shareOptions = {
                title: item?.description || '',
                failOnCancel: false,
                urls: [EndPoint.baseAssestURL + item?.user?.image],
                message: encodeURI(item?.description || ''),
              };
              Share.open(shareOptions)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
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
          {item?.user_id !== userId ? (
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 22, width: 22 }}
                  source={moreIcon}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <Tooltip
              ref={toolTipRef}
              withPointer={false}
              popover={
                <Text
                  onPress={() => {
                    toolTipRef.current.toggleTooltip();
                    deletePostPopup();
                  }}
                  style={{
                    color: Colors.DimGray,
                    fontSize: fontResize(18),
                    fontFamily: 'Gilroy-Bold',
                  }}
                >
                  {Strings.MORE.DELETE_POST}
                </Text>
              }
              width={mxWidth * 0.3}
              height={50}
              overlayColor="rgba(78, 138, 190,0)"
              containerStyle={{
                backgroundColor: 'white',
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: mxHeight * 0.03,
                marginLeft: mxWidth * 0.02,
              }}
              pointerColor={{
                backgroundColor: 'clear',
              }}
              // pointerStyle={{ backgroundColor: "red" }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 12,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 22, width: 22 }}
                  source={moreIcon}
                />
              </View>
            </Tooltip>
          )}
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
          },
          container: {
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <HidePost
          userName={item?.user?.name || ''}
          onClick={(value) => {
            refRBSheet.current?.close();
            switch (value) {
              case Type.MORE.I_DONT_WANT_TO_SEE_POST: {
                onSelection(Type.REPORT.DONT_SEE_POST);
                break;
              }
              case Type.MORE.REPORT_POST: {
                onSelection(Type.REPORT.REPORT_POST);
                break;
              }
              case Type.MORE.UNFOLLOW: {
                onSelection(Type.MORE.UNFOLLOW);
                break;
              }
              case Type.MORE.BLOCK: {
                onSelection(Type.MORE.BLOCK);
                break;
              }
            }
          }}
        />
      </RBSheet>

      <CustomConfirmationModal
        isModal={showUnfollow}
        setModal={(value) => {
          setShowUnfollow(false);
        }}
        setSelection={(value) => {
          if (value == Type.CONFIRMATION.YES) {
            modalType == Type.MORE.UNFOLLOW ? unfollowUser() : blockUser();
          }
        }}
        data={
          modalType == Type.MORE.UNFOLLOW
            ? {
                title: Strings.UNFOLLOW_TITLE,
                desc: `${Strings.ARE_YOU_SURE_TO_UNFOLLOW} ${
                  item?.user?.name || ''
                }?`,
              }
            : {
                title: Strings.BLOCK_TITLE,
                desc: `${Strings.ARE_YOU_SURE_TO_BLOCK} ${
                  item?.user?.name || ''
                }?`,
              }
        }
      />
    </View>
  );
};

export default LikeCommentButton;
