import { StyleSheet } from 'react-native-web';
import Colors from '../../Resources/Colors';
import { isNative, mxHeight, mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';

export const style = StyleSheet.create({
  container: {
    paddingVertical: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  webContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: mxWidth * 0.05,
    width: '100%',
    borderRadius: mxWidth * 0.02,
    marginBottom: mxWidth * 0.02,
  },
  subWebContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: mxWidth * 0.015,
    width: mxWidth * 0.25,
    borderRadius: mxWidth * 0.02,
    marginBottom: mxWidth * 0.02,
  },
  subContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: mxWidth * 0.1,
  },
  detailsView: {
    backgroundColor: Colors.Blueberry,
    paddingHorizontal: 22,
  },
  subDetailsVw: {
    flexDirection: 'row',
  },
  subIconImage: {
    marginTop: -((mxWidth * 0.07) / 1.4),
    backgroundColor: Colors.White,
    borderRadius: mxWidth * 0.01,
    width: mxWidth * 0.07,
    height: mxWidth * 0.07,
  },
  title: {
    ...theme.fontSemiBold,
    fontSize: isNative ? fontResize(18) : fontResize(mxWidth * 0.016),
    color: Colors.White,
    paddingHorizontal: 16,
  },
  descriptionText: {
    ...theme.fontRegular,
    fontSize: isNative ? fontResize(16) : fontResize(mxWidth * 0.01),
    color: Colors.White,
  },
  attendeesMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendeesSubView: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderRadius: 8,
  },
  attendeesTx: {
    ...theme.fontRegular,
    fontSize: isNative ? 12 : fontResize(mxWidth * 0.008),
    color: '#99C24D',
    padding: 8,
  },
  shareImage: {
    width: isNative ? mxWidth * 0.06 : mxWidth * 0.015,
    height: isNative ? mxWidth * 0.06 : mxWidth * 0.015,
  },

  deleteImage: {
    width: mxWidth * 0.015,
    height: mxWidth * 0.015,
  },

  shareButton: {
    right: mxWidth * 0.02,
    top: mxHeight * 0.02,
    position: 'absolute',
    backgroundColor: Colors.White,
    borderRadius: isNative ? 60 : mxHeight * 0.09,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareWebButton: {
    backgroundColor: Colors.White,
    borderRadius: mxHeight * 0.09,
    // padding: mxWidth * 0.009,
    justifyContent: 'center',
    alignItems: 'center',
    height: mxWidth * 0.03,
    width: mxWidth * 0.03,
  },
  shareView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: mxWidth * 0.02,
    top: mxHeight * 0.02,
    padding: 10,
  },

  editImage: {
    width: mxWidth * 0.015,
    height: mxWidth * 0.015,
  },

  editButton: {
    right: 100,
    top: 20,
    position: 'absolute',
    backgroundColor: Colors.White,
    borderRadius: 60,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    right: 40,
    top: 20,
    position: 'absolute',
    backgroundColor: Colors.White,
    borderRadius: 60,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressText: {
    ...theme.fontRegular,
    fontSize: 12,
    color: Colors.White,
    paddingHorizontal: 8,
  },
  mapMarkerIcon: {
    width: mxWidth * 0.03,
    height: mxWidth * 0.03,
  },
  markerView: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  formateTime: {
    ...theme.fontRegular,
    fontSize: isNative ? 12 : fontResize(mxWidth * 0.008),
    color: '#99C24D',
    padding: 8,
  },
  formateView: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderRadius: 8,
  },
  formateDateText: {
    ...theme.fontRegular,
    fontSize: isNative ? 12 : fontResize(mxWidth * 0.008),
    color: '#99C24D',
    paddingVertical: isNative ? 6 : fontResize(mxWidth * 0.004),
    paddingHorizontal: isNative ? 12 : fontResize(mxWidth * 0.008),
  },
  formateDateView: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderRadius: 8,
  },
});
