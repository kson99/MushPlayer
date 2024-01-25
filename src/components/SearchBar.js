import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '.';
import {icons} from '../assets';
import {COLORS, width} from '../constants';

const SearchBar = ({navigation, query, setQuery}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerBtn}>
        <Icon icon={icons.chevron_back} size={20} />
      </TouchableOpacity>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Search for (song, album, artists) here..."
          placeholderTextColor="grey"
          value={query}
          onChangeText={e => setQuery(e)}
          style={styles.input}
          autoFocus={true}
        />

        <TouchableOpacity onPress={() => setQuery('')}>
          <Icon icon={icons.close} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },

  inputBox: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary['-200'],
    borderRadius: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  input: {
    flex: 1,
    color: 'lightgrey',
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
});
