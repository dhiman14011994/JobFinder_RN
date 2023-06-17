import React, {memo} from 'react';
import {FlatList, Dimensions, View} from 'react-native';

import Emoji from './Emoji';
import {emojisByCategory} from '../data/emojis';
import shortnameToUnicode from '../helpers/shortnameToUnicode';

const EmojiCategory = ({category, selectedEmoji}) => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
      }}>
      <FlatList
        contentContainerStyle={{justifyContent: 'space-between'}}
        data={emojisByCategory[category]}
        renderItem={({item}) => (
          <Emoji
            item={item}
            onPress={() => selectedEmoji(shortnameToUnicode[`:${item}:`])}
          />
        )}
        keyExtractor={item => item}
        numColumns={8}
      />
    </View>
  );
};

export default memo(EmojiCategory);
