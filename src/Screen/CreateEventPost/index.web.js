import React, { useState, useEffect } from 'react';
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
import { imageUplaod } from '../../Redux/services/profileService';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import toast from 'react-simple-toasts';
import { RouteName } from '../../Navigation/routeName';
import Success from '../../Component/Success/index.web';
import Emitter from '../../Util/eventEmitter';
import moment from 'moment';
import { createEventPost } from '../../Redux/services/jobsService';
import Datetime from 'react-datetime';
import './datatime.css';
import {
  containsOnlyNumbers,
  containsOnlyStrings,
} from '../../Util/validation';
import { TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../Component/Picker/index.web';
import CameraModal from '../HomeWeb/Camera/Modal/index.web';
import Type from '../../Constants/Type/type';

const CreateEventPost = ({ navigation, route }) => {
  const [value, setValue] = useState(new Date());
  const [attendees, setAttendees] = useState('');
  const [address, setAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userImage, setImage] = useState('');
  const [isCreated, setCreated] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);

  const window = useWindowDimensions();

  const userData = useSelector((state) => state.auth.userData);

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const dispatch = useDispatch();

  const isEdited = route?.params?.isEdited;

  const item = route?.params?.item;

  useEffect(() => {
    const utcTime = moment.utc(item?.date).format('ddd MMM DD yyyy HH:mm:ss');

    setValue(new Date(utcTime));
    setAttendees(item?.attendees);
    setAddress(item?.address);
    setJobDescription(item?.job_description);
    setJobTitle(item?.event_title);
    setImage(item?.company_logo ? item?.company_logo : userImage);
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
  };

  const onValidation = () => {
    var isValid = true;

    if (jobTitle.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_JOB_TITLE);
      return isValid;
    }
    if (userImage == '') {
      isValid = false;
      toast(Strings.INVALID_EVENT_IMAGE);
      return isValid;
    }
    if (jobDescription.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_EVENT_DESCRIPTION);
      return isValid;
    }
    if (attendees.trim().length > 0 == false) {
      isValid = false;
      toast(Strings.INVALID_ATTENDEES);
      return isValid;
    }
    if (value.toString().trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_DATE_AND_TIME);
      return isValid;
    }
    if (address.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_COMPANY_ADDRESS);
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
      attendees: attendees.trim(),
      companyLogo: userImage,
      address: address.trim(),
      jobDescription: jobDescription.trim(),
      dateAndTime: value,
    };
    navigation.navigate(RouteName.EVENT_SUMMARY, { data: data });
  };

  const updateEvent = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};
      const localTime = new Date(value);
      const utcTime = moment.utc(localTime).format('YYYY-MM-DD HH:mm:ss Z');

      if (userImage != '') {
        var data = {
          id: item?._id,
          event_title: jobTitle.trim(),
          company_logo: userImage,
          role: selectUser,
          attendees: attendees.trim(),
          address: address.trim(),
          job_description: jobDescription.trim(),
          date: utcTime,
        };
        apiRequestData = { ...data };
      }

      var createJobResponse = await createEventPost(apiRequestData);

      if (createJobResponse.code == 200) {
        dispatch(setLoading(false));
        Emitter.emit('EventCreated');
        setCreated(true);
      } else {
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
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
          textAlign={'left'}
          fontFamily={'Gilroy-bold'}
          fontSize={fontResize(window.width * 0.02)}
        >
          {Strings.CREATE_EVENT_POST}
        </CustomText>

        <CustomText
          fontSize={fontResize(window.width * 0.012)}
          {...theme.fontSemiBold}
        >
          {Strings.EVENT_TITLE}
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
              borderWidth: 1,
              padding: window.width * 0.005,
              borderColor: Colors.gray2,
              marginTop: window.width * 0.01,
              marginBottom: window.width * 0.01,
              fontFamily: 'Gilroy-Regular',
              fontSize: fontResize(window.width * 0.01),
              borderRadius: window.width * 0.006,
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
            textAlign={'left'}
            fontFamily={'Gilroy-bold'}
            fontSize={fontResize(window.width * 0.013)}
          >
            Company Info
          </CustomText>

          <View
            style={{
              marginLeft: window.width * 0.013,
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
            marginTop: window.width * 0.01,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
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
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <CustomText
                    fontSize={fontResize(window.width * 0.01)}
                    {...theme.fontSemiBold}
                  >
                    {Strings.HOW_MANY_ATTENDEES}
                  </CustomText>

                  <TextInput
                    value={attendees}
                    onChangeText={(text) => {
                      if (containsOnlyNumbers(text)) {
                        setAttendees(text);
                      }
                      if (text == '') {
                        setAttendees('');
                      }
                    }}
                    style={[
                      {
                        width: window.width * 0.2,
                        borderWidth: 1,
                        padding: window.width * 0.005,
                        borderColor: Colors.gray2,
                        marginTop: window.width * 0.01,
                        marginBottom: window.width * 0.01,
                        fontFamily: 'Gilroy-Regular',
                        fontSize: fontResize(window.width * 0.01),
                        borderRadius: window.width * 0.006,
                      },
                    ]}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <CustomText
                    fontSize={fontResize(window.width * 0.01)}
                    {...theme.fontSemiBold}
                  >
                    {Strings.ADDRESS + ' (Paste Google map link)'}
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
                        borderWidth: 1,
                        padding: window.width * 0.005,
                        borderColor: Colors.gray2,
                        marginTop: window.width * 0.01,
                        marginBottom: window.width * 0.0055,
                        fontFamily: 'Gilroy-Regular',
                        fontSize: fontResize(window.width * 0.01),
                        borderRadius: window.width * 0.006,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginVertical: window.width * 0.02 }}>
              <CustomText
                fontSize={fontResize(window.width * 0.01)}
                {...theme.fontSemiBold}
              >
                {Strings.EVENT_DESCRIPTION}
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
                style={[
                  {
                    width: '60%',
                    height: window.height * 0.3,
                    textAlignVertical: 'top',
                    borderWidth: 1,
                    padding: window.width * 0.005,
                    borderColor: Colors.gray2,
                    marginTop: window.width * 0.01,
                    marginBottom: window.width * 0.01,
                    fontFamily: 'Gilroy-Regular',
                    fontSize: fontResize(window.width * 0.01),
                    borderRadius: window.width * 0.009,
                  },
                ]}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              // marginRight: '10%',
              width: window.width * 0.25,
            }}
          >
            <CustomText
              fontSize={fontResize(window.width * 0.01)}
              {...theme.fontSemiBold}
            >
              {Strings.DATE_AND_TIME}
            </CustomText>

            <View
              style={{
                // marginTop: window.width * 0.005,
                marginBottom: window.width * 0.01,
              }}
            >
              <Datetime
                input={true}
                closeOnClickOutside={true}
                value={value}
                onChange={setValue}
                closeOnSelect={true}
                closeOnTab={true}
              />
            </View>
          </View>
        </View>

        <CustomButton
          onPress={() => {
            {
              isEdited ? updateEvent() : goToSummary();
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
      />

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

export default CreateEventPost;
