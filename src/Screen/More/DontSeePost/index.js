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
import { style } from './style';
import { crossIcon } from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import HorizontalLine from '../../../Component/HorizontalLine';
import CustomFeedbackComponent from '../../../Component/CustomFeedbackComponent';
import CustomButton from '../../../Component/CustomButton';
import { isNative, mxHeight, mxWidth } from '../../../Util';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import Type from '../../../Constants/Type/type';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Redux/actions/authAction';
import { hideAllPost } from '../../../Redux/actions/homeAction';
import Emitter from '../../../Util/eventEmitter';
import { RouteName } from '../../../Navigation/routeName';

const DontSeePost = ({ navigation, route }) => {
  const [isSelected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const [item, setItem] = useState(route.params?.item);
  let type = route.params?.type;
  const [reasonData, setReasonData] = useState([
    {
      id: 1,
      title: Strings.MORE.WHY_DONT_SEE,
      type: Type.REPORT.TITLE,
    },
    {
      id: 2,
      title: Strings.MORE.YOUR_FEEDBACK_WILL_HELP_US,
      type: Type.REPORT.SUBTITLE,
    },
    {
      id: 3,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_AUTHOR,
    },
    {
      id: 4,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_TOPIC,
    },
    {
      id: 5,
      title: Strings.FEEDBACK_POST.I_SEEN_TOO_SAME_POST,
    },
    {
      id: 6,
      title: Strings.FEEDBACK_POST.NOT_INTERESTED_IN_AUTHOR,
    },
    {
      id: 7,
      title: Strings.FEEDBACK_POST.I_SEEN_POST_BEFORE,
    },
    {
      id: 8,
      title: Strings.FEEDBACK_POST.OLD_POST,
    },
    {
      id: 9,
      title: Strings.FEEDBACK_POST.SOMETHING_ELSE,
    },
    {
      id: 10,
      title: Strings.FEEDBACK_POST.IF_THINK_THIS_GOES_AGAINST_PROFESSION,
      type: Type.REPORT.NOTE,
    },
    {
      id: 11,
      title: Strings.FEEDBACK_POST.REPORT_THIS_POST,
      type: Type.REPORT.REPORT_POST,
    },
  ]);

  const renderFeedback = ({ item, index }) => {
    return (
      <CustomFeedbackComponent
        type={Type.REPORT.DONT_SEE_POST}
        data={item}
        index={index}
        isSelected={isSelected}
        setSelected={() => setSelected(index)}
      />
    );
  };

  const hidePost = () => {
    try {
      dispatch(setLoading(true));
      let params = {
        post_id: item?._id,
        post_user_id: item?.user?._id,
        type: 'single',
        status: '',
        report_reason: reasonData[isSelected]?.title,
      };

      dispatch(
        hideAllPost({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            setTimeout(() => {
              Emitter.emit(Type.EMITTER.HIDE_POST);
              if (type == Type.REPORT.DONT_SEE_POST) {
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
              source={crossIcon}
            />
          </TouchableOpacity>
        }
        titleStyle={style.titleStyle}
        title={Strings.MORE.DONT_SEE_POST}
      />
      <HorizontalLine />

      <FlatList
        style={[style.subContainer]}
        bounces={false}
        data={reasonData}
        renderItem={renderFeedback}
        keyExtractor={(item) => item.id}
      />

      <View style={{ width: mxWidth, position: 'absolute', bottom: 10 }}>
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
            hidePost();
          }}
          text={Strings.SUBMIT}
        />
      </View>
    </SafeAreaView>
  );
};

export default DontSeePost;
