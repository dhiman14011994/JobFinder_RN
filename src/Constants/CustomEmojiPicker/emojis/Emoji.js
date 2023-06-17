import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

import shortnameToUnicode from '../helpers/shortnameToUnicode';

const Emoji = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.emojiContainer} onPress={onPress}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: Dimensions.get('screen').width * 0.035,
  },
  emoji: {
    fontSize: Dimensions.get('screen').width * 0.043,
  },
});

export default Emoji;
