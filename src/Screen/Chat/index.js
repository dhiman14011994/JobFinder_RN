import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import NotchArea from '../../Component/SafeArea';
import CustomHeader from '../../Component/CustomHeader';
import {
  BLACK_CROSS_ICON,
  CrossIcon,
  backIcon,
  crossIcon,
  headerSearch,
  searchGrayIcon,
} from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import DirectMessages from './DirectMessage';
import Companies from './Companies';
import ChatNotifications from './NotificationsChat';
import { mxWidth } from '../../Util';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from '../../Navigation/routeName';
import ChatDetail from '../ChatDetail';
import CustomSearchBar from '../../Component/CustomSearchBar';
import Emitter from '../../Util/eventEmitter';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import ConversationRow from '../../Component/ConversationRow';

const Tab = createMaterialTopTabNavigator();
const DirectStack = createNativeStackNavigator();

const Chat = ({ navigation }) => {
  const textinputRef = useRef(null);
  const [isSearch, setSearch] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [chatUserList, setChatUserList] = useState([]);

  useEffect(() => {
    getChatUserList();
    Emitter.on('ChatRef', () => {
      getChatUserList();
    });
    return () => {
      Emitter.off('ChatRef');
    };
  }, []);

  const getChatUserList = async () => {
    try {
      firestore()
        .collection('ChatUserList')
        .doc(userData?.data?.user_id || userData?.data?._id)
        .collection('userlist')
        .orderBy('dateTime', 'desc')
        .onSnapshot(
          (documentSnapshot) => {
            const listUserData = [];
            var chatUserData = {};
            documentSnapshot?.docs?.forEach((doc, index) => {
              chatUserData = doc?.data();
              chatUserData.message_id = doc?.id;

              listUserData.push(chatUserData);
            });

            setChatUserList(listUserData);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log('err>>>Company', error);
    }
  };

  const DirectNavigator = () => {
    return (
      <DirectStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <DirectStack.Screen
          name={RouteName.DIRECT_MEASSAGE}
          component={DirectMessages}
        />
      </DirectStack.Navigator>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <ConversationRow data={item} onPressChat={() => onPressChat(item)} />
    );
  };

  const onPressChat = (data) => {
    navigation.navigate(RouteName.CHAT_DETAIL, {
      chatId: data.chatId,
      receiverId: data.id,
      receiverData: data,
      isOther: false,
    });
  };

  const onSearchText = (text) => {
    let result = chatUserList.filter((o) =>
      o.name.toLowerCase().includes(text.toLowerCase())
    );
    if (text.length > 2) {
      setSearchUser(result);
    } else {
      setSearchUser([]);
    }
  };

  return (
    <SafeAreaView
      style={[
        NotchArea.AndroidSafeArea,
        { flex: 1, backgroundColor: Colors.White },
      ]}
    >
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          isSearch ? (
            <TouchableOpacity
              onPress={() => {
                setSearch(false);
                setSearchUser([]);
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 20, width: 20 }}
                source={BLACK_CROSS_ICON}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        rightButtons={
          <TouchableOpacity
            onPress={() => {
              setSearch(!isSearch);
              setSearchUser([]);
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={headerSearch}
            />
          </TouchableOpacity>
        }
        title={Strings.MESSAGE}
      />
      {isSearch ? (
        <View style={{ paddingHorizontal: 16 }}>
          <CustomSearchBar
            refValue={textinputRef}
            isSearchScreen={true}
            onSearchText={(text) => onSearchText(text)}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchUser}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <Tab.Navigator
          initialRouteName="Message"
          swipeEnabled={false}
          tabBarOptions={{
            labelStyle: { textTransform: 'lowercase' },
          }}
          screenOptions={{
            tabBarInactiveTintColor: Colors.DimGray,
            tabBarActiveTintColor: Colors.Blueberry,
            tabBarLabelStyle: {
              fontSize: 16,
              ...theme.fontMedium,
              textTransform: 'none',
              width: mxWidth * 0.33,
            },
            tabBarIndicatorStyle: {
              height: 4,
              backgroundColor: Colors.Blueberry,
            },
            tabBarStyle: { height: 60 },
          }}
        >
          <Tab.Screen
            name="Companies"
            component={Companies}
            options={{ tabBarLabel: 'Companies', inactiveTintColor: 'red' }}
            listeners={{
              tabPress: (e) => {},
            }}
          />
          <Tab.Screen
            name="DirectMessages"
            component={DirectMessages}
            options={{ tabBarLabel: 'Direct Messages' }}
            listeners={{
              tabPress: (e) => {},
            }}
          />

          <Tab.Screen
            name="Notifications"
            component={ChatNotifications}
            options={{ tabBarLabel: 'Notifications' }}
            listeners={{
              tabPress: (e) => {},
            }}
          />
        </Tab.Navigator>
      )}
    </SafeAreaView>
  );
};

export default Chat;
