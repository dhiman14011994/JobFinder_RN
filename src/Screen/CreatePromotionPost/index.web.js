import { ScrollView, View, Dimensions, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { imageUplaod } from '../../Redux/services/profileService';
import Strings from '../../Resources/Strings';
import { useDropzone } from 'react-dropzone';
import Colors from '../../Resources/Colors';
import {
  ContainerView,
  CustomText,
  CustomView,
} from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import CustomImageSelector from '../../Component/CustomImageSelector';
import EndPoint from '../../Redux/constants/EndPoint';
import CustomButton from '../../Component/CustomButton';
import Calender from '../../Resources/assets/Calender.png';

import DatePicker from 'sassy-datepicker';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import toast from 'react-simple-toasts';
import { RouteName } from '../../Navigation/routeName';
import moment from 'moment';
import Success from '../../Component/Success/index.web';
import Emitter from '../../Util/eventEmitter';
import { updatePromotion } from '../../Redux/actions/promotionAction';
import { containsOnlyAmount, containsOnlyStrings } from '../../Util/validation';
import { TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../Component/Picker/index.web';
import CameraModal from '../HomeWeb/Camera/Modal/index.web';
import Type from '../../Constants/Type/type';

const CreatePromotionPost = ({ navigation, route }) => {
  const window = Dimensions.get('window');
  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
      ? state.auth.socialLoginData
      : state.auth.userData
  );
  var newDate = new Date();
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [companyImage, setCompanyImage] = useState('');
  const [startdate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('  ');
  const [newStartdate, setNewStartDate] = useState(newDate);
  const [newEndDate, setNewEndDate] = useState(newDate);
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isCreated, setCreated] = useState(false);
  const isEdited = route.params.isEdited;
  const item = route?.params?.item;
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);

  useEffect(() => {
    if (isEdited) {
      setDescription(item?.description);
      setTitle(item?.promotion_title);
      setAmount(item?.amount);
      setCompanyImage(item?.image);
      setStartDate(item?.start_date);
      setEndDate(item?.end_date);
      setNewStartDate(new Date(item?.start_date));
      setNewEndDate(new Date(item?.end_date));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: async (acceptedFiles) => {
      try {
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
        dispatch(setLoading(false));
        setCompanyImage(getImageURI.data[0]);
      } catch (err) {
        dispatch(setLoading(false));
      }
    },
  });

  const uploadImageData = async (data) => {
    dispatch(setLoading(true));
    var getImageURI = await imageUplaod({
      file: data,
      token: userData?.access_token,
    });
    dispatch(setLoading(false));
    setCompanyImage(getImageURI.data[0]);
  };

  const onValidation = () => {
    var isValid = true;
    let amtType = /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/;

    if (title.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_PROMOTION_TITLE);
      return isValid;
    }

    if (amount.trim().length > 1 == false) {
      isValid = false;
      toast(Strings.INVALID_PROMOTION_AMOUNT);
      return isValid;
    }

    if (!amtType.test(amount)) {
      isValid = false;
      toast(Strings.INVALID_AMOUNT);
      return isValid;
    }

    if (description.trim().length > 2 == false) {
      isValid = false;
      toast(Strings.INVALID_PROMOTION_DESCRIPTION);
      return isValid;
    }

    if (companyImage === '') {
      isValid = false;
      toast(Strings.INVALID_IMAGE);
      return isValid;
    }

    return isValid;
  };

  const goToSummary = () => {
    if (!onValidation()) {
      return;
    }
    var data = {
      promotion_title: title.trim(),
      image: companyImage,
      start_date: startdate,
      end_date: endDate,
      amount: amount.trim(),
      description: description.trim(),
    };

    navigation.navigate(RouteName.PROMOTION_SUMMARY, { data: data });
  };

  const updateProfile = async () => {
    if (!onValidation()) {
      return;
    }

    try {
      dispatch(setLoading(true));

      var data = {
        id: item?._id,
        promotion_title: title ? title : item?.promotion_title,
        image: companyImage ? companyImage : item?.image,
        description: description ? description : item?.description,
        start_date: startdate ? startdate : item?.start_date,
        end_date: endDate ? endDate : item?.end_date,
        amount: amount ? amount : item?.amount,
      };

      dispatch(
        updatePromotion({
          data,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            Emitter.emit('PostCreated');
            setCreated(true);
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView bounces={false}>
      <View
        style={{
          paddingVertical: window.height * 0.03,
          paddingHorizontal: window.width * 0.01,
          backgroundColor: Colors.White,
          borderRadius: window.width * 0.01,
        }}
      >
        <CustomView
          width={window.width * 0.8}
          marginLeft={window.width * 0.1}
          marginRight={window.width * 0.1}
          marginTop={window.height * 0.05}
          height={window.height * 0.95}
        >
          <CustomText
            marginBottom={window.height * 0.05}
            textAlign={'left'}
            style={{ width: window.width * 0.8 }}
            fontSize={fontResize(26)}
            fontFamily={'Gilroy-Bold'}
          >
            {Strings.CREATE_PROMO}
          </CustomText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
          >
            <CustomInputText
              marginBottom={window.height * 0.06}
              label={Strings.PROMOTION_TITLE}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setTitle(text);
                }
                if (text == '') {
                  setTitle('');
                }
              }}
              value={title}
              placeholder={''}
              width={window.width * 0.2}
              window={window}
            />

            <ContainerView
              marginBottom={window.height * 0.05}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <CustomText
                style={{ width: window.width * 0.9 }}
                fontSize={fontResize(17)}
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.EerieBlack}
              >
                {Strings.COMPANY_INFO}
              </CustomText>
              <CustomView
                width={'87%'}
                marginLeft={window.width * 0.03}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
              />
            </ContainerView>
            <CustomView
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              width={'100%'}
              height={window.height * 0.305}
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
                  imagePath={
                    companyImage == ''
                      ? companyImage
                      : `${EndPoint.baseAssestURL}${companyImage}`
                  }
                  window={window}
                />
              </TouchableOpacity>
              <CustomView
                height={window.height * 0.4}
                width={window.width * 0.2}
              >
                <CustomInputText
                  width={window.width * 0.2}
                  label={Strings.START_DATE}
                  editable={false}
                  isRightButton
                  rightButtonImage={Calender}
                  rightButtonPress={() => {
                    setOpen(true);
                    setIsStartDate(true);
                  }}
                  window={window}
                  value={startdate == '' ? '' : startdate}
                />

                <CustomInputText
                  marginBottom={window.height * 0.06}
                  label={Strings.AMOUNT}
                  marginTop={window.height * 0.05}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => {
                    if (containsOnlyAmount(text)) {
                      setAmount(text);
                    }
                    if (text == '') {
                      setAmount('');
                    }
                  }}
                  value={amount}
                  placeholder={''}
                  width={window.width * 0.2}
                  window={window}
                />
              </CustomView>
              <CustomInputText
                width={window.width * 0.2}
                label={Strings.END_DATE}
                editable={false}
                isRightButton
                rightButtonImage={Calender}
                rightButtonPress={() => {
                  setOpen(true);
                  setIsStartDate(false);
                }}
                window={window}
                value={endDate == '' ? '' : endDate}
              />
            </CustomView>

            <CustomInputText
              marginTop={window.width * 0.03}
              label={Strings.DESCRIPTION}
              width={window.width * 0.5}
              inputStyle={{ height: '95%' }}
              isDetails={true}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setDescription(text);
                }
                if (text == '') {
                  setDescription('');
                }
              }}
              value={description}
              window={window}
            />

            <CustomButton
              onPress={() => {
                isEdited ? updateProfile() : goToSummary();
              }}
              width={window.width * 0.2}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.15}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              alignSelf={'flex-start'}
              text={Strings.CONTINUE}
            />
          </ScrollView>
        </CustomView>
      </View>
      <Modal
        visible={open}
        style={{ width: window.width, height: window.height }}
        onRequestClose={() => setOpen(false)}
        transparent={true}
        animationType={'fade'}
      >
        <View
          style={{
            width: window.width,
            height: window.height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DatePicker
            value={isStartDate ? startdate : endDate}
            minDate={
              !isStartDate
                ? newStartdate
                  ? newStartdate
                  : new Date()
                : new Date()
            }
            maxDate={new Date('2123-02-25')}
            onChange={(date) => {
              setOpen(false);
              if (isStartDate) {
                setNewStartDate(date);
                setStartDate(moment(date).format('YYYY-MM-DD'));
                if (date > newEndDate) {
                  setNewEndDate(newDate);
                  setEndDate(moment(date).format('YYYY-MM-DD'));
                }
              } else {
                setNewEndDate(date);
                setEndDate(moment(date).format('YYYY-MM-DD'));
              }
            }}
          />
        </View>
      </Modal>

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
              setCompanyImage(value);
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

export default CreatePromotionPost;
