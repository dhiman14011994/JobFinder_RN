/* eslint-disable react-native/no-inline-styles */
import {
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Modal,
  Text,
} from 'react-native-web';
import React, { useState } from 'react';
import { CustomText } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import {
  CrossIcon,
  dummyImage,
  dummyJob,
  SuccessIcon,
  applyJobSelectedIcon,
  uploadApplyJobIcon,
} from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import { backIcon } from '../../Resources/assets';
import { isNative, mxHeight, mxWidth } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import EndPoint from '../../Redux/constants/EndPoint';

import { theme } from '../../Util/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../Redux/services/profileService';
import { setLoading } from '../../Redux/actions/authAction';
import { applyJobAction } from '../../Redux/actions/jobAndEventAction';
import SummaryComponent from '../../Component/SummaryComponent';

const JobDetail = ({ jobDetail, backApplyJob }) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const [isVisable, setVisable] = useState(false);
  const [isSucessfully, setSucessfully] = useState(false);
  const [isaddResume, setAddResume] = useState(false);
  const userData = useSelector((state) => state.auth.userData.data);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localeResumeFile, setLocaleResumeFile] = useState('');
  const [localeCoverLetterFile, setLocaleConverLetterFile] = useState('');
  var selectItem = '';
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'text/pdf': ['.pdf'] },
    onDrop: async (acceptedFiles) => {
      try {
        let imageFile = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        var getImageURI = await imageUplaod({
          file: imageFile[0],
          token: userData?.access_token,
        });
        if (selectItem == 'resume') {
          setLocaleResumeFile(getImageURI.data[0]);
        } else {
          setLocaleConverLetterFile(getImageURI.data[0]);
        }
      } catch (err) {
        console.log('error>>>', err);
      }
    },
  });

  const applyJobAPi = () => {
    try {
      if (selectedIndex === 1 && localeResumeFile === '') {
        return;
      }
      if (selectedIndex === 2 && localeCoverLetterFile === '') {
        return;
      }
      let params = {
        is_checked: selectedIndex === 0 ? true : false,
        job_id: jobDetail?._id,
        upload_resume: localeResumeFile,
        cover_letter: localeCoverLetterFile,
      };
      dispatch(setLoading(true));
      dispatch(
        applyJobAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            setSucessfully(true);
            setTimeout(() => {
              backApplyJob();
              setAddResume(false);
              setVisable(false);
              setSucessfully(false);
            }, 5000);
          },
          onError: (error) => {
            backApplyJob();
            setAddResume(false);
            setVisable(false);
            setSucessfully(false);
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.White,
        height: mxHeight * 0.58,
        marginTop: mxHeight * 0.005,
        paddingHorizontal: mxWidth * 0.015,
      }}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: mxWidth * 0.01,
          }}
        >
          <Image
            source={dummyImage}
            style={{
              height: mxWidth * 0.06,
              width: mxWidth * 0.06,
              borderRadius: mxWidth * 0.06,
            }}
          />
          <View style={{ marginLeft: mxWidth * 0.01 }}>
            <CustomText
              fontSize={fontResize(mxWidth * 0.009)}
              {...theme.fontSemiBold}
            >
              {'xyz zyx'}
            </CustomText>
            <CustomText
              fontSize={fontResize(mxWidth * 0.009)}
              {...theme.fontSemiBold}
            >
              {'HR manager geeks'}
            </CustomText>
          </View>
        </View>
        <View style={{ height: mxWidth * 0.05 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <CustomText
              {...theme.fontSemiBold}
              textColor={Colors.Black}
              marginBottom={'10px'}
            >
              {jobDetail && jobDetail?.job_title}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginVertical: window.width * 0.02,
          }}
        >
          <CustomText
            {...theme.fontSemiBold}
            textColor={Colors.PrimaryGray}
            style={{ paddingEnd: window.width * 0.05 }}
          >
            {Strings.REQUIREMENTS}
          </CustomText>
          <CustomText
            {...theme.fontMedium}
            style={{ paddingVertical: window.width * 0.01 }}
          >
            {jobDetail && jobDetail?.job_description}
          </CustomText>
        </View>
        <CustomButton
          onPress={() => {
            setVisable(true);
          }}
          width={'50%'}
          height={'50px'}
          backgroundColor={Colors.Blueberry}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.1}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'18px'}
          textColor={Colors.White}
          text={Strings.APPLY_JOB}
        />
      </ScrollView>
      <Modal
        visible={isVisable}
        style={{ flex: 1 }}
        transparent={true}
        animationType={'fade'}
      >
        <View
          style={{
            backgroundColor: Colors.background,
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {isSucessfully ? (
            <View
              style={{
                alignSelf: 'flex-end',
                backgroundColor: Colors.White,
                borderRadius: mxHeight * 0.01,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: mxHeight * 0.02,
                marginRight: mxHeight * 0.02,
                paddingHorizontal: mxHeight * 0.02,
                paddingVertical: mxHeight * 0.02,
              }}
            >
              <Image
                style={{
                  width: mxHeight * 0.05,
                  height: mxHeight * 0.05,
                  marginLeft: -mxHeight * 0.01,
                }}
                resizeMode={'cover'}
                source={SuccessIcon}
              />
              <Text
                style={{
                  ...theme.fontBold,
                  color: Colors.Black,
                  fontSize: fontResize(mxHeight * 0.02),
                }}
              >
                {Strings.SUCCESSFULLY_APPLIED}
              </Text>
            </View>
          ) : (
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {isaddResume ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    width: mxWidth * 0.5,
                    marginVertical: mxHeight * 0.05,
                    padding: '5%',
                    backgroundColor: Colors.White,
                    borderRadius: 20,
                  }}
                >
                  <CustomText fontSize={fontResize(14)} {...theme.fontMedium}>
                    {'Selected Apply Type'}
                  </CustomText>

                  {/* Axxess Profile Card */}
                  <View style={{ paddingVertical: 16 }}>
                    <CustomText
                      fontSize={fontResize(14)}
                      {...theme.fontMedium}
                      style={{ color: Colors.Blueberry }}
                    >
                      {'Use AxessEQ Profile'}
                    </CustomText>

                    <TouchableOpacity
                      onPress={() => setSelectedIndex(0)}
                      style={{
                        borderColor: Colors.Blueberry,
                        borderWidth: 1,
                        borderRadius: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: mxHeight * 0.05,
                        paddingVertical: mxHeight * 0.02,
                        backgroundColor:
                          selectedIndex === 0 ? '#F6F8FF' : Colors.White,
                        marginTop: 8,
                      }}
                    >
                      {selectedIndex == 0 && (
                        <View
                          style={{
                            position: 'absolute',
                            right: mxHeight * 0.008,
                            top: mxHeight * 0.008,
                          }}
                        >
                          <Image
                            style={{ height: 18, width: 18 }}
                            source={applyJobSelectedIcon}
                          />
                        </View>
                      )}
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: mxWidth * 0.05,
                          width: mxWidth * 0.05,
                          borderRadius: mxWidth * 0.05,
                          backgroundColor: Colors.White,
                        }}
                        source={
                          userData && userData?.image
                            ? {
                                uri: EndPoint.baseAssestURL + userData?.image,
                                priority: 'high',
                              }
                            : dummyImage
                        }
                      />
                      <View style={{ paddingHorizontal: 16 }}>
                        <CustomText
                          fontSize={fontResize(16)}
                          {...theme.fontSemiBold}
                          style={{ color: Colors.Black }}
                        >
                          {userData && userData.name}
                        </CustomText>
                        <CustomText
                          fontSize={fontResize(14)}
                          {...theme.fontRegular}
                          style={{ color: Colors.DimGray, paddingTop: 8 }}
                        >
                          {userData && userData.skill}
                        </CustomText>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Manualy Job Apply */}
                  <View style={{ paddingVertical: 16 }}>
                    <CustomText
                      fontSize={fontResize(14)}
                      {...theme.fontMedium}
                      style={{ color: Colors.DimGray }}
                    >
                      {'Manual Apply'}
                    </CustomText>

                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        onClick: (event) => {
                          setSelectedIndex(1);
                          selectItem = 'resume';
                        },
                      })}
                    >
                      <input {...getInputProps()} />
                      <TouchableOpacity
                        disabled={true}
                        style={{
                          borderColor: Colors.Silver,
                          borderWidth: 1,
                          borderRadius: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: mxHeight * 0.05,
                          paddingVertical: mxHeight * 0.02,
                          // justifyContent: 'center',
                          backgroundColor:
                            selectedIndex === 1 ? '#F6F8FF' : Colors.White,
                          marginTop: 8,
                        }}
                      >
                        {selectedIndex == 1 && (
                          <View
                            style={{
                              position: 'absolute',
                              right: mxHeight * 0.008,
                              top: mxHeight * 0.008,
                            }}
                          >
                            <Image
                              style={{ height: 18, width: 18 }}
                              source={applyJobSelectedIcon}
                            />
                          </View>
                        )}
                        {localeResumeFile !== '' ? (
                          <View
                            style={{
                              width: '90%',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              resizeMode="contain"
                              style={{
                                height: mxWidth * 0.05,
                                width: mxWidth * 0.05,
                                borderRadius: mxWidth * 0.05,
                              }}
                              source={require('../../Resources/assets/PdfIcon.png')}
                            />
                            <Text
                              style={{
                                ...theme.fontMedium,
                                fontSize: fontResize(15),
                                marginLeft: 30,
                                color: Colors.Black,
                              }}
                            >
                              {'resume.pdf'}
                            </Text>
                          </View>
                        ) : (
                          <>
                            <Image
                              resizeMode={'contain'}
                              style={{
                                height: mxWidth * 0.05,
                                width: mxWidth * 0.05,
                                borderRadius: mxWidth * 0.05,
                              }}
                              source={uploadApplyJobIcon}
                            />
                            <View style={{ paddingHorizontal: 16 }}>
                              <CustomText
                                fontSize={fontResize(16)}
                                {...theme.fontMedium}
                                style={{ color: Colors.Blueberry }}
                              >
                                {'Upload Resume'}
                              </CustomText>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                    </div>
                    <View>
                      <div
                        {...getRootProps({
                          className: 'dropzone',
                          onClick: (event) => {
                            setSelectedIndex(2);
                            selectItem = 'coverLetter';
                          },
                        })}
                      >
                        <input {...getInputProps()} />
                        <TouchableOpacity
                          disabled={true}
                          style={{
                            borderColor: Colors.Silver,
                            borderWidth: 1,
                            borderRadius: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: mxHeight * 0.05,
                            paddingVertical: mxHeight * 0.02,
                            // justifyContent: 'center',
                            backgroundColor:
                              selectedIndex === 2 ? '#F6F8FF' : Colors.White,
                            marginTop: 40,
                          }}
                        >
                          {selectedIndex == 2 && (
                            <View
                              style={{
                                position: 'absolute',
                                right: mxHeight * 0.008,
                                top: mxHeight * 0.008,
                              }}
                            >
                              <Image
                                style={{ height: 18, width: 18 }}
                                source={applyJobSelectedIcon}
                              />
                            </View>
                          )}
                          {localeCoverLetterFile !== '' ? (
                            <View
                              style={{
                                width: '90%',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Image
                                resizeMode="contain"
                                style={{
                                  height: mxWidth * 0.05,
                                  width: mxWidth * 0.05,
                                  borderRadius: mxWidth * 0.05,
                                }}
                                source={require('../../Resources/assets/PdfIcon.png')}
                              />
                              <Text
                                style={{
                                  ...theme.fontMedium,
                                  fontSize: fontResize(15),
                                  marginLeft: 30,
                                  color: Colors.Black,
                                }}
                              >
                                {'Coverletter.pdf'}
                              </Text>
                            </View>
                          ) : (
                            <>
                              <Image
                                resizeMode={'contain'}
                                style={{
                                  height: mxWidth * 0.05,
                                  width: mxWidth * 0.05,
                                  borderRadius: mxWidth * 0.05,
                                }}
                                source={uploadApplyJobIcon}
                              />
                              <View style={{ paddingHorizontal: 16 }}>
                                <CustomText
                                  fontSize={fontResize(16)}
                                  {...theme.fontMedium}
                                  style={{ color: Colors.Blueberry }}
                                >
                                  {'Upload Cover letter'}
                                </CustomText>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      </div>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 16 }}>
                    <CustomButton
                      onPress={() => {
                        applyJobAPi();
                      }}
                      width={'100%'}
                      height={'50px'}
                      backgroundColor={Colors.Blueberry}
                      marginTop={window.height * 0.03}
                      marginBottom={window.height * 0.1}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      {...theme.fontSemiBold}
                      fontSize={'18px'}
                      textColor={Colors.White}
                      text={Strings.APPLY_NOW}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: mxWidth * 0.5,
                    marginVertical: mxHeight * 0.05,
                    padding: '5%',
                    backgroundColor: Colors.White,
                    borderRadius: 20,
                  }}
                >
                  <HeaderContainer marginTop={0}>
                    <View
                      style={{
                        marginLeft: mxWidth * 0.01,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setVisable(false);
                        }}
                        style={{
                          height: mxWidth * 0.03,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <BackButton resizeMode="contain" source={backIcon} />
                        <Text
                          style={{
                            ...theme.fontBold,
                            marginLeft: 10,
                            fontSize: fontResize(mxWidth * 0.014),
                          }}
                        >
                          {Strings.APPLY_NOW}
                          {'?'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ marginRight: mxWidth * 0.003 }}
                        onPress={() => {
                          setVisable(false);
                        }}
                      >
                        <Image
                          style={{
                            width: mxWidth * 0.02,
                            height: mxWidth * 0.02,
                          }}
                          source={CrossIcon}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    </View>
                  </HeaderContainer>
                  <View
                    style={{
                      backgroundColor: Colors.White,
                      marginTop: mxHeight * 0.02,
                      paddingHorizontal: mxWidth * 0.015,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        resizeMode={'contain'}
                        style={{
                          height: mxWidth * 0.05,
                          width: mxWidth * 0.05,
                          backgroundColor: 'white',
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          borderRadius: mxWidth * 0.005,
                          borderWidth: mxWidth * 0.001,
                          borderColor: Colors.background,

                          elevation: 5,
                        }}
                        source={
                          jobDetail?.company_logo
                            ? {
                                uri:
                                  EndPoint.baseAssestURL +
                                  jobDetail?.company_logo,
                                priority: 'high',
                              }
                            : dummyJob
                        }
                      />
                      <View style={{ paddingHorizontal: 12 }}>
                        <CustomText
                          {...theme.fontSemiBold}
                          textColor={Colors.Black}
                          marginBottom={'10px'}
                          style={{ paddingEnd: window.width * 0.05 }}
                        >
                          {jobDetail && jobDetail?.job_title}
                        </CustomText>
                        <CustomText
                          {...theme.fontSemiBold}
                          fontSize={12}
                          textColor={Colors.PrimaryGray}
                          style={{ paddingEnd: window.width * 0.05 }}
                        >
                          {jobDetail && jobDetail?.company_name}
                        </CustomText>
                      </View>
                    </View>

                    <View style={{ height: mxHeight * 0.05 }} />
                    <SummaryComponent
                      label={Strings.JOB_POST_TITLE}
                      data={jobDetail && jobDetail?.job_title}
                      marginVertical={mxHeight * 0.005}
                    />
                    <View style={{ height: mxHeight * 0.001 }} />
                    <SummaryComponent
                      label={Strings.JOB_TIME}
                      data={jobDetail && jobDetail?.job_type}
                      marginVertical={mxHeight * 0.01}
                    />
                    {/* <View style={{ height: mxWidth * 0.01 }} /> */}
                    <SummaryComponent
                      label={Strings.SALARY_RANGE}
                      data={`${jobDetail && jobDetail?.salary_range} (${
                        jobDetail && jobDetail?.salary_period
                      })`}
                      marginVertical={mxHeight * 0.005}
                    />
                    <SummaryComponent
                      label={Strings.ADDRESS}
                      data={jobDetail && jobDetail?.address}
                      marginVertical={mxHeight * 0.01}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        marginVertical: window.width * 0.002,
                      }}
                    >
                      <CustomText
                        {...theme.fontSemiBold}
                        textColor={Colors.PrimaryGray}
                      >
                        {Strings.JOB_DESCRIPTION} :{' '}
                      </CustomText>
                      <CustomText
                        {...theme.fontMedium}
                        style={{ paddingVertical: window.width * 0.005 }}
                      >
                        {jobDetail && jobDetail?.job_description}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginVertical: window.width * 0.001,
                      }}
                    >
                      <CustomText
                        {...theme.fontSemiBold}
                        textColor={Colors.PrimaryGray}
                        style={{ paddingEnd: window.width * 0.01 }}
                      >
                        {Strings.QUALIFICATIONS} :{' '}
                      </CustomText>
                      <CustomText
                        {...theme.fontMedium}
                        style={{ paddingVertical: window.width * 0.01 }}
                      >
                        {jobDetail && jobDetail?.qualification}
                      </CustomText>
                    </View>

                    <CustomButton
                      onPress={() => {
                        setAddResume(true);
                      }}
                      width={'50%'}
                      height={'50px'}
                      backgroundColor={Colors.Blueberry}
                      marginTop={window.height * 0.03}
                      marginBottom={window.height * 0.1}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      {...theme.fontSemiBold}
                      fontSize={'18px'}
                      textColor={Colors.White}
                      text={Strings.APPLY_JOB}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default JobDetail;
