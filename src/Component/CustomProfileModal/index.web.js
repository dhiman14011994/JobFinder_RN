import { StyleSheet, Pressable,Alert} from 'react-native'
import React,{useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    SafeAreaView,
  } from 'react-native-web';

const CustomprofileModal = ({
  visible,onRequestClose
}) => {
  
  return (
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={styles.centeredView}
      >
       
          <View style={styles.container}>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
        
      </Modal>
    
  )
}

export default CustomprofileModal

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        marginLeft:"30%"      
      },
     container:{
      
      height:"20%",
      width:"20%",
      marginHorizontal:"25%",
      marginVertical:"20%",
     justifyContent:"center",
     alignItems:"center",
      backgroundColor:"red"
     },
     modalText:{
      backgroundColor:"green"
     }
})