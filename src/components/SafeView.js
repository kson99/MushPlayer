import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
// import Constants from "expo-constants";

const SafeView = ({children}) => {
  return <View style={styles.safeView}>{children}</View>;
};

export default SafeView;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight + 5,
    // backgroundColor: "white",
    backgroundColor: COLORS.primary['default'],
  },
});
