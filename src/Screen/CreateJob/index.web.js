//import liraries
import React, { useState } from 'react';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Dimensions,
} from 'react-native';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import CustomImageSelector from '../../Component/CustomImageSelector';
import EndPoint from '../../Redux/constants/EndPoint';
import CustomButton from '../../Component/CustomButton';
import CustomHeader from '../../Component/CustomHeader';

// create a component
const CreateJob = () => {
  const window = useWindowDimensions();
  const [userImage, setuserImage] = useState('');

  return (
    <View>
      <CustomHeader
        window={window}
        activeTab={''}
        isProfile={true}
        backPress={() => navigation.goBack()}
      />

      <ScrollView bounces={false}>
        <View
          style={{
            paddingVertical: window.height * 0.03,
            paddingHorizontal: window.width * 0.1,
            backgroundColor: Colors.White,
            borderRadius: window.width * 0.01,
          }}
        >
          <CustomText
            style={{
              width: window.width,
              paddingVertical: window.height * 0.03,
            }}
            textAlign={'left'}
            fontFamily={'Gilroy-bold'}
            fontSize={fontResize(mxWidth * 0.02)}
          >
            {'here'}
          </CustomText>

          <CustomText
            fontSize={fontResize(mxWidth * 0.012)}
            {...theme.fontSemiBold}
          >
            Title of the Job
          </CustomText>

          <TextInput style={[styles.input, { width: window.width * 0.2 }]} />

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <CustomText
              style={{
                paddingVertical: window.height * 0.01,
              }}
              textAlign={'left'}
              fontFamily={'Gilroy-bold'}
              fontSize={fontResize(mxWidth * 0.013)}
            >
              Company Info
            </CustomText>

            <View
              style={{
                marginLeft: 20,
                backgroundColor: Colors.gray2,
                height: 2,
                width: '85%',
                alignSelf: 'center',
              }}
            ></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <CustomImageSelector
              disabled={true}
              isWeb={true}
              AttachText={Strings.ATTACH_YOUR_PHOTO}
              label={Strings.COMPANY_LOGO}
              width={window.width * 0.2}
              height={window.height * 0.2}
              imagePath={
                userImage == ''
                  ? userImage
                  : `${EndPoint.baseAssestURL}${userImage}`
              }
              window={window}
              margin={20}
            />
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <CustomText
                fontSize={fontResize(mxWidth * 0.01)}
                {...theme.fontSemiBold}
              >
                Company Name
              </CustomText>

              <TextInput
                style={[styles.input, { width: window.width * 0.2 }]}
              />

              <View style={{ flexDirection: 'column' }}>
                <CustomText
                  fontSize={fontResize(mxWidth * 0.01)}
                  {...theme.fontSemiBold}
                >
                  Salary Range
                </CustomText>

                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={[
                      styles.input,
                      { width: window.width * 0.15, marginRight: 10 },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        width: window.width * 0.1,
                        marginLeft: 10,
                        marginRight: 20,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <CustomText
                fontSize={fontResize(mxWidth * 0.01)}
                {...theme.fontSemiBold}
              >
                Job Type
              </CustomText>

              <TextInput
                style={[styles.input, { width: window.width * 0.2 }]}
              />

              <View style={{ flexDirection: 'column' }}>
                <CustomText
                  fontSize={fontResize(mxWidth * 0.01)}
                  {...theme.fontSemiBold}
                >
                  Address
                </CustomText>

                <TextInput
                  style={[styles.input, { width: window.width * 0.2 }]}
                />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.container,
              {
                flexDirection: 'row',
                marginVertical: 30,
                height: window.height * 0.5,
              },
            ]}
          >
            <View style={{ flex: 1, marginEnd: 40 }}>
              <CustomText
                fontSize={fontResize(mxWidth * 0.01)}
                {...theme.fontSemiBold}
              >
                Job Description
              </CustomText>

              <TextInput
                style={[styles.input, { height: window.height * 0.5 }]}
              />
            </View>
            <View style={{ flex: 1, marginStart: 40 }}>
              <CustomText
                fontSize={fontResize(mxWidth * 0.01)}
                {...theme.fontSemiBold}
              >
                Job Description
              </CustomText>

              <TextInput
                style={[styles.input, { height: window.height * 0.5 }]}
              />
            </View>
          </View>

          <View>
            <CustomButton
              alignSelf={'start'}
              width={window.width * 0.3}
              height={'60px'}
              backgroundColor={Colors.Blueberry}
              borderRadius={'10px'}
              fontSize={'16px'}
              textColor={Colors.White}
              textTransform={'capitalize'}
              text={'Continue'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignContent: 'center',
    paddingVertical: 5,
  },

  label: {
    marginLeft: 20,
    color: Colors.drakGray,
    textAlign: 'left',
    fontFamily: 'Gilroy-Regular',
    fontSize: fontResize(mxWidth * 0.01),
  },
  borderView: {
    marginTop: 10,
    height: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.2,
    borderColor: Colors.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.gray2,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Gilroy-Regular',
    fontSize: fontResize(mxWidth * 0.01),
  },
});

//make this component available to the app
export default CreateJob;
