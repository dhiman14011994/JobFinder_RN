import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Component/CustomHeader';
import { backIcon, crossIcon } from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import HorizontalLine from '../../../Component/HorizontalLine';
import CustomFeedbackComponent from '../../../Component/CustomFeedbackComponent';
import CustomButton from '../../../Component/CustomButton';
import { mxHeight, mxWidth } from '../../../Util';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import { style } from './style';
import Emitter from '../../../Util/eventEmitter';
import Type from '../../../Constants/Type/type';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Redux/actions/authAction';
import { hideAllPost } from '../../../Redux/actions/homeAction';
import { RouteName } from '../../../Navigation/routeName';

const ReportPost = ({ navigation, route }) => {
  const [isSelected, setSelected] = useState(-1);
  const [item, setItem] = useState(route.params?.item);
  const dispatch = useDispatch();
  let type = route.params?.type;
  const [reasonData, setReasonData] = useState([
    {
      id: 1,
      title: Strings.MORE.WHY_ARE_YOU_REPORTING_THIS,
      type: Type.REPORT.TITLE,
    },
    {
      id: 2,
      title: Strings.MORE.WHY_ARE_YOU_REPORTING_THIS_DESC,
      type: Type.REPORT.SUBTITLE,
    },
    {
      id: 3,
      title: Strings.REPORT_POST.SUSPICIOUS_SPAM_FAKE,
      type: Type.REPORT.OPTION,
    },
    {
      id: 4,
      title: Strings.REPORT_POST.HATEFUL_SPEECH,
      type: Type.REPORT.OPTION,
    },
    {
      id: 5,
      title: Strings.REPORT_POST.PHYSICAL_HARM,
      type: Type.REPORT.OPTION,
    },
    {
      id: 6,
      title: Strings.REPORT_POST.ADULT_CONTENT,
      type: Type.REPORT.OPTION,
    },
    {
      id: 7,
      title: Strings.REPORT_POST.DEFAMATION,
      type: Type.REPORT.OPTION,
    },
  ]);

  const renderFeedback = ({ item, index }) => {
    return (
      <CustomFeedbackComponent
        type={Type.REPORT.REPORT_TYPE}
        data={item}
        index={index}
        isSelected={isSelected}
        setSelected={() => setSelected(index)}
      />
    );
  };

  const reportPost = () => {
    try {
      dispatch(setLoading(true));
      let params = {
        post_id: item?._id,
        post_user_id: item?.user?._id,
        type: 'single',
        status: 'report',
        report_reason: reasonData[isSelected]?.title,
      };
      dispatch(
        hideAllPost({
          params,
          onSuccess: (result) => {
            setTimeout(() => {
              dispatch(setLoading(false));
              Emitter.emit(Type.EMITTER.REPORT_POST, {
                data: item?.user?.name,
              });
              if (type == Type.REPORT.REPORT_POST) {
                navigation.goBack();
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: RouteName.HOMESTACK }],
                });
              }
            }, 800);
          },
          onError: (error) => {
            console.log('Error', JSON.stringify(error));
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={style.headerStyle}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={style.imageStyle}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        titleStyle={style.titleStyle}
        title={Strings.MORE.REPORT}
      />
      <HorizontalLine />

      <FlatList
        style={style.subContainer}
        bounces={false}
        data={reasonData}
        renderItem={renderFeedback}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{ width: mxWidth, position: 'absolute', bottom: mxHeight * 0.1 }}
      >
        <CustomButton
          disabled={isSelected == -1 ? true : false}
          width={'90%'}
          height={mxHeight * 0.06}
          backgroundColor={
            isSelected == -1 ? Colors.SilverLight : Colors.Blueberry
          }
          marginTop={mxHeight * 0.03}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          fontFamily={'Gilroy-Bold'}
          fontSize={fontResize(mxWidth * 0.07)}
          textColor={isSelected == -1 ? Colors.lightGray : Colors.White}
          onPress={() => {
            reportPost();
          }}
          text={Strings.SUBMIT}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReportPost;
