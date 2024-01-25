import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '.';
import {icons} from '../assets';
import {COLORS, width} from '../constants';

const AppBar = ({
  title,
  rightBtnIcon = null,
  handlePress = null,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerBtn}>
        <Icon icon={icons.chevron_back} size={20} />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <TouchableOpacity
        onPress={handlePress}
        style={rightBtnIcon ? styles.headerBtn : null}>
        <Icon
          icon={rightBtnIcon ? rightBtnIcon : icons.chevron_back}
          size={20}
          color={rightBtnIcon ? 'lightgrey' : 'transparent'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },

  headerBtn: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary[200],
  },

  title: {
    color: 'lightgrey',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
});
