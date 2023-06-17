/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import CustomImageSelector from '../../Component/CustomImageSelector';
import EndPoint from '../../Redux/constants/EndPoint';
import CustomButton from '../../Component/CustomButton';
import { imageUplaod } from '../../Redux/services/profileService';
import { useDropzone } from 'react-dropzone';
import toast from 'react-simple-toasts';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import './dropdown.css';
import CustomDropDown from '../../Component/CustomDropDown';
import styled from 'styled-components';
import { createJobPost } from '../../Redux/services/jobsService';
import Success from '../../Component/Success/index.web';
import Emitter from '../../Util/eventEmitter';
import { containsOnlyStrings } from '../../Util/validation';
import { TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../Component/Picker/index.web';
import CameraModal from '../HomeWeb/Camera/Modal/index.web';
import Type from '../../Constants/Type/type';

const DropDownContainer = styled('div')``;
const DropDownHeader = styled('div')``;
const DropDownListContainer = styled('div')``;
const DropDownList = styled('ul')``;
const ListItem = styled('li')``;

const CreateJobPost = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const [selectedPostType, setSelectedPostType] = useState('Full Time');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('100K - 200K');
  const [selectedSalaryPeriod, setSelectedSalaryPeriod] = useState('Yearly');
  const [jobDescription, setJobDescription] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [userImage, setImage] = useState('');
  const [isPosttype, setIsPostType] = useState(false);
  const [isSalary, setIsSalary] = useState(false);
  const [isJobType, setIsJobType] = useState(false);
  const [isCreated, setCreated] = useState(false);
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const dispatch = useDispatch();

  const isEdited = route.params.isEdited;

  const item = route?.params.item;

  useEffect(() => {
    setJobTitle(item?.job_title);
    setCompanyName(item?.company_name);
    setAddress(item?.address);
    setJobDescription(item?.job_description);
    setQualifications(item?.qualification);
    setImage(item?.company_logo ? item?.company_logo : '');
    setSelectedSalaryPeriod(
      item?.salary_period ? item?.salary_period : 'Yearly'
    );
    setSelectedPostType(item?.job_type ? item?.job_type : 'Full Time');
    setSelectedSalaryRange(
      item?.salary_range ? item?.salary_range : '100K - 200K'
    );
  }, [item]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: async (acceptedFiles) => {
      try {
        // onPressGallery(
        let imageFile = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        dispatch(setLoading(true));
        var getImageURI = await imageUplaod({
          file: imageFile[0],
          token: userData?.access_token,
        });
        setImage(getImageURI.data[0]);
        dispatch(setLoading(false));
        // );
      } catch (err) {
        dispatch(setLoading(false));
        toast(err?.message);
      }
    },
  });

  const uploadImageData = async (data) => {
    dispatch(setLoading(true));
    var getImageURI = await imageUplaod({
      file: data,
      token: userData?.access_token,
    });
    setImage(getImageURI.data[0]);
    dispatch(setLoading(false));
    userImage(getImageURI.data[0]);
  };

  const salaryRange = [
    {
      value: '100K - 200K',
    },
    {
      value: '200K - 300K',
    },
    {
      value: '300K - 400K',
    },
    {
      value: '400K - 500K',
    },
    {
      value: '500K - 600K',
    },
  ];

  const jobSalaryPeriodList = [
    {
      value: 'Yearly',
    },
    {
      value: 'Monthly',
    },
  ];
  const jobPostTypeList = [{ value: 'Full Time' }, { value: 'Part Time' }];

  const onValidation = () => {
    var isValid = true;

    if (jobTitle.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_JOB_TITLE);
      return isValid;
    }
    if (companyName.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_COMPANY_NAME);
      return isValid;
    }
    if (address.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_COMPANY_ADDRESS);
      return isValid;
    }
    if (jobDescription.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_JOB_DESCRIPTION);
      return isValid;
    }
    if (qualifications.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_QUALIFICATIONS);
      return isValid;
    }
    return isValid;
  };

  const goToSummary = () => {
    if (!onValidation()) {
      return;
    }
    var data = {
      title: jobTitle.trim(),
      companyName: companyName.trim(),
      companyLogo: userImage,
      jobType: selectedPostType,
      address: address.trim(),
      salary_range: selectedSalaryRange,
      salary_period: selectedSalaryPeriod,
      jobDescription: jobDescription.trim(),
      qualifications: qualifications.trim(),
    };

    navigation.navigate(RouteName.JOB_SUMMARY, { data: data });
  };

  const updateProfile = async () => {
    if (!onValidation()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      if (userImage != '') {
        // let imageData = {
        //   uri: userImage,
        //   type: 'image/jpg',
        //   name: 'image.jpg',
        // };
        // var getImageURI = await imageUplaod({
        //   file: imageData,
        //   token: userData?.access_token,
        // });
        var data = {
          id: item?._id,
          job_title: jobTitle.trim(),
          company_name: companyName.trim(),
          company_logo: userImage,
          role: selectUser,
          job_type: selectedPostType,
          address: address.trim(),
          salary_range: selectedSalaryRange,
          salary_period: selectedSalaryPeriod,
          job_description: jobDescription.trim(),
          qualification: qualifications.trim(),
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          id: item?._id,
          job_title: jobTitle.trim(),
          company_name: companyName.trim(),
          role: selectUser,
          job_type: selectedPostType,
          address: address.trim(),
          salary_range: selectedSalaryRange,
          salary_period: selectedSalaryPeriod,
          job_description: jobDescription.trim(),
          qualification: qualifications.trim(),
        };
        apiRequestData = { ...data };
      }

      console.log('=======Job Data', data);
      var createJobResponse = await createJobPost(apiRequestData);
      if (createJobResponse.code == 200) {
        Emitter.emit('JobCreated');
        setCreated(true);
        dispatch(setLoading(false));
      } else {
      }
    } catch (error) {
      // alert(error)
      console.log('error', error);
      // dispatch(setLoading(false));
    }
  };

  return (
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
          textAlign={'start'}
          fontFamily={'Gilroy-bold'}
          fontSize={fontResize(window.width * 0.02)}
        >
          {Strings.CREATE_JOB}
        </CustomText>

        <CustomText
          fontSize={fontResize(window.width * 0.012)}
          {...theme.fontSemiBold}
        >
          {Strings.JOB_POST_TITLE}
        </CustomText>

        <TextInput
          value={jobTitle}
          onChangeText={(text) => {
            if (containsOnlyStrings(text)) {
              setJobTitle(text);
            }
            if (text == '') {
              setJobTitle('');
            }
          }}
          style={[
            {
              width: window.width * 0.2,
              borderWidth: window.width * 0.0002,
              padding: window.width * 0.006,
              borderColor: Colors.gray2,
              marginTop: window.width * 0.008,
              borderRadius: window.width * 0.006,
              marginBottom: window.width * 0.012,
              fontFamily: 'Gilroy-Regular',
              fontSize: fontResize(mxWidth * 0.01),
            },
          ]}
        />

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <CustomText
            style={{
              paddingVertical: window.height * 0.01,
            }}
            textAlign={'start'}
            fontFamily={'Gilroy-bold'}
            fontSize={fontResize(window.width * 0.013)}
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
          <TouchableOpacity
            onPress={() => {
              setPicker(true);
            }}
          >
            <CustomImageSelector
              disabled={true}
              isWeb={true}
              AttachText={Strings.ATTACH_YOUR_PHOTO}
              label={Strings.COMPANY_LOGO}
              labelFontSize={fontResize(window.width * 0.012)}
              width={window.width * 0.2}
              height={window.height * 0.2}
              imagePath={
                userImage == ''
                  ? userImage
                  : `${EndPoint.baseAssestURL}${userImage}`
              }
              window={window}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', marginLeft: 20 }}>
            <CustomText
              fontSize={fontResize(window.width * 0.01)}
              {...theme.fontSemiBold}
            >
              Company Name
            </CustomText>

            <TextInput
              value={companyName}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setCompanyName(text);
                }
                if (text == '') {
                  setCompanyName('');
                }
              }}
              style={[
                {
                  width: window.width * 0.2,
                  borderWidth: window.width * 0.0002,
                  padding: window.width * 0.006,
                  borderColor: Colors.gray2,
                  marginTop: window.width * 0.008,
                  borderRadius: window.width * 0.006,
                  marginBottom: window.width * 0.012,
                  fontFamily: 'Gilroy-Regular',
                  fontSize: fontResize(mxWidth * 0.01),
                },
              ]}
            />

            <View style={{ flexDirection: 'column' }}>
              <CustomText
                fontSize={fontResize(window.width * 0.01)}
                {...theme.fontSemiBold}
              >
                Salary Range
              </CustomText>

              <View style={{ flexDirection: 'row' }}>
                <CustomDropDown
                  containerStyle={{
                    width: window.width * 0.11,
                    marginRight: window.width * 0.006,
                    marginTop: window.width * 0.008,
                    marginBottom: window.width * 0.012,
                  }}
                  isOpen={isSalary}
                  setOpen={setIsSalary}
                  value={selectedSalaryRange}
                  data={salaryRange}
                  setItem={setSelectedSalaryRange}
                />
                <CustomDropDown
                  containerStyle={{
                    width: window.width * 0.08,
                    marginLeft: window.width * 0.006,
                    marginRight: window.width * 0.012,
                    marginTop: window.width * 0.008,
                    marginBottom: window.width * 0.012,
                    zIndex: 1,
                  }}
                  isOpen={isPosttype}
                  setOpen={setIsPostType}
                  value={selectedPostType}
                  data={jobPostTypeList}
                  setItem={setSelectedPostType}
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <CustomText
              fontSize={fontResize(window.width * 0.01)}
              {...theme.fontSemiBold}
            >
              Job Type
            </CustomText>
            <CustomDropDown
              containerStyle={{
                width: window.width * 0.2,
                marginTop: window.width * 0.008,
                marginBottom: window.width * 0.012,
              }}
              isOpen={isJobType}
              setOpen={setIsJobType}
              value={selectedSalaryPeriod}
              data={jobSalaryPeriodList}
              setItem={setSelectedSalaryPeriod}
            />

            <View style={{ flexDirection: 'column' }}>
              <CustomText
                fontSize={fontResize(window.width * 0.01)}
                {...theme.fontSemiBold}
              >
                Address
              </CustomText>

              <TextInput
                value={address}
                onChangeText={(text) => {
                  if (containsOnlyStrings(text)) {
                    setAddress(text);
                  }
                  if (text == '') {
                    setAddress('');
                  }
                }}
                style={[
                  {
                    width: window.width * 0.2,
                    borderWidth: window.width * 0.0002,
                    padding: window.width * 0.006,
                    borderColor: Colors.gray2,
                    marginTop: window.width * 0.008,
                    borderRadius: window.width * 0.006,
                    marginBottom: window.width * 0.012,
                    fontFamily: 'Gilroy-Regular',
                    fontSize: fontResize(mxWidth * 0.01),
                  },
                ]}
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
          <View focusable={!isSalary} style={{ flex: 1, marginEnd: 40 }}>
            <CustomText
              fontSize={fontResize(window.width * 0.01)}
              {...theme.fontSemiBold}
            >
              Job Description
            </CustomText>

            <TextInput
              value={jobDescription}
              multiline={true}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setJobDescription(text);
                }
                if (text == '') {
                  setJobDescription('');
                }
              }}
              editable={!isSalary}
              style={[
                {
                  height: window.height * 0.4,
                  textAlignVertical: 'top',
                  borderWidth: window.width * 0.0002,
                  padding: window.width * 0.006,
                  borderColor: Colors.gray2,
                  marginTop: window.width * 0.008,
                  borderRadius: window.width * 0.006,
                  marginBottom: window.width * 0.012,
                  fontFamily: 'Gilroy-Regular',
                  fontSize: fontResize(mxWidth * 0.01),
                },
              ]}
            />
          </View>
          <View style={{ flex: 1, marginStart: 40 }}>
            <CustomText
              multiline={true}
              fontSize={fontResize(window.width * 0.01)}
              {...theme.fontSemiBold}
            >
              Qualification
            </CustomText>

            <TextInput
              value={qualifications}
              multiline={true}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setQualifications(text);
                }
                if (text == '') {
                  setQualifications('');
                }
              }}
              style={[
                {
                  height: window.height * 0.4,
                  textAlignVertical: 'top',
                  borderWidth: window.width * 0.0002,
                  padding: window.width * 0.006,
                  borderColor: Colors.gray2,
                  marginTop: window.width * 0.008,
                  borderRadius: window.width * 0.006,
                  marginBottom: window.width * 0.012,
                  fontFamily: 'Gilroy-Regular',
                  fontSize: fontResize(window.width * 0.01),
                },
              ]}
            />
          </View>
        </View>

        <CustomButton
          onPress={() => {
            {
              isEdited ? updateProfile() : goToSummary();
            }
          }}
          alignSelf={'flex-start'}
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

      <Success
        setCreated={setCreated}
        isCreated={isCreated}
        navigation={navigation}
      ></Success>

      {isPicker && (
        <ImagePickerModal
          showPickerModal={isPicker}
          setPickerModal={() => {
            setPicker(false);
          }}
          setSelection={(value) => {
            if (value === Type.IMAGE_TYPE.CAMERA) {
              setCamera(true);
            } else {
              setImage(value);
            }
            setPicker(false);
          }}
          token={userData?.access_token}
        />
      )}

      {isCamera && (
        <CameraModal
          showCameraModal={isCamera}
          setCameraModal={(value) => {
            setCamera(value);
          }}
          setCameraData={(value) => {
            uploadImageData(value);
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignContent: 'center',
    paddingVertical: 5,
  },
});

export default CreateJobPost;
