import {View, ActivityIndicator} from 'react-native';

const Spinner = props => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={props.color || '#000000'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Spinner;
