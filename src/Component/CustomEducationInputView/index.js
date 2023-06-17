import { View, Text } from 'react-native';
import React from 'react';
import CustomInputText from '../CustomInputText';
import Strings from '../../Resources/Strings';

const CustomEducationInputView = ({
  inputRef,
  window,
  updateEducation,
  Type,
  data,
  index,
}) => {
  return (
    <View>
      <CustomInputText
        ref={inputRef}
        marginBottom={window.height * 0.02}
        label={Strings.EDUCATION_TYPE.EDUCATION_NAME}
        editable={true}
        onChangeText={(text) => {
          updateEducation({
            index,
            text,
            key: Type.EDUCATION.EDUCATION_NAME,
          });
        }}
        value={data?.school}
        placeholder={''}
        window={window}
      />

      <CustomInputText
        ref={inputRef}
        marginBottom={window.height * 0.02}
        label={Strings.EDUCATION_TYPE.DEGREE_TITLE}
        editable={true}
        onChangeText={(text) => {
          updateEducation({
            index,
            text,
            key: Type.EDUCATION.DEGREE,
          });
        }}
        value={data?.degree_title}
        placeholder={''}
        window={window}
      />

      <CustomInputText
        ref={inputRef}
        marginBottom={window.height * 0.02}
        label={Strings.EDUCATION_TYPE.FIELD_OF_STUDY}
        editable={true}
        onChangeText={(text) => {
          updateEducation({
            index,
            text,
            key: Type.EDUCATION.FIELD_OF_STUDY,
          });
        }}
        value={data?.study}
        placeholder={''}
        window={window}
      />
    </View>
  );
};

export default CustomEducationInputView;
