import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';

import Colors from '../../Resources/Colors';
import EventItem from '../../Component/EventItem';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import { useSelector } from 'react-redux';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';
import { fontResize } from '../../Util/font';

const Events = ({ navigation }) => {
  const searchedEvents = useSelector(
    (state) => state.jobAndEvent.searchedEvents
  );
  const events = useSelector((state) => state.jobAndEvent.events);

  const renderItem = ({ item }) => {
    if (!item?.applyEvent) {
      return (
        <EventItem
          item={item}
          toDetails={(id) =>
            navigation.navigate(RouteName.EVENT_DETAIL, { eventId: id })
          }
        />
      );
    }
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.White, paddingHorizontal: 16 }}
    >
      <Text
        style={{
          ...theme.fontSemiBold,
          fontSize: fontResize(19),
          lineHeight: fontResize(22),
          color: Colors.EerieBlack1,
          marginVertical: '5%',
        }}
      >
        {Strings.RECOMMENDED}
      </Text>
      <FlatList
        data={searchedEvents.length > 0 ? searchedEvents : events && events}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Events;
