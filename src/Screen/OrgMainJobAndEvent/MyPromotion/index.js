import { View, Text, FlatList, useWindowDimensions, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostItem from '../../../Component/JobPostItem';
import { theme } from '../../../Util/constant';
import Strings from '../../../Resources/Strings';

import { RouteName } from '../../../Navigation/routeName';
import CustomButton from '../../../Component/CustomButton';
import Colors from '../../../Resources/Colors';
import { fetchMyEvents } from '../../../Redux/actions/jobAndEventAction';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import EventItem from '../../../Component/EventItem';
import Emitter from '../../../Util/eventEmitter';
import { setLoading } from '../../../Redux/actions/authAction';
import { fetchPromotionPost } from '../../../Redux/actions/promotionAction';
import PromotionItem from '../../../Component/PromotionItem';

const MyPromotion = ({ navigation }) => {
  const dispatch = useDispatch();
  const promotion = useSelector((state) => state.promotion.promotions);
  useEffect(() => {
    fetchAllPromotions();

    Emitter.on('PromotionCreated', () => {
      fetchAllPromotions();
    });
    return () => {
      Emitter.off('PromotionCreated');
    };
  }, []);

  const fetchAllPromotions = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchPromotionPost({
          onSuccess: (result) => {
            console.log('PromotionList', result);
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
      console.log('=====Error', err);
    }
  };

  const window = useWindowDimensions();
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const renderItem = ({ item }) => {
    return (
      <PromotionItem
        item={item}
        // isMyJob
        // onSwitchChangeValue={() => {}}
        toDetails={() => {}}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <View style={{ paddingHorizontal: 16 }}>
        <CustomButton
          onPress={() =>
            navigation.navigate(RouteName.CREATE_PROMOTIONS, {
              isEdited: false,
            })
          }
          width={'100%'}
          height={'50px'}
          backgroundColor={Colors.Blueberry}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.03}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'18px'}
          textColor={Colors.White}
          text={Strings.CREATE_PROMOTIONS}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <CustomText
            fontSize={fontResize(18)}
            {...theme.fontSemiBold}
            style={{ color: Colors.Black }}
          >
            {promotion && promotion?.length > 0 ? 'Promotion Created' : ''}
          </CustomText>
        }
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText
              fontSize={fontResize(16)}
              {...theme.fontMedium}
              style={{ color: Colors.Black }}
            >
              {'No Promotion Found'}
            </CustomText>
          </View>
        }
        style={{ paddingHorizontal: 16 }}
        data={[...promotion]}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyPromotion;
