import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import Colors from '../../../Resources/Colors';
import { TouchableOpacity } from 'react-native-web';
import { CustomText } from '../../CustomComponent';
import { theme } from '../../../Util/constant';
import { fontResize } from '../../../Util/font';
import EndPoint from '../../../Redux/constants/EndPoint';
import { dummyJob } from '../../../Resources/assets';
import CustomButton from '../../CustomButton';
import Type from '../../../Constants/Type/type';
import Strings from '../../../Resources/Strings';

const DeleteModal = ({
  showDeleteModal,
  setDeleteModal,
  item,
  type,
  onDeleteCallback,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Modal
      animationType="transparent"
      transparent={true}
      visible={showDeleteModal}
      onRequestClose={() => {
        setDeleteModal(!showDeleteModal);
      }}
    >
      <View
        style={{
          width: width * 0.24,
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'row',
          shadowColor: Colors.gray2,
          backgroundColor: Colors.White,
          padding: 20,
          overflow: 'hidden',
          shadowRadius: 20,
          shadowOpacity: 1,
          borderRadius: 10,
          flexDirection: 'column',
        }}
      >
        <CustomText
          textAlign={'left'}
          {...theme.fontBold}
          fontSize={`${fontResize(15)}px`}
          textColor={Colors.Black}
        >
          {type == Type.DELETE_TYPE.JOB
            ? Strings.DELETE_JOB_TITLE
            : type == Type.DELETE_TYPE.EVENT
            ? Strings.DELETE_EVENT_TITLE
            : Strings.DELETE_PROMOTION_TITLE}
        </CustomText>

        <CustomText
          textAlign={'center'}
          {...theme.fontRegular}
          fontSize={`${fontResize(12)}px`}
          textColor={Colors.lightGray12}
          marginTop={15}
        >
          {type == Type.DELETE_TYPE.JOB
            ? Strings.DELETE_JOB
            : type == Type.DELETE_TYPE.EVENT
            ? Strings.DELETE_EVENT
            : Strings.DELETE_PROMOTION}
        </CustomText>

        <View
          style={{
            width: width * 0.13,
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}
        >
          <Image
            resizeMode={'cover'}
            style={{
              width: width * 0.032,
              height: width * 0.033,
              borderRadius: width * 0.007,
              alignItems: 'center',
            }}
            source={
              type === Type.DELETE_TYPE.PROMOTION
                ? item?.image
                  ? { uri: EndPoint.baseAssestURL + item?.image }
                  : dummyPost
                : item?.company_logo
                ? {
                    uri: EndPoint.baseAssestURL + item?.company_logo,
                  }
                : dummyJob
            }
          />

          <View
            style={{
              width: width * 0.08,
              flexDirection: 'column',
              marginLeft: width * 0.008,
            }}
          >
            <CustomText
              {...theme.fontSemiBold}
              fontSize={`${fontResize(13)}px`}
              textColor={Colors.Black}
            >
              {type == Type.DELETE_TYPE.JOB
                ? item?.job_title
                : type === Type.DELETE_TYPE.EVENT
                ? item?.event_title
                : item?.promotion_title}
            </CustomText>

            <CustomText
              numberOfLines={2}
              {...theme.fontRegular}
              fontSize={`${fontResize(12)}px`}
              textColor={Colors.PrimaryGray1}
              marginTop={3}
            >
              {type == Type.DELETE_TYPE.JOB
                ? item?.company_name
                : type === Type.DELETE_TYPE.EVENT
                ? item?.job_description
                : item?.description}
            </CustomText>
          </View>
        </View>

        <CustomButton
          onPress={() => {
            onDeleteCallback(type);
            setDeleteModal(!showDeleteModal);
          }}
          width={width * 0.16}
          height={width * 0.03}
          backgroundColor={Colors.Red}
          borderRadius={width * 0.008}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          marginTop={10}
          fontSize={`${fontResize(13)}px`}
          textColor={Colors.White}
          textTransform={'capitalize'}
          text={'Delete'}
        />

        <CustomButton
          onPress={() => {
            setDeleteModal(!showDeleteModal);
          }}
          width={width * 0.16}
          height={width * 0.03}
          backgroundColor={Colors.White}
          borderRadius={width * 0.008}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={`${fontResize(13)}px`}
          textColor={Colors.PrimaryGray1}
          textTransform={'capitalize'}
          text={'Cancel'}
        />
      </View>
    </Modal>
  );
};

export default DeleteModal;
