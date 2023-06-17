import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import CustomImageSelector from '../../Component/CustomImageSelector';
import CustomModal from '../../Component/CustomModal/CustomModal';
import DownArrow from '../../Resources/assets/downArrow.png';
import CustomButton from '../../Component/CustomButton';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { RouteName } from '../../Navigation/routeName';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

const CreateJobPost = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();

  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
  );
  const userType = useSelector((state) => state.auth.userType);
  const jobPostTypeList = ['Full Time', 'Part Time'];
  const jobSalaryRangeList = [
    '100K - 200K',
    '200K - 300K',
    '300K - 500K',
    '500K - 700K',
    '700K - 900K',
  ];
  const jobSalaryPeriodList = ['Yearly', 'Monthly'];
  const [selectedPostType, setSelectedPostType] = useState('Full Time');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('100K - 200K');
  const [selectedSalaryPeriod, setSelectedSalaryPeriod] = useState('Yearly');
  const [jobDescription, setJobDescription] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [isModal, setModal] = useState(false);
  const [userImage, setImage] = useState('');

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const selectImage = async (type) => {
    try {
      // dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        // maxWidth: 1000,
        // maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        // quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type == 'camera') {
          launchCamera(options, async (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              const fileSize = Number(res?.assets[0]?.fileSize) / 1000000;
              if (fileSize < 20) {
                setImage(res.assets[0].uri);
              } else {
                alert(Strings.FILE_SIZE_TEXT);
              }
            }
            setModal(false);
          }).catch((err) => {
            setModal(false);
          });
        } else {
          launchImageLibrary(options, async (response) => {
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
              if (fileSize < 20) {
                setImage(response.assets[0].uri);
              } else {
                alert(Strings.FILE_SIZE_TEXT);
              }
            }
            setModal(false);
            // dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            // dispatch(setLoading(false));
          });
        }
        // setModal(false);
      } else {
        setModal(false);
        // dispatch(setLoading(false));
      }
    } catch (error) {
      setModal(false);
      // dispatch(setLoading(false));
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission error', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const onValidation = () => {
    var isValid = true;

    if (jobTitle.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_JOB_TITLE);
      return isValid;
    }
    if (companyName.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_COMPANY_NAME);
      return isValid;
    }
    if (address.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_COMPANY_ADDRESS);
      return isValid;
    }
    if (jobDescription.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_JOB_DESCRIPTION);
      return isValid;
    }
    if (qualifications.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_QUALIFICATIONS);
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

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.White, height: window.height }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isNative && (
          <HeaderContainer marginTop={0}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 15 }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}

        <CustomText
          marginLeft={window.width * 0.05}
          fontSize={fontResize(30)}
          textColor={Colors.Black}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.CREATE_JOB_POST}
        </CustomText>

        <CustomView
          width={window.width * 0.9}
          marginLeft={window.width * 0.05}
          marginRight={window.width * 0.05}
          marginTop={window.height * 0.05}
          height={window.height * 0.787}
        >
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: window.width * 0.9 }}
          >
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.JOB_POST_TITLE}
              onChangeText={(text) => {
                setJobTitle(text);
              }}
              value={jobTitle}
              placeholder={''}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.COMPANY_NAME}
              onChangeText={(text) => {
                setCompanyName(text);
              }}
              value={companyName}
              window={window}
            />

            <CustomImageSelector
              AttachText={Strings.ATTACH_IMAGES_OR_PROOF}
              label={Strings.COMPANY_LOGO}
              imagePress={() => {
                setModal(true);
              }}
              imagePath={userImage == '' ? userImage : userImage}
              marginBottom={window.height * 0.02}
              window={window}
            />

            <CustomText
              marginBottom={window.height * 0.02}
              fontSize={fontResize(16)}
              textColor={Colors.Black}
              fontFamily={'Gilroy-SemiBold'}
            >
              {Strings.JOB_TYPE}
            </CustomText>
            <SelectDropdown
              defaultValueByIndex={0}
              buttonStyle={{
                width: '100%',
                height: window?.height * 0.08,
                backgroundColor: '#FFF',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.Silver,
                marginBottom: window.height * 0.02,
              }}
              buttonTextStyle={{
                textAlign: 'left',
                color: Colors.Black,
                fontSize: fontResize(16),
                fontFamily: 'Gilroy-SemiBold',
              }}
              data={jobPostTypeList}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem);
                setSelectedPostType(selectedItem);
                // setSelectedCategory(index);
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Image
                    resizeMode={'center'}
                    width={window.height * 0.02}
                    height={window.height * 0.02}
                    source={DownArrow}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              rowTextStyle={{
                textAlign: 'left',
                color: Colors.Black,
                fontSize: fontResize(16),
                fontFamily: 'Gilroy-SemiBold',
              }}
            />

            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.ADDRESS}
              onChangeText={(text) => {
                setAddress(text);
              }}
              value={address}
              window={window}
            />

            <CustomText
              marginBottom={window.height * 0.02}
              fontSize={fontResize(16)}
              textColor={Colors.Black}
              fontFamily={'Gilroy-SemiBold'}
            >
              {Strings.SALARY_RANGE}
            </CustomText>
            <View justifyContent={'space-between'} flexDirection={'row'}>
              <SelectDropdown
                defaultValueByIndex={0}
                buttonStyle={{
                  width: '54%',
                  height: window?.height * 0.08,
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.Silver,
                  marginBottom: window.height * 0.02,
                }}
                buttonTextStyle={{
                  textAlign: 'left',
                  color: Colors.Black,
                  fontSize: fontResize(16),
                  fontFamily: 'Gilroy-SemiBold',
                }}
                data={jobSalaryRangeList}
                onSelect={(selectedItem, index) => {
                  setSelectedSalaryRange(selectedItem);
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Image
                      resizeMode={'center'}
                      width={window.height * 0.02}
                      height={window.height * 0.02}
                      source={DownArrow}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                rowTextStyle={{
                  textAlign: 'left',
                  color: Colors.Black,
                  fontSize: fontResize(16),
                  fontFamily: 'Gilroy-SemiBold',
                }}
              />
              <SelectDropdown
                defaultValueByIndex={0}
                buttonStyle={{
                  width: '43%',
                  height: window?.height * 0.08,
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.Silver,
                  marginBottom: window.height * 0.02,
                }}
                buttonTextStyle={{
                  textAlign: 'left',
                  color: Colors.Black,
                  fontSize: fontResize(16),
                  fontFamily: 'Gilroy-SemiBold',
                }}
                data={jobSalaryPeriodList}
                onSelect={(selectedItem, index) => {
                  setSelectedSalaryPeriod(selectedItem);
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Image
                      resizeMode={'center'}
                      width={window.height * 0.02}
                      height={window.height * 0.02}
                      source={DownArrow}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                rowTextStyle={{
                  textAlign: 'left',
                  color: Colors.Black,
                  fontSize: fontResize(16),
                  fontFamily: 'Gilroy-SemiBold',
                }}
              />
            </View>
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.JOB_DESCRIPTION}
              isDetails={true}
              onChangeText={(text) => {
                setJobDescription(text);
              }}
              window={window}
              value={jobDescription}
            />
            <CustomInputText
              label={Strings.QUALIFICATIONS}
              isDetails={true}
              onChangeText={(text) => {
                setQualifications(text);
              }}
              window={window}
              value={qualifications}
            />

            <CustomButton
              onPress={() => {
                goToSummary();
              }}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.1}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.CONTINUE}
            />
          </ScrollView>
        </CustomView>
      </KeyboardAvoidingView>
      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => selectImage(text)}
      />
    </SafeAreaView>
  );
};

export default CreateJobPost;
