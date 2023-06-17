import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import {
  CAMERA_VIDEO_ICON,
  activityGalleryIcon,
  cameraIcon,
} from '../../Resources/assets';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';

const FeedPost = ({
  onPressGallery,
  onPressCamera,
  onCreatePost,
  onTextChange,
  selectedImage,
  commentTextInputValue,
  postLoading,
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#D8D8D8',
        // overflow: 'hidden',
      }}
    >
      {/* Text Input */}
      <View style={{ height: mxHeight * 0.14, padding: 12 }}>
        <TextInput
          style={{ ...theme.fontRegular, fontSize: 15, color: Colors.Black }}
          multiline={true}
          value={commentTextInputValue}
          placeholder="What's on your mind?"
          onChangeText={(text) => onTextChange(text)}
        />
      </View>

      {selectedImage && (
        <Image
          resizeMode="contain"
          style={{ height: 44, width: 44, marginLeft: 22 }}
          source={{ uri: selectedImage }}
        />
      )}
      {/* Bottom buttons camera, gallery and create post */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity onPress={onPressGallery} style={{ padding: 6 }}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23 }}
              source={activityGalleryIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCamera} style={{ padding: 6 }}>
            <Image
              resizeMode="contain"
              style={{ height: 23, width: 23 }}
              source={CAMERA_VIDEO_ICON}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onCreatePost}
          disabled={postLoading}
          style={{
            backgroundColor: Colors.Blueberry,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 12,
            borderBottomRightRadius: 12,
            width: mxWidth * 0.45,
          }}
        >
          {postLoading ? (
            <ActivityIndicator size="large" color={Colors.White} />
          ) : (
            <Text
              style={{
                color: Colors.White,
                ...theme.fontSemiBold,
                fontSize: 15,
              }}
            >
              Create Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FeedPost;
