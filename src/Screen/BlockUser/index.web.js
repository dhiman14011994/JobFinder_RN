import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
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
import { blockuser } from '../../Redux/actions/homeAction';
import { setLoading } from '../../Redux/actions/authAction';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';

const BlockUser = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const blockData = useSelector((state) => state.profile?.blockUserData);

  useEffect(() => {
    getBlockUSerData();
  });

  const getBlockUSerData = () => {
    dispatch(
      getBlockUserDataAction({
        onSuccess: (result) => {
          console.log('blockUser>>>', result);
        },
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

  return (
    <View
      style={{ height: height, width: width, backgroundColor: Colors.White }}
    >
      <CustomText
        style={{
          width: width,
          paddingVertical: height * 0.03,
          marginHorizontal: width * 0.1,
        }}
        textAlign={'left'}
        fontFamily={'Gilroy-bold'}
        fontSize={fontResize(width * 0.02)}
      >
        {Strings.BLOCKED_USER}
      </CustomText>
      <FlatList
        style={{ width: width * 0.8, marginHorizontal: width * 0.1 }}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        data={
          blockData == undefined
            ? []
            : blockData?.length == 0
            ? []
            : blockData[0]?.blocked_users
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default BlockUser;
