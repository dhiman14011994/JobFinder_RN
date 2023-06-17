import { View } from "react-native";
import React from "react";
import styles from "./style";

const HorizontalLine = ({ horizontalLineStyles }) => {
  return <View style={[styles.horizontalLine, horizontalLineStyles]} />;
};
export default HorizontalLine;
