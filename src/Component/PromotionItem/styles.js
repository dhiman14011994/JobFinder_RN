import { StyleSheet } from 'react-native-web';
import Colors from '../../Resources/Colors';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';

export const style = StyleSheet.create({
  container: {
    paddingVertical: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: "center",
    justifyContent: "center",
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
    alignSelf: "center",
    width: '80%',
    borderRadius: mxWidth * 0.02,
    marginBottom: mxWidth * 0.02,
  },
  subContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: mxWidth * 0.15,
  },
  detailsView: {
    backgroundColor: Colors.Blueberry,
    paddingHorizontal: 22,
    paddingVertical: 10
  },
  subDetailsVw: {
    flexDirection: 'row',
  },
  subIconImage: {
    marginTop: -((mxWidth * 0.08) / 1.6),
    backgroundColor: Colors.White,
    borderRadius: mxWidth * 0.01,
    width: mxWidth * 0.08,
    height: mxWidth * 0.08,
  },
  title: {
    ...theme.fontSemiBold,
    fontSize: 18,
    color: Colors.White,
    paddingHorizontal: 16,
  },
  descriptionText: {
    ...theme.fontRegular,
    fontSize: 14,
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
    fontSize: 12,
    color: '#99C24D',
    padding: 8,
  },
  shareImage: {
    width: mxWidth * 0.06,
    height: mxWidth * 0.06,
  },

  deleteImage: {
    width: mxWidth * 0.015,
    height: mxWidth * 0.015,
  },

  shareButton: {
    right: 40,
    top: 70,
    position: 'absolute',
    backgroundColor: Colors.White,
    borderRadius: 60,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 12,
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
    fontSize: 12,
    color: '#99C24D',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  formateDateView: {
    justifyContent: 'center',
    backgroundColor: Colors.White,
    alignItems: 'center',
    borderRadius: 8,
  },
});
