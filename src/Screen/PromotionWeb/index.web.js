/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Resources/Colors';
import EventItem from '../../Component/EventItem';
import { mxHeight, mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import {
  addCalendarDateIcon,
  addCalendarTimeIcon,
  backIcon,
  CrossIcon,
  dummyJob,
  SuccessIcon,
} from '../../Resources/assets';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import EndPoint from '../../Redux/constants/EndPoint';
import Strings from '../../Resources/Strings';
import SummaryComponent from '../../Component/SummaryComponent';
import moment from 'moment';
import CustomButton from '../../Component/CustomButton';
import {
  addEventToCalendar,
  applyEventAction,
  fetchEvents,
} from '../../Redux/actions/jobAndEventAction';
import PromotionItem from '../../Component/PromotionItem/index.web';
import AdBannerPromotion from '../../Component/AdPromotionBanner/index.web';

const PromotionWeb = ({ navigation, promotions, promotionDeleted }) => {
  const [isVisable, setVisable] = useState(false);
  const [isImGoing, setImGoning] = useState(false);
  const [eventItem, setEventItem] = useState('');
  const [eventdate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [isSucessfully, setSucessfully] = useState(false);
  const userInfo = useSelector((state) => state?.profile?.myProfile);

  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <PromotionItem
        item={item}
        image={userInfo}
        toDetails={(id) => {
          setVisable(true);
          setEventItem(item);
          const formatDate = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
            .local()
            .format('MMMM DD, YYYY');
          const formatTime = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
            .local()
            .format('hh:mm A');
          setEventDate(formatDate);
          setEventTime(formatTime);
        }}
        isDeleted={() => {
          Emitter.emit('PostCreated');
        }}
      />
    );

  };

  return (
    <View>
      <View style={{
        paddingLeft: 22,
        paddingRight: 22,
        marginVertical: 15,
        backgroundColor: Colors.White,
        borderRadius: 22,
      }}>
        <AdBannerPromotion image={userInfo} />
      </View>

      <View
        style={{ flex: 1, backgroundColor: Colors.White, paddingHorizontal: 16, marginTop: 16, paddingVertical: 10 }}
      >
        <FlatList
          data={promotions}
          renderItem={renderItem}
        />
      </View>
    </View>

  );
};

export default PromotionWeb;
