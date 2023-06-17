import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon, headerLogo, UserPlaceholder } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import CustomButton from '../../Component/CustomButton';
import Strings from '../../Resources/Strings';
import { RouteName } from '../../Navigation/routeName';
import { useEffect } from 'react';
import { setLoading } from '../../Redux/actions/authAction';
import { fetchAllSupportTicket } from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import Emitter from '../../Util/eventEmitter';
import Spinner from '../../Util/spinner';

const Support = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const supportTickets = useSelector((state) => state.profile.supportTickets);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllSupportTickets();
    Emitter.on('TicketCreated', () => {
      fetchAllSupportTickets();
    });
    return () => {
      Emitter.off('TicketCreated');
    };
  }, []);

  const fetchAllSupportTickets = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchAllSupportTicket({
          onSuccess: (result) => {
            setRefreshing(false);
            dispatch(setLoading(false));
          },
          onError: (error) => {
            setRefreshing(false);
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RouteName.SUPPORT_DETAIL, {
            supportId: item?._id,
          })
        }
        style={{
          borderColor: Colors.DimGray,
          borderWidth: 0.5,
          marginTop: index == 0 ? 16 : 0,
          marginBottom: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 12,
          backgroundColor: Colors.White,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FastImage
              style={{ height: 44, width: 44, borderRadius: 44 / 2 }}
              defaultSource={UserPlaceholder}
              source={
                item?.user?.image
                  ? { uri: EndPoint.baseAssestURL + item?.user?.image }
                  : item?.user?.userinfo?.image
                  ? { uri: EndPoint.baseAssestURL + item.user.userinfo.image }
                  : UserPlaceholder
              }
            />
            <View style={{ paddingHorizontal: 12, flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <CustomText
                  fontSize={`${fontResize(13)}px`}
                  textTransform={'uppercase'}
                  {...theme.fontSemiBold}
                >
                  {item?.ticket_number || ''}
                </CustomText>
                <CustomText
                  fontSize={`${fontResize(15)}px`}
                  textColor={
                    item?.status === 'Pending'
                      ? Colors.OrangeColor
                      : Colors.GreenColor
                  }
                  textTransform={'capitalize'}
                  {...theme.fontSemiBold}
                >
                  {item?.status || ''}
                </CustomText>
              </View>

              <CustomText
                fontSize={`${fontResize(12)}px`}
                marginTop={'4px'}
                marginBottom={'4px'}
                textColor={Colors.DimGray}
                textTransform={'capitalize'}
                {...theme.fontMedium}
              >
                {`${moment(item?.created_at ?? '').format(
                  'MMMM DD, YYYY'
                )} | ${moment(item?.created_at ?? '').format('hh:mm a')}`}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 44 }} />
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <CustomText
              fontSize={`${fontResize(14)}px`}
              textTransform={'capitalize'}
              {...theme.fontRegular}
            >
              {item?.message ?? ''}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Support'}
      />
      <FlatList
        style={{ flex: 1 }}
        data={supportTickets}
        // enableEmptySections={true}

        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <CustomText
              fontSize={`${fontResize(14)}px`}
              textTransform={'capitalize'}
              {...theme.fontRegular}
            >
              {'No Support Ticket Found'}
            </CustomText>
          </View>
        }
        renderItem={renderItem}
      />
      <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        <CustomButton
          onPress={() => navigation.navigate(RouteName.CREATE_NEW_TICKET)}
          width={'100%'}
          height={'50px'}
          backgroundColor={Colors.Blueberry}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.1}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'18px'}
          textColor={Colors.White}
          textTransform={'capitalize'}
          text={Strings.SEND_NEW_TICKET}
        />
      </View>
    </SafeAreaView>
  );
};

export default Support;
