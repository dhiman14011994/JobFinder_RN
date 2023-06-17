import React from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';
import Colors from '../../../Resources/Colors';
import { CustomText } from '../../CustomComponent';
import { theme } from '../../../Util/constant';
import { fontResize } from '../../../Util/font';
import EndPoint from '../../../Redux/constants/EndPoint';
import { dummyJob } from '../../../Resources/assets';
import CustomButton from '../../CustomButton';
import Strings from '../../../Resources/Strings';

const DeleteModal = ({ isDelete, setDelete }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    }}>
      <Modal
        animationType="transparent"
        transparent={true}
        visible={isDelete}
        onRequestClose={() => {
          setDelete(!isDelete);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',  
          }}
          
        >
          <View style={styles.modalView}>




            
          </View>

        
        



        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default DeleteModal;
