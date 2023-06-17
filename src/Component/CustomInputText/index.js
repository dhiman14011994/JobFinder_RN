/* eslint-disable react-native/no-inline-styles */
import { TextInput, View } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { isNative } from '../../Util';
import {
  ButtonContainer,
  Container,
  ErrorText,
  Image,
  InputContainer,
  Text,
} from '../CustomComponent';

const CustomInputText = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  textAlign,
  maxLength = 10000,
  keyboardType,
  editable,
  inputStyle,
  isError,
  errorMessage,
  errorTextStyle,
  inputContainer,
  label,
  labelStyle,
  inputOuterView,
  marginTop,
  marginBottom,
  isRightButton,
  isDetails,
  rightButtonPress,
  rightButtonImage,
  disabled,
  width,
  marginLeft,
  marginRight,
  window,
  isEdit,
  editPress,
  ref,
  autoCapitalize,
  isUpdate,
  fontSize,
  paddingVertical,
}) => {
  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
      isNative={isNative}
      style={[inputContainer]}
    >
      {isEdit ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={[{ color: Colors.Black }, labelStyle]}>{label}</Text>
          <Text onPress={editPress} style={[{ color: Colors.Blueberry }]}>
            {'Edit'}
          </Text>
        </View>
      ) : (
        <Text style={[{ color: Colors.Black }, labelStyle]}>{label}</Text>
      )}
      <InputContainer
        window={window}
        height={
          window
            ? isDetails
              ? isNative
                ? window?.height * 0.3
                : isUpdate
                  ? window?.height * 0.3
                  : window?.height * 0.25
              : window?.height * 0.08
            : window?.height * 0.3
        }
        alignItems={isDetails ? 'flex-start' : 'center'}
        borderColor={isError ? 'red' : '#c4c4c4'}
        style={[inputOuterView]}
      >
        <TextInput
          ref={ref}
          style={[
            {
              paddingVertical: paddingVertical ? paddingVertical : 0,
              flex: 1,
              width: isRightButton ? '73%' : '88%',
              height: isNative ? '100%' : '90%',
              fontSize: fontSize ? fontSize : 18,
              marginHorizontal: '5%',
              marginTop: isDetails ? 10 : 0,
              paddingHorizontal: '1%',
              textAlignVertical: isDetails ? 'top' : 'center',
              color: Colors.Black,
              letterSpacing: 0.9,
            },
            inputStyle,
            isNative
              ? {}
              : {
                outlineColor: 'white',
              },
          ]}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
          multiline={isDetails}
          value={value}
          onChangeText={(text) => onChangeText(text)}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : Colors.Gray
          }
          secureTextEntry={secureTextEntry}
          textAlign={textAlign}
          maxLength={maxLength}
          keyboardType={keyboardType}
          editable={editable}
        />
        {isRightButton && (
          <ButtonContainer
            width={'10%'}
            height={'100%'}
            marginRight={'5%'}
            justifyContent={'center'}
            alignItems={'flex-end'}
            disabled={disabled}
            onPress={rightButtonPress}
          >
            <Image
              resizeMode={'contain'}
              width={20}
              height={20}
              source={rightButtonImage}
            />
          </ButtonContainer>
        )}
      </InputContainer>
      {isError && (
        <ErrorText style={[errorTextStyle]}>{errorMessage}</ErrorText>
      )}
    </Container>
  );
};

export default CustomInputText;
