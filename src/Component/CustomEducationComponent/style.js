import {StyleSheet} from 'react-native';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        marginTop: 12,
    },

    titleStyle: {
        color: Colors.Black,
        fontFamily: 'Gilroy-Bold',
        fontSize: fontResize(16),
        lineHeight: fontResize(24),
        letterSpacing: 0.4,
      },

      bodyStyle: {
        color: Colors.PrimaryGray1,
        fontFamily: 'Gilroy-Medium',
        fontSize: fontResize(16),
        lineHeight: fontResize(24),
        letterSpacing: 0.4,
      },

});
