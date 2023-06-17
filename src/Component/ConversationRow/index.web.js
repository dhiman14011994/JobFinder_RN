import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { dummyImage, option, deleteRed } from '../../Resources/assets';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import DeleteModal from '../DeleteModal/index.web';

const ConversationRow = ({ data, onPressChat, deleteChat, isDeleteIcon }) => {
  const newTime = data?.dateTime
    ? new Date(
        data?.dateTime?.seconds * 1000 + data?.dateTime?.nanoseconds / 1000000
      )
    : '';
  const atTime = data?.dateTime ? newTime.toLocaleTimeString() : '';
  const time = data?.dateTime ? atTime : data?.created_at;
  const fireBaseTime = new Date(
    data?.dateTime?.seconds * 1000 + data?.dateTime?.nanoseconds / 1000000
  );

  const updateTime =
    time == undefined
      ? ''
      : time == null
      ? ''
      : data?.dateTime
      ? moment(atTime, 'HH:mm:ss').format('LT')
      : moment(time).format('hh:mm A');
  const { width, height } = Dimensions.get('window');
  const [showOptioon, setShowOption] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={onPressChat}
        activeOpacity={1}
        style={{
          width: isDeleteIcon ? '100%' : '90%',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.06,
            height: height * 0.06,
            borderRadius: 30,
          }}
          source={
            data?.image
              ? { uri: EndPoint.baseAssestURL + data?.image }
              : data?.user?.image
              ? { uri: EndPoint.baseAssestURL + data?.user?.image }
              : dummyImage
          }
        />

        <View style={{ paddingHorizontal: 12, flex: 1 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <CustomText
              fontSize={`${fontResize(15)}px`}
              marginBottom={'10px'}
              {...theme.fontMedium}
            >
              {data?.name
                ? data?.name
                : data?.description
                ? data?.description
                : 'abc'}
            </CustomText>
            {!isDeleteIcon ? (
              <CustomText
                {...theme.fontMedium}
                fontSize={`${fontResize(14)}px`}
                textColor={Colors.DimGray}
              >
                {updateTime}
              </CustomText>
            ) : (
              <View />
            )}
          </View>
          {data?.message ? (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flex: 1 }}>
                <CustomText
                  {...theme.fontMedium}
                  fontSize={`${fontResize(14)}px`}
                  textColor={Colors.DimGray}
                >
                  {data?.message
                    ? data?.message
                    : 'Please send us the list of applicants.'}
                </CustomText>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
        {isDeleteIcon ? (
          <CustomText
            {...theme.fontMedium}
            fontSize={`${fontResize(14)}px`}
            textColor={Colors.DimGray}
          >
            {updateTime}
          </CustomText>
        ) : (
          <View />
        )}
      </TouchableOpacity>
      {!isDeleteIcon ? (
        <TouchableOpacity
          style={{ width: '10%', justifyContent: 'center' }}
          onPress={() => {
            setShowOption(!showOptioon);
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 25, height: 25, padding: 10 }}
            source={option}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {showOptioon ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: width * 0.025,
            bottom: width * 0.01,
            shadowColor: Colors.gray2,
            backgroundColor: Colors.White,
            borderWidth: 1,
            borderColor: Colors.gray2,
            paddingVertical: 8,
            paddingHorizontal: 8,
            // overflow: 'hidden',
            shadowRadius: 10,
            shadowOpacity: 2,
            borderRadius: 5,
          }}
          onPress={() => {
            setDeleteModal(true);
          }}
        >
          <Image style={{ width: 15, height: 15 }} source={deleteRed} />
          <CustomText
            style={{ marginStart: 5 }}
            {...theme.fontMedium}
            fontSize={`${fontResize(14)}px`}
            textColor={Colors.Red}
          >
            Delete
          </CustomText>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setDeleteModal={() => {
          setDeleteModal(!showDeleteModal);
          setShowOption(!showOptioon);
        }}
        deleteChatUser={() => {
          deleteChat();
          setShowOption(!showOptioon);
          setDeleteModal(!showDeleteModal);
        }}
        data={data}
      ></DeleteModal>
    </View>
  );
};

export default ConversationRow;
