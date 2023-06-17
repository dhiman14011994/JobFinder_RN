import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';

let Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
let ScrollView = styled.ScrollView``;

const style = StyleSheet.create({
  webContainer: {
    flex: 1,
  },
  webSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  webProfileContainer: {
    width: '22%',
    borderRadius: 20,
    marginTop: 18,
    backgroundColor: Colors.White,
  },
  webProfileScrollVw: {
    width: '100%',
    height: '100%',
  },
  webMainvw: {
    width: '54%',
    flex: 1,
    borderRadius: 22,
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  webCalender: {
    width: '22%',
  },
  webBenerVw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  webFeedVw: ({ index }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 12,
    backgroundColor: Colors.White,
    marginTop: index === 3 ? 22 : 0,
    marginBottom: index === 8 ? 22 : 0,
    borderTopLeftRadius: index === 3 ? 22 : 0,
    borderTopRightRadius: index === 3 ? 22 : 0,
    borderBottomLeftRadius: index === 8 ? 22 : 0,
    borderBottomRightRadius: index === 8 ? 22 : 0,
  }),
  webStoryView: {
    backgroundColor: Colors.White,
    borderRadius: 22,
    marginBottom: 16,
    paddingVertical: 16,
    flex: 1,
  },
});
export { Wrapper, ScrollView, style };
