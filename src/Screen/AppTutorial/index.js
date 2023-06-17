import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import { style } from './style';
import Strings from '../../Resources/Strings';
import {
  ANDROID_SEARCH_IMAGE,
  CreateEvent,
  CreatePost,
  DeleteAccount,
  EditProfile,
  FreeSubscription,
  GoldSubscription,
  IPHONE_SEARCH_IMAGE,
  IosCreateEvent,
  IosCreatePost,
  IosDeleteAccount,
  IosEditProfile,
  IosFreeSubscription,
  IosGodSubscription,
  IosJobList,
  IosJobPost,
  IosMessages,
  IosScheduledEvents,
  IosSupport,
  IosViewedProfile,
  JobList,
  JobPost,
  Messages,
  ScheduledEvents,
  Support,
  ViewedProfile,
  backIcon,
  logo,
} from '../../Resources/assets';
import CustomHeader from '../../Component/CustomHeader';
import { mxHeight } from '../../Util';
import Colors from '../../Resources/Colors';
import CustomTutorialComponent from '../../Component/Tutorial';

const AppTutorial = ({ navigation }) => {
  const [tutorialData, setTutorialData] = useState([
    {
      title: Strings.TUTORIAL.FREE_SUBSCRIPTION,
      image: Platform.OS === 'android' ? FreeSubscription : IosFreeSubscription,
    },
    {
      title: Strings.TUTORIAL.GOLD_SUBSCRIPTION,
      image: Platform.OS === 'android' ? GoldSubscription : IosGodSubscription,
    },
    {
      title: Strings.TUTORIAL.JOB_POST,
      image: Platform.OS === 'android' ? JobList : IosJobList,
    },
    {
      title: Strings.TUTORIAL.SCHEDULED_EVENTS,
      image: Platform.OS === 'android' ? ScheduledEvents : IosScheduledEvents,
    },
    {
      title: Strings.TUTORIAL.MESSAGES,
      image: Platform.OS === 'android' ? Messages : IosMessages,
    },
    {
      title: Strings.TUTORIAL.SUPPORT,
      image: Platform.OS === 'android' ? Support : IosSupport,
    },
    {
      title: Strings.TUTORIAL.DELETE_ACCOUNT,
      image: Platform.OS === 'android' ? DeleteAccount : IosDeleteAccount,
    },
    {
      title: Strings.TUTORIAL.HOMEPAGE,
      image: Platform.OS === 'android' ? CreatePost : IosCreatePost,
    },
    {
      title: Strings.TUTORIAL.WHO_VIEWD_MY_PROFILE,
      image: Platform.OS === 'android' ? ViewedProfile : IosViewedProfile,
    },
    {
      title: Strings.TUTORIAL.CREATE_JOB_POST,
      image: Platform.OS === 'android' ? JobPost : IosJobPost,
    },
    {
      title: Strings.TUTORIAL.CREATE_EVENT,
      image: Platform.OS === 'android' ? CreateEvent : IosCreateEvent,
    },
    {
      title: Strings.TUTORIAL.EDIT_PROFILE,
      image: Platform.OS === 'android' ? EditProfile : IosEditProfile,
    },
    {
      title: Strings.TUTORIAL.SEARCH_PROFILE,
      image:
        Platform.OS === 'android' ? ANDROID_SEARCH_IMAGE : IPHONE_SEARCH_IMAGE,
    },
  ]);

  const renderTutorial = ({ item, index }) => {
    return (
      <CustomTutorialComponent
        index={index}
        data={item}
        dataLength={tutorialData.length}
      />
    );
  };

  const renderHeaderComponent = () => {
    return (
      <View style={style.imageContainer}>
        <Image
          resizeMode="contain"
          style={{ height: mxHeight * 0.09, width: mxHeight * 0.29 }}
          source={logo}
        />

        <Text style={style.titleStyle}>{Strings.TUTORIAL.WELCOME}</Text>

        <Text style={style.subTitleStyle}>{Strings.APP_TUTORIAL}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26, tintColor: Colors.White }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
      />

      <View style={style.imageContainer}>
        <FlatList
          bounces={false}
          data={tutorialData}
          ListHeaderComponent={renderHeaderComponent}
          renderItem={renderTutorial}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default AppTutorial;
