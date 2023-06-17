/* eslint-disable react-native/no-inline-styles */
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostItem from '../../Component/JobPostItem';
import { onJobSearch } from '../../Redux/actions/jobAndEventAction';
import Strings from '../../Resources/Strings';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { mxWidth, mxHeight } from '../../Util';
import { ScrollView } from 'react-native-web';

const JobWeb = ({ jobs, searchedJobs, onjobPress, jobDeleted, userData }) => {
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const jobsData =
    searchedJobs?.length > 0
      ? searchedJobs
      : jobs?.Featured_Jobs
      ? jobs?.Featured_Jobs
      : [];
  const RecommendedData =
    searchedJobs?.length > 0
      ? searchedJobs
      : jobs?.Recommended_Jobs
      ? jobs?.Recommended_Jobs
      : [];

  const renderItem = ({ item }) => {
    return (
      <JobPostItem
        type={type}
        item={item}
        jobDeleted={(value) => {
          jobDeleted(true);
        }}
        toDetails={(id) => {
          if (type == Strings.PROFESSIONAL) {
            onjobPress({ id: id, data: item });
          }
        }}
      />
    );
  };
  return (
    <View style={{ marginBottom: mxHeight * 0.05 }}>
      {searchedJobs && searchedJobs?.length == 0 && (
        <Text
          style={{
            ...theme.fontMedium,
            marginLeft: '3%',
            marginTop: '5%',
            color: '#777E90',
            fontSize: fontResize(mxHeight * 0.021),
          }}
        >
          {jobsData.length == 0 ? '' : Strings.FEATURED_JOB}
        </Text>
      )}
      {type !== Strings.PROFESSIONAL ? (
        <ScrollView bounces={false} style={{ paddingHorizontal: 16 }}>
          {jobsData.map((item) => renderItem({ item }))}
        </ScrollView>
      ) : (
        <ScrollView
          bounces={false}
          style={{ paddingHorizontal: 16 }}
          horizontal
        >
          {jobsData.map((item) => renderItem({ item }))}
        </ScrollView>
      )}
      {type == Strings.PROFESSIONAL && (
        <>
          {searchedJobs && searchedJobs?.length == 0 && (
            <>
              <Text
                style={{
                  ...theme.fontMedium,
                  marginLeft: '3%',
                  marginTop: '10%',
                  color: '#777E90',
                  fontSize: fontResize(mxHeight * 0.021),
                }}
              >
                {RecommendedData.length == 0 ? '' : Strings.RECOMMENDED}
              </Text>
              <ScrollView
                bounces={false}
                style={{ paddingHorizontal: 16 }}
                horizontal
              >
                {RecommendedData.map((item) => renderItem({ item }))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default JobWeb;
