import React, { useState } from 'react';
import {
  Image,
  View,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { crossIcon } from '../../../Resources/assets';
import HorizontalLine from '../../../Component/HorizontalLine';
import { useDispatch } from 'react-redux';
import Strings from '../../../Resources/Strings';
import Type from '../../../Constants/Type/type';
import CustomHeader from '../../../Component/CustomHeader/index.web';
import { useWindowDimensions } from 'react-native';
import Colors from '../../../Resources/Colors';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import CustomFeedbackWebComponent from '../../../Component/CustomFeedbackComponent/index.web';
import CustomButton from '../../../Component/CustomButton';
import { hideAllPost } from '../../../Redux/actions/homeAction';
import { setLoading } from '../../../Redux/actions/authAction';
import { TouchableOpacity } from 'react-native-web';
import { theme } from '../../../Util/constant';
import Emitter from '../../../Util/eventEmitter';

const DontSeePostWeb = ({
  showSeePost,
  setShowSeePost,
  data,
  title,
  isSeePost,
  setPostResult,
  postData,
}) => {
  const [isSelected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const window = useWindowDimensions();

  const hidePost = () => {
    dispatch(setLoading(true));
    let params = {
      post_id: postData?._id,
      post_user_id: postData?.user?._id,
      type: 'single',
      status: isSeePost ? '' : 'report',
      report_reason: data[isSelected]?.title,
    };
    dispatch(
      hideAllPost({
        params,
        onSuccess: (result) => {
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          setPostResult(isSeePost);
          setShowSeePost(!showSeePost);
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderFeedback = ({ item, index }) => {
    return (
      <CustomFeedbackWebComponent
        type={Type.REPORT.DONT_SEE_POST}
        data={item}
        index={index}
        isSelected={isSelected}
        setSelected={() => setSelected(index)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="transparent"
        transparent={true}
        visible={showSeePost}
        onRequestClose={() => {
          setShowSeePost(!showSeePost);
        }}
      >
        <View>
          <View
            style={{
              width: window.width,
              height: window.height,
              alignSelf: 'center',
              justifyContent: 'center',
              shadowColor: Colors.gray2,
              backgroundColor: 'rgba(0,0,0,0.5)',
              overflow: 'hidden',
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                height: window.height * 0.8,
                alignSelf: 'center',
                shadowColor: Colors.gray2,
                backgroundColor: Colors.White,
                padding: 20,
                overflow: 'hidden',
                shadowRadius: 20,
                shadowOpacity: 1,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  marginBottom: window.height * 0.02,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowSeePost();
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{
                      height: window.width * 0.015,
                      width: window.width * 0.015,
                      tintColor: Colors.Black,
                    }}
                    source={crossIcon}
                  />
                </TouchableOpacity>

                <CustomText
                  textColor={Colors.Black}
                  fontSize={fontResize(window.width * 0.015)}
                  marginLeft={window.width * 0.02}
                >
                  {title}
                </CustomText>
              </View>
              <HorizontalLine />

              <View
                style={{
                  height: window.height * 0.55,
                  paddingHorizontal: window.width * 0.05,
                  paddingVertical: window.height * 0.02,
                }}
              >
                <ScrollView>
                  {data.map((item, index) => {
                    return renderFeedback({ item, index });
                  })}
                </ScrollView>
              </View>

              <CustomButton
                buttonContainer={{
                  position: 'absolute',
                  bottom: window.height * 0.02,
                }}
                disabled={isSelected == -1 ? true : false}
                width={window.width * 0.2}
                height={window.height * 0.06}
                backgroundColor={
                  isSelected == -1 ? Colors.SilverLight : Colors.Blueberry
                }
                marginTop={window.height * 0.03}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                fontFamily={'Gilroy-Bold'}
                fontSize={fontResize(window.width * 0.02)}
                textColor={isSelected == -1 ? Colors.lightGray : Colors.White}
                onPress={() => {
                  hidePost();
                }}
                text={Strings.SUBMIT}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DontSeePostWeb;

const style = StyleSheet.create({
  imageStyle: {
    height: 24,
    width: 24,
    tintColor: Colors.Black,
  },
});
