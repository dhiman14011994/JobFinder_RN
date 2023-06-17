//import liraries
import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native-web';
import Modal from 'modal-enhanced-react-native-web';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import { unionIcon, deleteRed } from '../../Resources/assets';
import { TouchableOpacity } from 'react-native-web';

// create a component
const DeleteModal = ({
  showDeleteModal,
  setDeleteModal,
  data,
  deleteChatUser,
}) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={{ flex: 1 }}>
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
            width: width * 0.25,
            height: height * 0.3,
            alignSelf: 'center',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
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
            textAlign={'center'}
            {...theme.fontMedium}
            fontSize={`${fontResize(16)}px`}
            textColor={Colors.Black}
          >
            Delete Conversatioon?
          </CustomText>

          <Image
            style={{ width: 20, height: 20, marginTop: 20, alignSelf: 'center' }}
            source={unionIcon}
          />
          <CustomText
            style={{ margin: 20 }}
            textAlign={'center'}
            {...theme.fontMedium}
            fontSize={`${fontResize(14)}px`}
            textColor={Colors.drakGray}
          >
            Are you sure you want to delete{' '}
            {data?.name
              ? data?.name
              : data?.description
                ? data?.description
                : 'abc'}{' '}
            conversation?
          </CustomText>

          <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
            <TouchableOpacity
              style={{
                width: '40%',
                marginRight: '5%',
                marginLeft: '5%',
                backgroundColor: Colors.Red,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={deleteChatUser}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={`${fontResize(14)}px`}
                textColor={Colors.White}
              >
                Delete
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDeleteModal(!showDeleteModal);
              }}
              style={{
                width: '40%',
                marginRight: '5%',
                marginLeft: '5%',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.DimGray,
              }}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={`${fontResize(14)}px`}
                textColor={Colors.DimGray}
              >
                Cancel
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>

  );
};

//make this component available to the app
export default DeleteModal;
