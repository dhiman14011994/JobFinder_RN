import React, { useState, memo, useRef } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Animated,
  Dimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Colors from '../../../Resources/Colors';

import categories from '../data/categories';

import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';

const EmojiPicker = ({ selectedEmoji, isOpen }) => {
  const viewAnim = useRef(new Animated.Value(0));
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(
    categories.tabs.map((tab) => ({ key: tab.category, title: tab.tabLabel }))
  );

  const screenHeight = Dimensions.get('window').height;

  // const backdrop = {
  //   transform: [
  //     {
  //       translateY: viewAnim?.interpolate({
  //         inputRange: [0, 0.01],
  //         outputRange: [screenHeight, 0],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   ],
  //   opacity: viewAnim.interpolate({
  //     inputRange: [0.01, 0.5],
  //     outputRange: [0, 1],
  //     extrapolate: 'clamp',
  //   }),
  // };

  // const slideUp = {
  //   transform: [
  //     {
  //       translateY: viewAnim.interpolate({
  //         inputRange: [0.01, 1],
  //         outputRange: [0, -1 * screenHeight],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   ],
  // };

  const renderScene = ({ route }) => (
    <EmojiCategory category={route.key} selectedEmoji={selectedEmoji} />
  );

  return (
    <View
      style={[
        { width: '100%' },
        isOpen ? { maxHeight: screenHeight * 0.2 } : { height: 0 },
      ]}
    >
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
          },
        ]}
      >
        {routes.map((item, i) => (
          <TabBar
            navigationState={{ routes: routes }}
            position={index}
            setIndex={() => setIndex(i)}
            route={item}
            index={i}
          />
        ))}
      </Animated.View>
      <View
        style={{
          height: screenHeight * 0.001,
          backgroundColor: Colors.DimGray,
          width: '100%',
        }}
      />
      <EmojiCategory
        category={routes[index].key}
        selectedEmoji={selectedEmoji}
      />
    </View>
  );
};

// export default memo(EmojiPicker);
export default EmojiPicker;
