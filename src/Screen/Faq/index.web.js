import { useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native-web';
import { CustomText } from '../../Component/CustomComponent';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { fontResize } from '../../Util/font';
import FaqView from './FaqView.web';

const Faq = ({ navigation }) => {
  const window = useWindowDimensions();
  const width = window.width;
  const height = window.height;
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

  const renderItem = ({ item, index }) => {
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
    <View
      style={{
        width: width,
        height: height * 0.8,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.2,
        backgroundColor: Colors.White,
      }}
    >
      <CustomText
        style={{
          width: width,
          paddingVertical: height * 0.02,
        }}
        textAlign={'left'}
        fontFamily={'Gilroy-bold'}
        fontSize={fontResize(width * 0.019)}
      >
        {Strings.FAQ}
      </CustomText>
      <View
        style={{
          flex: 1,
          paddingVertical: height * 0.03,
          marginLeft: width * 0.08,
        }}
      >
        <CustomText
          marginTop={height * 0.01}
          fontSize={fontResize(width * 0.014)}
          fontFamily={'Gilroy-SemiBold'}
          textAlign={'left'}
        >
          {Strings.HOW_CAN_YOU}
        </CustomText>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={faqData}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Faq;
