import { View, TouchableOpacity } from 'react-native'
import React from 'react'

import {
    BackButton,
    HeaderContainer,
  } from '../Authentication/VerificationStyle';
import { mxHeight, mxWidth } from '../../Util';
import { calendarLeftArrowIcon } from '../../Resources/assets';
import JobDetail from '../JobDetail';

const ApplyJobView = ({setApplyJob, applyJobData}) => {
  return (
    <View>
    <HeaderContainer marginTop={0}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setApplyJob(false);
          }}
          style={{
            height: mxWidth * 0.03,
            width: mxWidth * 0.03,
            backgroundColor: '#D9DDE8',
            marginLeft: mxWidth * 0.01,
            borderRadius: mxWidth * 0.02,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: mxWidth * 0.01,
          }}
        >
          <BackButton
            resizeMode="contain"
            source={calendarLeftArrowIcon}
          />
        </TouchableOpacity>
      </View>
    </HeaderContainer>
    <JobDetail
      jobDetail={applyJobData}
      backApplyJob={() => {
        setApplyJob(false);
      }}
    />

  </View>
  )
}

export default ApplyJobView