import React, { useEffect } from 'react';
import { Image, AppState } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Chat from '../Screen/Chat';
import CreateStory from '../Screen/CreateStory';
import Home from '../Screen/Home';
import ApplyJob from '../Screen/ApplyJob';
import Profile from '../Screen/Profile';
import { RouteName } from './routeName';
import ViewStories from '../Screen/ViewStories';
import {
  ActiveHomeIcon,
  HomeIcon,
  CalenderIcon,
  ActiveCalenderIcon,
  JobIcon,
  ActiveJobIcon,
  ProfileIcon,
  ActiveProfileIcon,
  CommentIcon,
  ActiveCommentIcon,
} from '../Resources/assets/tabAssets';
import Calender from '../Screen/Calender';
import EditProfile from '../Screen/Profile/EditProfile';
import JobEventMain from '../Screen/Job';
import JobDetail from '../Screen/JobDetail';
import EventDetail from '../Screen/EventDetail';
import { useDispatch, useSelector } from 'react-redux';
import OrgMainJobAndEvent from '../Screen/OrgMainJobAndEvent';
import ManageCalendar from '../Screen/ManageCalender';
import Strings from '../Resources/Strings';
import RecruiterProfileTab from '../Screen/Profile/RecruiterProfileTab';
import { style } from './style';
import Settings from '../Screen/Settings';
import Payment from '../Screen/Payment';
import Notification from '../Screen/Notification';
import Faq from '../Screen/Faq';
import PrivacyPolicy from '../Screen/PrivacyPolicy';
import { SubScriptions } from '../Resources/assets';
import PrivacySettings from '../Screen/PrivacySettings';
import Subscriptions from '../Screen/Subscriptions';
import Support from '../Screen/Support';
import SupportDetail from '../Screen/Support/SupportDetail';
import CreateNewTicket from '../Screen/Support/CreateNewTicket';
import TermsCondition from '../Screen/TermsCondition';
import OtherProfile from '../Screen/OtherProfile';
import AddNewCard from '../Screen/AddNewCard';
import Search from '../Screen/Search';
import ChatDetail from '../Screen/ChatDetail';
import { updateUserStatus } from '../Constants/FireStoremanager/FireStoremanager';
import Emitter from '../Util/eventEmitter';
import InterviewDateTime from '../Screen/ChatDetail/InterviewDateTime';
import messaging from '@react-native-firebase/messaging';

import { setIsNotification, setLoading } from '../Redux/actions/authAction';
import { fcmService } from '../Constants/FCMService';
import PostDetails from '../Screen/PostDetails';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AppTutorial from '../Screen/AppTutorial';
import DontSeePost from '../Screen/More/DontSeePost';
import ReportPost from '../Screen/More/ReportPost';
import BlockUser from '../Screen/BlockUser';
import Suggestion from '../Screen/Suggestion';
import Followers from '../Screen/Followres';
import Connection from '../Screen/Connection';

const Tab = createBottomTabNavigator();
const HomeOnStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const JobAndEventStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator();
const ProfileSettingStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

// const getTabBarVisibility = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route);

//   if (
//     routeName === RouteName.CHAT_DETAIL ||
//     routeName === RouteName.INTERVIEW_DATETIME
//   ) {
//     return { display: 'none', height: 0 };
//   }
//   return;
// };

const StackHome = () => {
  return (
    <HomeOnStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeOnStack.Screen name={RouteName.HOME} component={Home} />
      <HomeOnStack.Screen
        name={RouteName.DONT_SEE_POST}
        component={DontSeePost}
      />
      <HomeOnStack.Screen name={RouteName.REPORT_POST} component={ReportPost} />
      <HomeOnStack.Screen
        name={RouteName.POST_DETAILS}
        component={PostDetails}
      />
      <HomeOnStack.Screen
        name={RouteName.CREATE_STORY}
        component={CreateStory}
      />
      <HomeOnStack.Screen name={RouteName.SEARCH} component={Search} />
      <HomeOnStack.Screen
        name={RouteName.VIEW_STORIES}
        component={ViewStories}
      />
      <HomeOnStack.Screen
        name={RouteName.NOTIFICATION}
        component={Notification}
      />
      <HomeOnStack.Screen
        name={RouteName.OTHER_PROFILE}
        component={OtherProfile}
      />
      <HomeOnStack.Screen
        name={RouteName.SUBSCRIPTIONS}
        component={Subscriptions}
      />
      <HomeOnStack.Screen name={RouteName.PAYMENT} component={Payment} />
      <HomeOnStack.Screen
        name={RouteName.ADD_NEW_CARD}
        component={AddNewCard}
      />
      <HomeOnStack.Screen name={RouteName.SUGGESTION} component={Suggestion} />
    </HomeOnStack.Navigator>
  );
};

const JobAndEventStackNavigator = () => {
  const role = useSelector((state) => state?.auth?.userData?.data?.role);
  return (
    <JobAndEventStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {role === 'Organization' || role === 'Recruiter' ? (
        <>
          <JobAndEventStack.Screen
            name={'OrgMainJobAndEvent'}
            component={OrgMainJobAndEvent}
          />
          <JobAndEventStack.Screen
            name={RouteName.JOB_NOTIFICATION}
            component={Notification}
          />
        </>
      ) : (
        <>
          <JobAndEventStack.Screen name={'Job'} component={JobEventMain} />
          <JobAndEventStack.Screen
            name={RouteName.EVENT_DETAIL}
            component={EventDetail}
          />
          <JobAndEventStack.Screen
            name={RouteName.JOB_DETAIL}
            component={JobDetail}
          />
          <JobAndEventStack.Screen
            name={RouteName.APPLY_JOB}
            component={ApplyJob}
          />
          <JobAndEventStack.Screen
            name={RouteName.JOB_NOTIFICATION}
            component={Notification}
          />
          <JobAndEventStack.Screen
            name={RouteName.SUBSCRIPTIONS}
            component={Subscriptions}
          />
          <JobAndEventStack.Screen
            name={RouteName.PAYMENT}
            component={Payment}
          />
          <JobAndEventStack.Screen
            name={RouteName.ADD_NEW_CARD}
            component={AddNewCard}
          />
        </>
      )}
    </JobAndEventStack.Navigator>
  );
};

const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CalendarStack.Screen name={'Calendar'} component={Calender} />
      <CalendarStack.Screen
        name={RouteName.MANAGE_CALENDAR}
        component={ManageCalendar}
      />
      <CalendarStack.Screen
        name={RouteName.NOTIFICATION}
        component={Notification}
      />
      <CalendarStack.Screen
        name={RouteName.SUBSCRIPTIONS}
        component={Subscriptions}
      />
      <CalendarStack.Screen name={RouteName.PAYMENT} component={Payment} />
      <CalendarStack.Screen
        name={RouteName.ADD_NEW_CARD}
        component={AddNewCard}
      />
    </CalendarStack.Navigator>
  );
};

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.CHAT}
    >
      <ChatStack.Screen name={RouteName.CHAT} component={Chat} />
      <ChatStack.Screen name={RouteName.CHAT_DETAIL} component={ChatDetail} />
      <ChatStack.Screen
        name={RouteName.INTERVIEW_DATETIME}
        component={InterviewDateTime}
      />
    </ChatStack.Navigator>
  );
};
const StackProfile = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.PROFILE}
    >
      <ProfileStack.Screen name={RouteName.PROFILE} component={Profile} />
      <ProfileStack.Screen
        name={RouteName.EDIT_PROFILE}
        component={EditProfile}
      />
      <ProfileStack.Screen
        name={RouteName.SETTINGS_STACK}
        component={SettingStack}
      />
      <ProfileStack.Screen
        name={RouteName.SUBSCRIPTIONS}
        component={Subscriptions}
      />
      <ProfileStack.Screen name={RouteName.PAYMENT} component={Payment} />
      <ProfileStack.Screen
        name={RouteName.ADD_NEW_CARD}
        component={AddNewCard}
      />
      <ProfileStack.Screen
        name={RouteName.OTHER_PROFILE}
        component={OtherProfile}
      />
      <ProfileStack.Screen name={RouteName.FOLLOWERS} component={Followers} />

      <ProfileStack.Screen
        name={RouteName.CONNECTIONS}
        component={Connection}
      />
    </ProfileStack.Navigator>
  );
};
const SettingStack = () => {
  return (
    <ProfileSettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.SETTINGS}
    >
      <ProfileSettingStack.Screen
        name={RouteName.SETTINGS}
        component={Settings}
      />
      <ProfileSettingStack.Screen
        name={RouteName.PAYMENT}
        component={Payment}
      />
      <ProfileSettingStack.Screen
        name={RouteName.ADD_NEW_CARD}
        component={AddNewCard}
      />
      <ProfileSettingStack.Screen
        name={RouteName.NOTIFICATION}
        component={Notification}
      />
      <ProfileSettingStack.Screen name={RouteName.FAQ} component={Faq} />
      <ProfileSettingStack.Screen
        name={RouteName.PRIVACY_POLICY}
        component={PrivacyPolicy}
      />
      <ProfileSettingStack.Screen
        name={RouteName.SUBSCRIPTIONS}
        component={Subscriptions}
      />
      <ProfileSettingStack.Screen
        name={RouteName.PRIVACY_SETTINGS}
        component={PrivacySettings}
      />
      <ProfileSettingStack.Screen
        name={RouteName.SUPPORT}
        component={Support}
      />
      <ProfileSettingStack.Screen
        name={RouteName.TERMS_CONDITION}
        component={TermsCondition}
      />
      <ProfileSettingStack.Screen
        name={RouteName.SUPPORT_DETAIL}
        component={SupportDetail}
      />
      <ProfileSettingStack.Screen
        name={RouteName.CREATE_NEW_TICKET}
        component={CreateNewTicket}
      />
      <ProfileSettingStack.Screen
        name={RouteName.RECUITER_PROFILE}
        component={RecruiterProfileTab}
      />
      <ProfileSettingStack.Screen
        name={RouteName.EDIT_PROFILE_SETTING}
        component={EditProfile}
      />
      <ProfileSettingStack.Screen
        name={RouteName.BLOCK_USER_DATA}
        component={BlockUser}
      />
      <ProfileSettingStack.Screen
        name={RouteName.APP_TUTORIAL}
        component={AppTutorial}
      />
    </ProfileSettingStack.Navigator>
  );
};

function MobileBottomTabBar() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    messaging().onMessage(async (remoteMessage) => {
      dispatch(setIsNotification(true));
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      dispatch(setIsNotification(true));
    });
    return () => {
      AppState.removeEventListener('change', handleUNChange);
    };
  });

  const onOpenNotification = (notify) => {};

  const onNotification = (notify) => {
    dispatch(setIsNotification(true));
  };
  const onRegister = (token) => {};

  const handleChange = async (newState) => {
    if (newState === 'background' || newState === 'inactive') {
      let updateStatus = await updateUserStatus({
        id: userData?.data?._id || userData?._id,
        status: 'offline',
      });
    } else {
      let updateStatus = await updateUserStatus({
        id: userData?.data?._id || userData?._id,
        status: 'online',
      });
    }
  };
  const handleUNChange = async (newState) => {
    if (newState === 'background' || newState === 'inactive') {
      let updateStatus = await updateUserStatus({
        id: userData?.data?._id || userData?._id,
        status: 'offline',
      });
    } else {
      let updateStatus = await updateUserStatus({
        id: userData?.data?._id || userData?._id,
        status: 'online',
      });
    }
  };

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === RouteName.POST_DETAILS ||
      routeName === RouteName.SEARCH ||
      routeName === RouteName.OTHER_PROFILE
    ) {
      return { display: 'none', height: 0 };
    }
    return;
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={({ route }) => ({
          tabBarStyle: getTabBarVisibility(route),
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                resizeMode="contain"
                style={style.tabBarIcon}
                source={focused ? ActiveHomeIcon : HomeIcon}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Job"
        component={JobAndEventStackNavigator}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              resizeMode="contain"
              style={style.tabBarIcon}
              source={focused ? ActiveJobIcon : JobIcon}
            />
          ),
          //   tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="CalendarNavigator"
        component={CalendarNavigator}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              resizeMode="contain"
              style={style.tabBarIcon}
              source={focused ? ActiveCalenderIcon : CalenderIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatNavigator}
        options={({ route }) => ({
          tabBarShowLabel: true,
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              resizeMode="contain"
              style={style.tabBarIcon}
              source={focused ? ActiveCommentIcon : CommentIcon}
            />
          ),
        })}
        listeners={{
          tabPress: (e) => {
            Emitter.emit('ChatRef');
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={
          selectUser === Strings.PROFESSIONAL ? StackProfile : SettingStack
        }
        options={({ route }) => ({
          tabBarShowLabel: true,
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              resizeMode="contain"
              style={style.tabBarIcon}
              source={focused ? ActiveProfileIcon : ProfileIcon}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default MobileBottomTabBar;
