import { View, Text } from 'react-native';
import React from 'react';
import { Image } from '../CustomComponent';
import { style } from './style';
import moment from 'moment';
import Strings from '../../Resources/Strings';
const WorkExperienceComponent = ({
  data,
  image,
  title,
  Experience,
  date,
  titleStyle,
  detailsStyle,
  dateStyle,
  role,
  jobType,
  roleStyle,
  isVacancies,
  startDate,
  endDate,
  isCertificates,
}) => {
  let startdate = moment(startDate, 'YYYY-MM-DD');
  let enddate = moment(endDate, 'YYYY-MM-DD');

  return (
    <View style={style.addressVw}>
      <Image
        resizeMode={'contain'}
        height={'32px'}
        width={'32px'}
        source={image}
      />
      <View style={{ width: '80%' }}>
        <Text style={[style.titleTx, titleStyle]}>{title}</Text>
        {isVacancies ? (
          <Text style={[style.detailsTx, detailsStyle]}>{jobType}</Text>
        ) : (
          <Text style={[style.detailsTx, detailsStyle]}>
            <Text style={[style.roleTx, roleStyle]}>{`${role} `}</Text>
            {data?.is_currently_working ? '' : `| ${Experience}`}
          </Text>
        )}
        {!isCertificates && (
          <Text style={[style.dateTx, dateStyle]}>{`${startdate.format(
            'MMM, YYYY'
          )} to ${
            data?.is_currently_working ? 'Present' : enddate.format('MMM, YYYY')
          }`}</Text>
        )}
        {data?.your_experience ? (
          <Text style={style.yourExperience}>{`${data.your_experience}`}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default WorkExperienceComponent;
