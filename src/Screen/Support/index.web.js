import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import {
  headerSearch,
  headerLogo,
  notificationIcon,
  ic_leftBackIcon,
} from '../../Resources/assets';
import { RouteName } from '../../Navigation/routeName';
import { useEffect } from 'react';
import { setLoading } from '../../Redux/actions/authAction';
import { fetchAllSupportTicket } from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Emitter from '../../Util/eventEmitter';
import EndPoint from '../../Redux/constants/EndPoint';

const { width, height } = Dimensions.get('window');

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

  const onPressButton = () => {
    navigation.navigate(RouteName.CREATE_NEW_TICKET);
  };
  const onPressTicket = (item) => {
    navigation.navigate(RouteName.SUPPORT_DETAIL, { supportId: item?._id });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={style.renderContainer}
        onPress={() => onPressTicket(item)}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={style.imageContainer}>
            <Image
              source={
                item?.user?.image
                  ? { uri: EndPoint.baseAssestURL + item?.user?.image }
                  : item?.user?.userinfo?.image
                  ? { uri: EndPoint.baseAssestURL + item.user.userinfo.image }
                  : ''
              }
              resizeMode={'cover'}
              style={style.icon}
            />
          </View>
          <View style={style.textContainer}>
            <View
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
              <Text style={style.ticketNoText}>
                {item?.ticket_number || ''}
              </Text>
              <Text style={style.timeText}>
                {' '}
                {`${moment(item?.created_at ?? '').format(
                  'MMMM DD, YYYY'
                )} | ${moment(item?.created_at ?? '').format('hh:mm a')}`}
              </Text>
              <Text style={style.detailText}>{item?.message ?? ''}</Text>
            </View>
            <Text
              style={[
                style.statusText,
                {
                  color:
                    item?.status === 'Pending'
                      ? Colors.OrangeColor
                      : Colors.GreenColor,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                },
              ]}
            >
              {item?.status || ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <Text style={style.mainText}>{Strings.SUPPORT}</Text>

      <View style={{ height: '60%' }}>
        <FlatList data={supportTickets} renderItem={renderItem} />
      </View>

      <TouchableOpacity style={style.btn} onPress={onPressButton}>
        <Text style={style.btnText}>{Strings.SEND_NEW_TICKET}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '15%',
    paddingTop: '3%',
  },
  mainText: {
    fontSize: fontResize(width * 0.018),
    color: Colors.Black,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  renderContainer: {
    width: '80%',
    padding: '2%',
    borderRadius: height * 0.02,
    backgroundColor: Colors.GhostWhite,
    alignSelf: 'center',
    marginTop: '2%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '3%',
    width: '92%',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: height * 0.03,
    backgroundColor: Colors.blue[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: height * 0.03,
  },
  ticketNoText: {
    fontSize: fontResize(13),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: fontResize(12),
    color: Colors.gray2,
    textTransform: 'capitalize',
    marginTop: 6,
  },
  renderBottomTextContainer: {
    marginLeft: '7%',
  },
  detailText: {
    fontSize: fontResize(width * 0.008),
    fontWeight: '400',
    marginTop: height * 0.01,
    width: width * 0.48,
  },
  statusText: {
    fontSize: fontResize(16),
    fontWeight: '600',
  },
  btn: {
    height: '10%',
    width: '30%',

    borderRadius: 10,
    marginTop: '4%',
    marginLeft: '58%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue[300],
  },
  btnText: {
    fontSize: fontResize(16),
    color: Colors.White,
  },
});

export default Support;
