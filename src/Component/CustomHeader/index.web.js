import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Resources/Colors';
import {
  ButtonContainer,
  CustomText,
  CustomView,
  Image,
} from '../CustomComponent';
import HeaderImage from '../../Resources/assets/web/headerImage.png';
import Strings from '../../Resources/Strings';
import HomeIcon from '../../Resources/assets/Home.png';
import JobEvent from '../../Resources/assets/JobEvent.png';
import Setting from '../../Resources/assets/Setting.png';
import ActiveHome from '../../Resources/assets/ActiveHome.png';
import ActiveJobEvent from '../../Resources/assets/ActiveJobEvent.png';
import ActiveSetting from '../../Resources/assets/ActiveSetting.png';
import { TouchableOpacity } from 'react-native-web';
import { DownArrow } from '../../Resources/assets/ProfileAssets';
import { fontResize } from '../../Util/font';
import { goal, headerImage } from '../../Resources/assets';
import { useEffect } from 'react';
import Emitter from '../../Util/eventEmitter';

const CustomHeaderWeb = ({
  window,
  activeTab,
  onTabPress,
  isProfile = false,
  backPress,
  type,
  isCreateProfile = false,
  constainerStyle,
  titleStyle
}) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    Emitter.on('JobWeb', () => {
      onTabPress('JobEvent');
    });
    return () => {
      Emitter.off('JobWeb');
    };
  }, []);

  return (
    <View
      style={[{
        width: '100%',
        height: window.width * 0.06,
        flexDirection: isCreateProfile ? 'column' : 'row',
        justifyContent: isCreateProfile ? 'center' : 'space-between',
        alignItems: isCreateProfile ? 'flex-start' : 'center',
        backgroundColor: Colors.White,
      },constainerStyle]}
    >
      {isProfile ? (
        <CustomView
          alignItems={'center'}
          flexDirection={'row'}
          marginRight={'2%'}
          marginLeft={window.width * 0.02}
          width={window.width * 0.2}
          height={window.height * 0.1}
        >
          <ButtonContainer
            marginLeft={window.width * 0.02}
            width={window.width * 0.027}
            height={window.height * 0.06}
            borderRadius={window.height * 0.06}
          >
            <Image
              resizeMode={'contain'}
              width={'100%'}
              height={'100%'}
              source={HeaderImage}
            />
          </ButtonContainer>
          {!isCreateProfile && (
            <ButtonContainer
              marginLeft={window.width * 0.015}
              width={window.width * 0.014}
              height={window.height * 0.03}
              borderRadius={'12px'}
              justifyContent={'center'}
              alignItems={'center'}
              bgColor={Colors.lightGray11}
              style={{ transform: 'rotate(90deg)' }}
              onPress={() => backPress()}
            >
              <Image
                resizeMode={'contain'}
                width={window.width * 0.005}
                height={window.height * 0.01}
                source={DownArrow}
              />
            </ButtonContainer>
          )}
          {!isCreateProfile && (
            <CustomText
              textColor={Colors.Black}
              marginLeft={window.width * 0.01}
              fontFamily={'Gilroy-Bold'}
            >
              {Strings.MY_EXPERIENCE}
            </CustomText>
          )}
        </CustomView>
      ) : (
        <ButtonContainer
          onPress={() => {
            setVisible(true);
          }}
          marginLeft={window.width * 0.02}
          width={window.width * 0.035}
          height={window.height * 0.065}
          borderRadius={window.height * 0.065}
        >
          <Image
            resizeMode={'contain'}
            width={'100%'}
            height={'100%'}
            source={HeaderImage}
          />
        </ButtonContainer>
      )}
      {!isCreateProfile && (
        <CustomView
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDirection={'row'}
          marginLeft={'22%'}
          marginRight={'2%'}
          width={
            type == Strings.PROFESSIONAL
              ? window.width * 0.33
              : window.width * 0.22
          }
          height={window.height * 0.1}
        >
          <ButtonContainer
            onPress={() => onTabPress('Home')}
            width={window.width * 0.11}
            alignItems={'center'}
            flexDirection={'row'}
            height={'50px'}
            padding={'1px'}
            disabled={isProfile}
          >
            <Image
              resizeMode={'contain'}
              width={window.width * 0.019}
              height={'100%'}
              source={activeTab == 'Home' ? ActiveHome : HomeIcon}
            />
            <CustomText
              textColor={
                activeTab == 'Home' ? Colors.Blueberry : Colors.PrimaryGray
              }
              fontSize={fontResize(window.width * 0.008)}
              marginLeft={window.width * 0.01}
            >
              {Strings.HOME}
            </CustomText>
          </ButtonContainer>
          {type == Strings.PROFESSIONAL && (
            // =====================
            <ButtonContainer
              onPress={() => onTabPress('JobEvent')}
              width={window.width * 0.11}
              alignItems={'center'}
              flexDirection={'row'}
              height={'50px'}
              padding={'1px'}
              backgroundColor={'transparent'}
              disabled={isProfile}
            >
              <Image
                resizeMode={'contain'}
                width={window.width * 0.019}
                height={'100%'}
                source={activeTab == 'JobEvent' ? ActiveJobEvent : JobEvent}
              />
              <CustomText
                textColor={
                  activeTab == 'JobEvent'
                    ? Colors.Blueberry
                    : Colors.PrimaryGray
                }
                fontSize={fontResize(window.width * 0.008)}
                marginLeft={window.width * 0.01}
              >
                {Strings.JOB_EVENTS}
              </CustomText>
            </ButtonContainer>
          )}

          <ButtonContainer
            onPress={() => onTabPress('Settings')}
            width={window.width * 0.11}
            alignItems={'center'}
            flexDirection={'row'}
            height={'50px'}
            padding={'1px'}
            disabled={isProfile}
          >
            <Image
              resizeMode={'contain'}
              width={window.width * 0.019}
              height={'100%'}
              source={activeTab == 'Settings' ? ActiveSetting : Setting}
            />
            <CustomText
              textColor={
                activeTab == 'Settings' ? Colors.Blueberry : Colors.PrimaryGray
              }
              fontSize={fontResize(window.width * 0.008)}
              marginLeft={window.width * 0.01}
            >
              {Strings.SETTINGS}
            </CustomText>
          </ButtonContainer>
        </CustomView>
      )}

      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View
          style={{
            width: window.width * 0.55,
            height: window.height,
            paddingHorizontal: window.width * 0.08,
            paddingVertical: window.width * 0.04,
            alignSelf: 'center',
            backgroundColor: Colors.Blueberry,
            borderRadius: window.width * 0.01,
          }}
        >
          <CustomText
            style={{
              paddingVertical: window.height * 0.03,
            }}
            textColor={Colors.White}
            textAlign={'left'}
            fontFamily={'Gilroy-bold'}
            fontSize={fontResize(window.width * 0.02)}
          >
            {Strings.OUR_GOAL}
          </CustomText>

          <View
            style={{
              width: window.width * 0.38,
              paddingVertical: window.width * 0.01,
              paddingHorizontal: window.width * 0.02,
              alignSelf: 'center',
              backgroundColor: Colors.White,
              borderRadius: window.width * 0.01,
            }}
          >
            <CustomText
              style={{
                paddingVertical: window.height * 0.015,
              }}
              textColor={Colors.Black}
              textAlign={'left'}
              fontFamily={'Gilroy-Regular'}
              fontSize={fontResize(window.width * 0.01)}
            >
              Our goal is to drive axess to Equality in a passionate way by
              cultivating a supportive space focused on Diversity, Equity,
              Inclusion and bonding for people of color and historically
              disadvantaged groups. A place to encourage and enable development
              and promotion of qualified diverse talent at all levels. Here we
              are!
            </CustomText>
          </View>

          <View
            style={{
              width: window.width * 0.35,
              height: window.height * 0.35,
              alignSelf: 'center',
              marginTop: window.width * 0.02,
              marginBottom: window.width * 0.02,
              paddingVertical: window.width * 0.02,
            }}
          >
            <Image
              resizeMode={'stretch'}
              width="100%"
              height="100%"
              source={goal}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={{
              width: window.width * 0.08,
              paddingVertical: window.width * 0.01,
              paddingHorizontal: window.width * 0.02,
              alignItems: 'center',
              backgroundColor: Colors.White,
              borderRadius: window.width * 0.01,
            }}
          >
            <CustomText
              textColor={Colors.Blueberry}
              textAlign={'left'}
              fontFamily={'Gilroy-bold'}
              fontSize={fontResize(window.width * 0.01)}
            >
              OK
            </CustomText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomHeaderWeb;
