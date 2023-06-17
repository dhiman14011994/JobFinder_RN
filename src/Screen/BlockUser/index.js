import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBlockUserDataAction,
  setBlockUserDataAction,
} from '../../Redux/actions/profileAction';
import CustomBlockUser from '../../Component/CustomBlockUser';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon } from '../../Resources/assets';
import { mxHeight } from '../../Util';
import { SafeAreaView } from 'react-native-safe-area-context';
import { blockuser } from '../../Redux/actions/homeAction';
import { setLoading } from '../../Redux/actions/authAction';
import {
  updateBlockFirebaseChatList,
  updateUnBlockFirebaseChatList,
} from '../../Constants/FireStoremanager/FireStoremanager';

const BlockUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const blockData = useSelector((state) => state.profile?.blockUserData);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    getBlockUSerData();
  }, []);

  const getBlockUSerData = () => {
    dispatch(
      getBlockUserDataAction({
        onSuccess: (result) => {},
        onError: (error) => {
          console.log('blockError>>>', error);
        },
      })
    );
  };

  const renderItem = ({ item, index }) => {
    return <CustomBlockUser item={item} onPress={() => unblockUser(item)} />;
  };

  const unblockUser = (item) => {
    dispatch(setLoading(true));
    let params = {
      block_user_id: item?.user?._id,
      status: '',
    };
    dispatch(
      blockuser({
        params,
        onSuccess: (result) => {
          if (blockData[0]?.blocked_users.length == 1) {
            const blockchatUser = updateUnBlockFirebaseChatList({
              id: userData.data._id,
              chatUserId: item?.user?._id,
              isBlock: true,
            });
            const blockchatOtherUser = updateUnBlockFirebaseChatList({
              id: item?.user?._id,
              chatUserId: userData.data._id,
              isBlock: false,
            });
            getBlockUSerData();
            dispatch(setBlockUserDataAction([]));
            dispatch(setLoading(false));
            navigation.goBack();
          } else {
            getBlockUSerData();
            dispatch(setLoading(false));
          }
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const getUserIndex = () => {
    var index = blockData.findIndex(
      (element) => element.user_id == userData.data._id
    );
    return index;
  };

  return (
    <SafeAreaView>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: mxHeight * 0.025,
              borderRadius: mxHeight * 0.022,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              resizeMode="contain"
              style={{ height: mxHeight * 0.03, width: mxHeight * 0.03 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Blocked User'}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          blockData == undefined
            ? []
            : blockData?.length == 0
            ? []
            : blockData?.length > 1
            ? blockData[getUserIndex()]?.blocked_users
            : blockData[0]?.blocked_users
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default BlockUser;
