import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native-web';
import React, { useState } from 'react';
import { mxHeight, mxWidth } from '../../Util';
import {
  activityGalleryIcon,
  cameraIcon,
  crossIcon,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { useDropzone } from 'react-dropzone';
import EndPoint from '../../Redux/constants/EndPoint';

const FeedPostWeb = ({
  onPressGallery,
  onTextChange,
  onCreatePost,
  selectedImage,
  commentTextInputValue,
  removeImage,
  cameraPress,
}) => {
  const [files, setFiles] = useState([]);
  const { width } = useWindowDimensions();
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: (acceptedFiles) => {
      onPressGallery(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#D8D8D8',
      }}
    >
      {/* Text Input */}
      <View style={{ height: mxHeight * 0.14, padding: 12 }}>
        <TextInput
          style={{
            ...theme.fontRegular,
            fontSize: 15,
            height: '100%',
            color: Colors.Black,
            outlineColor: Colors.White,
          }}
          value={commentTextInputValue}
          multiline={true}
          placeholder="What's on your mind?"
          onChangeText={(text) => {
            onTextChange(text);
          }}
        />
      </View>
      {selectedImage && (
        <View>
          <TouchableOpacity
            onPress={() => {
              removeImage();
            }}
          >
            <Image
              style={{
                height: 10,
                width: 10,
                marginLeft: 60,
                tintColor: 'black',
              }}
              source={crossIcon}
            />
          </TouchableOpacity>
          <Image
            resizeMode="cover"
            style={{
              height: 50,
              width: 50,
              marginLeft: 22,
            }}
            source={{ uri: `${EndPoint.baseAssestURL}${selectedImage}` }}
          />
        </View>
      )}
      {/* Bottom buttons camera, gallery and create post */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}
        >
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <View style={{ padding: 6 }}>
              <Image
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
                source={activityGalleryIcon}
              />
            </View>
          </div>
          <TouchableOpacity onPress={cameraPress} style={{ padding: 6 }}>
            <Image
              resizeMode="contain"
              style={{ height: 22, width: 22 }}
              source={cameraIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onCreatePost}
          style={{
            backgroundColor: Colors.Blueberry,
            // flex: 1,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 12,
            width: '28%',
            borderBottomRightRadius: 12,
          }}
        >
          <Text
            style={{ color: Colors.White, ...theme.fontSemiBold, fontSize: 16 }}
          >
            Create Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FeedPostWeb;
