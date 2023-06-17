import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import CustomButton from '../../Component/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mxHeight} from '../../Util';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import {
  BackButton,
  HeaderContainer,
} from '../../Screen/Authentication/VerificationStyle';
import {
  addCalendarDateIcon,
  addCalendarTimeIcon,
  backIcon,
} from '../../Resources/assets';
import {CustomText} from '../CustomComponent';
import {theme} from '../../Util/constant';
import {fontResize} from '../../Util/font';
import moment from 'moment';

const ImGoingPopup = ({
  showGoingPopup,
  addToCalendar,
  dismiss,
  eventDetail,
}) => {
  const window = useWindowDimensions();
  // const utcDate = moment(eventDetail?.date).utc();
  const formatDate = moment(eventDetail?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');
  const formatTime = moment(eventDetail?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('hh:mm A');

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={showGoingPopup}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      {/*All views of Modal*/}

      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 60,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: Colors.White,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            paddingBottom: 22,
          }}>
          <HeaderContainer style={{alignItems: 'center'}}>
            <View
              style={{
                position: 'absolute',

                alignItems: 'center',
                width: '100%',
              }}>
              <CustomText
                {...theme.fontSemiBold}
                fontSize={fontResize(16)}
                textColor={Colors.Black}>
                {'Add to Calendar?'}
              </CustomText>
            </View>
            <TouchableOpacity onPress={() => dismiss()} style={{padding: 15}}>
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
          <View style={{alignItems: 'center'}}>
            <CustomText
              {...theme.fontRegular}
              fontSize={fontResize(14)}
              textColor={Colors.DimGray}>
              {'Add the event details into your calendar'}
            </CustomText>
          </View>
          <View
            style={{margin: 15, backgroundColor: '#EEF5E1', borderRadius: 12}}>
            <View style={{alignItems: 'center', paddingVertical: 12}}>
              <CustomText
                {...theme.fontSemiBold}
                fontSize={fontResize(16)}
                textColor={Colors.DimGray}>
                {'Event Details'}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 22,
                paddingTop: 12,
                paddingBottom: 24,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  style={{height: 20, width: 20, margin: 8}}
                  source={addCalendarDateIcon}
                />
                <CustomText
                  {...theme.fontSemiBold}
                  fontSize={fontResize(16)}
                  textColor={'#6A961A'}>
                  {formatDate}
                </CustomText>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  resizeMode="contain"
                  style={{height: 20, width: 20, margin: 8}}
                  source={addCalendarTimeIcon}
                />
                <CustomText
                  {...theme.fontSemiBold}
                  fontSize={fontResize(16)}
                  textColor={'#6A961A'}>
                  {formatTime}
                </CustomText>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 22,
              paddingVertical: 12,
              justifyContent: 'space-between',
            }}>
            <CustomButton
              width={'55%'}
              height={'55px'}
              backgroundColor={Colors.Blueberry}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'14px'}
              textColor={Colors.White}
              onPress={() => {
                addToCalendar();
              }}
              text={'Add to Calendar'}
            />
            <CustomButton
              width={'40%'}
              height={'55px'}
              backgroundColor={Colors.White}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'14px'}
              textColor={'#F6690F'}
              buttonContainer={{borderColor: '#F6690F', borderWidth: 1}}
              onPress={() => {
                dismiss();
              }}
              text={'Dismiss'}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImGoingPopup;
