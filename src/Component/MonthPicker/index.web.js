import React, { useEffect, useState } from 'react';
import Strings from '../../Resources/Strings';
import CustomInputText from '../CustomInputText';
import { Calender } from '../../Resources/assets/ProfileAssets';

const MonthBox = (props) => {
  const handleClick = (e) => {
    props.onClick && props.onClick(e);
  };

  return (
    <CustomInputText
      width={props.window.width * 0.2}
      //   marginTop={'5%'}
      window={props.window}
      label={props.title}
      editable={false}
      isRightButton
      rightButtonImage={Calender}
      rightButtonPress={() => {
        handleClick();
      }}
      value={props.value != '?' ? props.value : ''}
    />
  );
};

export default MonthBox;
