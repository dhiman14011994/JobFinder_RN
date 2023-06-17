import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import { setTermCondition } from '../../Redux/actions/profileAction';
import toast from 'react-simple-toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TermsCondition = ({ navigation, route }) => {
  const termCondition = useSelector((state) => state.profile.termCondition);
  const userData = useSelector((state) => state.auth.userData);
  const [terms, setTerms] = useState(termCondition);
  const isLogin = route?.params?.isLogin;
  const dispatch = useDispatch();

  const createTwoButtonAlert = () =>
    toast('Terms and conditions has been saved');

  useEffect(async () => {
    const term = await AsyncStorage.getItem('isTerms');
    setTerms(term == 'true' ? true : false);
  }, []);

  const agreePress = () => {
    if (terms) {
      AsyncStorage.setItem('isTerms', 'true');
      dispatch(setTermCondition(terms));

      setTimeout(() => {
        createTwoButtonAlert();
      }, 100);
    } else {
      toast('Please accpet terms and condition');
    }
  };

  return (
    <View style={style.container}>
      <ScrollView bounces={false} contentContainerStyle={{ flex: 1 }}>
        <iframe
          height="80%"
          style={{ border: 'none' }}
          src="https://api.axesseq.com/terms-of-use"
          title="description"
        ></iframe>
        {!terms && userData == null && (
          <View style={style.checkBoxContainer}>
            <CheckBox
              disabled={false}
              value={terms}
              onFillColor={Colors.Blueberry}
              onCheckColor={'#fff'}
              onTintColor={'#fff'}
              boxType={'square'}
              onAnimationType={'stroke'}
              onValueChange={(newValue) => {
                setTerms(!terms);
              }}
            />
            <Text style={style.acceptText}>{Strings.I_AGREE_WITH}</Text>
          </View>
        )}
      </ScrollView>
      {!terms && userData == null && (
        <TouchableOpacity style={style.btnContainer} onPress={agreePress}>
          <Text style={style.btnText}>{Strings.I_AGREE}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '15%',
    paddingTop: '6%',
  },
  mainText: {
    fontSize: fontResize(22),
    color: Colors.Black,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: fontResize(14),
    color: Colors.DimGray,
    marginTop: '3%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    paddingVertical: '3%',
    alignItems: 'center',
    marginTop: '3%',
  },
  acceptText: {
    fontSize: fontResize(16),
    textTransform: 'capitalize',
    marginLeft: '4%',
    color: Colors.EerieBlack,
  },
  btnContainer: {
    height: '10%',
    width: '20%',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
    backgroundColor: Colors.Blueberry,
  },
  btnText: {
    fontSize: fontResize(16),
    color: Colors.White,
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default TermsCondition;
