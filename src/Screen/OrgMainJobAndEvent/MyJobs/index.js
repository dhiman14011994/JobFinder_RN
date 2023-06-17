import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostItem from '../../../Component/JobPostItem';
import { theme } from '../../../Util/constant';
import Strings from '../../../Resources/Strings';

import { RouteName } from '../../../Navigation/routeName';
import CustomButton from '../../../Component/CustomButton';
import Colors from '../../../Resources/Colors';
import {
  fetchMyJobs,
  hideMyJob,
} from '../../../Redux/actions/jobAndEventAction';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import Emitter from '../../../Util/eventEmitter';
import { setLoading } from '../../../Redux/actions/authAction';

const MyJobs = ({ navigation }) => {
  const myjobs = useSelector((state) => state.jobAndEvent.myJobs);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMyJobsAPI();
    Emitter.on('JobCreated', () => {
      fetchMyJobsAPI();
    });
    return () => {
      Emitter.off('JobCreated');
    };
  }, []);

  const fetchMyJobsAPI = () => {
    dispatch(
      fetchMyJobs({
        onSuccess: (result) => {
          dispatch(setLoading(false));
          setRefreshing(false);
        },
        onError: (error) => {
          dispatch(setLoading(false));
          setRefreshing(false);
        },
      })
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMyJobsAPI();
  }, [refreshing]);

  const disableMyJobAPI = (id, hide) => {
    let params = {
      job_id: id,
      is_hide: hide,
    };
    dispatch(
      hideMyJob({
        params,
        onSuccess: (result) => {
          setRefreshing(false);
          dispatch(setLoading(false));
          fetchMyJobsAPI();
          dispatch(setLoading(false));
        },
        onError: (error) => {
          setRefreshing(false);
          dispatch(setLoading(false));
        },
      })
    );
  };

  const window = useWindowDimensions();

  const renderItem = ({ item }) => {
    return (
      <JobPostItem
        item={item}
        isMyJob
        onSwitchChangeValue={(id, hide) => disableMyJobAPI(id, hide)}
        toDetails={() => {}}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <View style={{ paddingHorizontal: 16 }}>
        <CustomButton
          onPress={() => navigation.navigate(RouteName.CREATE_JOB_POST)}
          width={'100%'}
          height={'50px'}
          backgroundColor={Colors.Blueberry}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.03}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'18px'}
          textColor={Colors.White}
          text={Strings.CREATE_JOB_POST}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <CustomText
            fontSize={fontResize(18)}
            {...theme.fontSemiBold}
            style={{ color: Colors.Black }}
          >
            {myjobs && myjobs.length > 0 ? 'Job Created' : ''}
          </CustomText>
        }
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText
              fontSize={fontResize(16)}
              {...theme.fontMedium}
              style={{ color: Colors.Black }}
            >
              {'No Job Found'}
            </CustomText>
          </View>
        }
        style={{ paddingHorizontal: 16, flex: 1 }}
        data={myjobs && myjobs}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={Colors.Blueberry}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default MyJobs;
