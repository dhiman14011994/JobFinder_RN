import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import shortnameToUnicode from '../helpers/shortnameToUnicode';

const { width, height } = Dimensions.get('window');

const Emoji = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.emojiContainer} onPress={onPress}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: width * 0.0059,
  },
  emoji: {
    fontSize: width * 0.02,
  },
});

export default Emoji;
