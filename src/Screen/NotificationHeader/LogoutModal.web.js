import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { unionIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import Modal from 'modal-enhanced-react-native-web';

const LogoutModal = ({
  showDeleteModal,
  setDeleteModal,
  data,
  onHideCallback,
}) => {
  const { width, height } = useWindowDimensions();
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
          {data === Strings.LOGOUT_ALERT ? Strings.LOGOUT : Strings.HIDE_POST}
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
          {data}
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
            onPress={() => {
              setDeleteModal(onHideCallback, !showDeleteModal);
            }}
          >
            <CustomText
              textAlign={'center'}
              {...theme.fontMedium}
              fontSize={`${fontResize(14)}px`}
              textColor={Colors.White}
            >
              OK
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
  );
};

export default LogoutModal;
