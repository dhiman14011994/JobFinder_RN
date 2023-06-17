import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native-web';
import { uploadImage, createStory } from '../../Redux/actions/homeAction';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Wrapper } from '../Home/style';
import { backIcon } from '../../Resources/assets';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import CustomImageSelector from '../../Component/CustomImageSelector';
import Strings from '../../Resources/Strings';
import ColorPickerTextInput from '../../Component/ColorPickerTextInput';
import CustomInputText from '../../Component/CustomInputText';
import { searchGrayIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import CustomButton from '../../Component/CustomButton';
import Emitter from '../../Util/eventEmitter';
import { useDropzone } from 'react-dropzone';
import Type from '../../Constants/Type/type';
const CreateStoryWeb = ({ navigation }) => {
  const window = useWindowDimensions();
  const [userImage, setuserImage] = useState(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const [selectedColor, setSelectedColor] = useState('#0000');
  const [stories, setStories] = useState([
    {
      file: null,
      backgroundColor: '#000',
      colorName: 'black',
      title: '',
      description: '',
    },
  ]);

  const AddNewStory = () => {
    setStories([
      {
        file: null,
        backgroundColor: '#000',
        colorName: 'black',
        title: '',
        description: '',
      },
      ...stories,
    ]);
  };
  const postStory = (imagePath) => {
    let params = [
      {
        image: imagePath,
        bgcolor: selectedColor,
        title: title,
        description: description,
        keywords: keywords,
      },
    ];

    dispatch(
      createStory({
        params,
        onSuccess: (result) => {
          // dispatch(setLoading(false));
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          navigation.goBack();
        },
        onError: (error) => {
          // dispatch(setLoading(false));
        },
      })
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setuserImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const uplodImage = () => {
    if (userImage.length > 0) {
      let data = { imagePath: userImage[0], type: 'web' };

      dispatch(
        uploadImage({
          data,
          onSuccess: (result) => {
            if (result.data) {
              postStory(result.data);
            }
            // dispatch(setLoading(false));
          },
          onError: (error) => {
            // dispatch(setLoading(false));
          },
        })
      );
    }
  };

  return (
    <Wrapper>
      <View style={{ paddingVertical: 5, paddingHorizontal: 16, flex: 1 }}>
        <Text style={{ fontSize: 35, ...theme.fontBold, color: Colors.Black }}>
          {Strings.CREATE_STORY}
        </Text>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 22,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: Colors.Black,
                ...theme.fontSemiBold,
              }}
            >
              Story Info
            </Text>
            <View
              style={{
                marginLeft: 12,
                height: 1,
                width: mxWidth * 0.6,
                backgroundColor: '#D8D8D8',
              }}
            />
          </View>
          {stories.map((item, index) => {
            return (
              <View
                style={{
                  borderBottomColor: Colors.DimGray,
                  borderBottomWidth: index === stories.length - 1 ? 0 : 1,
                }}
              >
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />

                  <CustomImageSelector
                    AttachText={Strings.ATTACH_YOUR_PHOTO}
                    label={Strings.ADD_IMAGE_OPTIONAL}
                    borderColor={'#C2C5CE'}
                    isFromCreateStroy={
                      userImage && userImage.length > 0 ? true : false
                    }
                    imagePath={
                      userImage && userImage.length > 0
                        ? userImage[0].preview
                        : null
                    }
                    width={'25%'}
                    height={'25%'}
                    imagePress={() => {}}
                    window={window}
                  />
                </div>
                <View style={{ paddingVertical: 22 }}>
                  <ColorPickerTextInput
                    onSelectedColor={(color) => setSelectedColor(color.color)}
                  />
                </View>
                <View style={{ paddingVertical: 22 }}>
                  <CustomInputText
                    label={Strings.TITLE}
                    labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
                    inputOuterView={{
                      borderColor: '#C2C5CE',
                      borderWidth: 1,
                    }}
                    width={'100%'}
                    window={window}
                    onChangeText={(text) => setTitle(text)}
                    placeholder={''}
                  />
                </View>
                <View style={{ paddingVertical: 22 }}>
                  <CustomInputText
                    label={Strings.DESCRIPTION}
                    labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
                    isDetails={true}
                    width={'100%'}
                    inputOuterView={{
                      borderColor: '#C2C5CE',
                      borderWidth: 1,
                      paddingVertical: 8,
                    }}
                    window={window}
                    onChangeText={(text) => setDescription(text)}
                    placeholder={''}
                  />
                </View>
              </View>
            );
          })}
          <View style={{ paddingVertical: 22 }}>
            <CustomInputText
              label={Strings.ADD_KEYWORDS}
              labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
              inputOuterView={{
                borderColor: '#C2C5CE',
                borderWidth: 1,
                paddingVertical: 8,
              }}
              width={'100%'}
              isRightButton
              window={window}
              rightButtonImage={searchGrayIcon}
              disabled
              onChangeText={(text) => setKeywords(text)}
              placeholder={''}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CustomButton
              width={'35%'}
              height={'50px'}
              backgroundColor={Colors.White}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.Blueberry}
              borderColor={Colors.Blueberry}
              borderWidth={'1px'}
              onPress={() => {}}
              text={Strings.ADD_NEW}
            />
          </View>

          <View style={{ paddingVertical: 22 }}>
            <CustomButton
              width={'100%'}
              height={'55px'}
              backgroundColor={Colors.Blueberry}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              onPress={uplodImage}
              text={Strings.CREATE_STORY}
            />
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default CreateStoryWeb;
