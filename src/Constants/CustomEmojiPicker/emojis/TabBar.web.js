import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const TabBar = ({ navigationState, position, setIndex, route, index }) => {
  const inputRange = navigationState.routes.map((x, i) => i);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={index}
        style={styles.tab}
        onPress={() => setIndex(index)}
      >
        <Animated.Text style={{ fontSize: 18 }}>{route.title}</Animated.Text>
      </TouchableOpacity>
      {/* {navigationState.routes.map((route, index) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex =>
            inputIndex === index ? 1 : 0.5,
          ),
        });
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => setIndex(index)}>
            <Animated.Text style={{opacity, fontSize: 18}}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});

export default TabBar;
