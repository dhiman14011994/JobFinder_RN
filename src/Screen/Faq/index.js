/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import {backIcon} from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import {CustomText} from '../../Component/CustomComponent';
import {style} from './style';
import {useState} from 'react';
import FaqView from './FaqView';

const Faq = ({navigation}) => {
  const [faqData, setFaqData] = useState([
    {
      question: 'How can I use AxessEQ?',
      answer:
        'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
      isView: false,
    },
    {
      question: 'Can I start AxessEQ with a free month package?',
      answer:
        'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
      isView: false,
    },
    {
      question: 'Does AxessEQ App support to earn skills badges',
      answer:
        'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
      isView: false,
    },
    {
      question: 'How can I find a good company?',
      answer:
        'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
      isView: false,
    },
    {
      question: 'What methods of payment does?',
      answer:
        'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
      isView: false,
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <FaqView
        question={item.question}
        answer={item.answer}
        isView={item.isView}
        index={index}
        viewAnswer={() => {
          var updateData = [...faqData];
          updateData[index].isView = !item.isView;
          setFaqData(updateData);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.subContainer}>
        <CustomHeader
          leftButtons={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                resizeMode="contain"
                style={{height: 26, width: 26}}
                source={backIcon}
              />
            </TouchableOpacity>
          }
          rightButtons={<></>}
          title={Strings.FAQ}
        />
        <CustomText marginTop={'20px'} fontSize={'24px'}>
          {Strings.HOW_CAN_YOU}
        </CustomText>
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          data={faqData}
          bounces={false}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Faq;
