import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
} from 'react-native-web';
import React from 'react';
import Colors from '../../Resources/Colors';
import CustomButton from '../../Component/CustomButton';
import { dummyImage } from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';

const ViewStoriesWeb = ({ user }) => {
  const { width } = useWindowDimensions();
  const convertHMS = (date1) => {
    var msDiff = new Date();
    var PastYear = moment(date1).format('yyyy');
    var PastMonth = moment(date1).format('MM');
    var PastDate = moment(date1).format('DD');
    var PastHours = moment(date1).format('HH');
    var PastMinutes = moment(date1).format('mm');
    var PastSeconds = moment(date1).format('ss');
    var currentYear = msDiff.getFullYear();
    var currentmonth = msDiff.getMonth() + 1;
    var currentday = msDiff.getDate();
    var currentHours = msDiff.getHours();
    var currentMinutes = msDiff.getMinutes();
    var currentSeconds = msDiff.getSeconds();
    var defYear = currentYear - PastYear;
    var defMonth = currentmonth - PastMonth;
    var defDay = currentday - PastDate;
    var defHour = currentHours - PastHours;
    var defMinutes = currentMinutes - PastMinutes;
    var defSecond = currentSeconds - PastSeconds;
    if (defYear > 0) {
      let year = defYear + ' Y';
      return year;
    } else if (Number(defMonth) > 0) {
      let year = defMonth + ' M';
      return year;
    } else if (Number(defDay) > 0) {
      let year = defDay + ' D';
      return year;
    } else if (Number(defHour) > 0) {
      let year = defHour + ' hr';
      return year;
    } else if (Number(defMinutes) > 0) {
      let year = defMinutes + ' min';
      return year;
    } else {
      let year = defSecond + ' sec';
      return year;
    }
  };

  const renderItems = ({ item, index }) => {
    const keywords = item?.keywords.split(',');
    var fromTime = new Date(item?.created_at);
    var dateAgo = convertHMS(fromTime);
    return (
      <View
        style={{
          borderRadius: 22,

          backgroundColor: item && item?.bgcolor,
          width: '55vh',

          // flex: 1,
          padding: 30,
          marginRight: 30,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 18,
          }}
        >
          <Image
            style={{
              height: 60,
              width: 60,
              borderColor: Colors.White,
              borderWidth: 3,
              borderRadius: 30,
            }}
            source={{ uri: EndPoint.baseAssestURL + item?.image }}
          />
          <Text style={{ color: Colors.White, ...theme.fontSemiBold }}>
            {dateAgo + ' ago'}
          </Text>
        </View>
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 14,
              color: Colors.White,
              ...theme.fontSemiBold,
              textAlign: 'justify',
            }}
          >
            {item && item?.title}
          </Text>
        </View>
        {item?.image && (
          <View style={{ paddingVertical: 12 }}>
            <Image
              source={{ uri: EndPoint.baseAssestURL + item?.image }}
              style={{
                height: '30vh',
                width: '100%',
              }}
            />
          </View>
        )}
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: Colors.White,
              ...theme.fontRegular,
              textAlign: 'justify',
            }}
          >
            {item && item?.description}
          </Text>
        </View>
        <View
          style={{
            paddingTop: 12,
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
        >
          {keywords.map((item) => {
            return (
              <View
                style={{
                  paddingHorizontal: 16,
                  backgroundColor: Colors.DimGray,
                  marginHorizontal: 6,
                  marginVertical: 4,
                  paddingVertical: 6,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.White,
                    ...theme.fontSemiBold,
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>

        {item && item?.showButton && (
          <View style={{ paddingVertical: 12 }}>
            <CustomButton
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.White}
              marginTop={'10px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.Blueberry}
              onPress={() => {}}
              text={Strings.IM_INTERESTED}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      // pagingEnabled
      showsVerticalScrollIndicator={true}
      data={user ? user : []}
      horizontal
      showsHorizontalScrollIndicator={true}
      bounces={false}
      renderItem={renderItems}
    />
  );
};

export default ViewStoriesWeb;
