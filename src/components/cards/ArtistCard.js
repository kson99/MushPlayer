import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {appContext} from '../../global/Context';
import {appIcon} from '../../assets';
import {COLORS} from '../../constants';

const ArtistCard = ({title, item, handlePress}) => {
  const {} = useContext(appContext);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={appIcon} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.songsCount}>{item.length} songs</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    gap: 20,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    objectFit: 'cover',
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  details: {
    flex: 1,
    gap: 5,
  },

  title: {
    color: 'lightgrey',
    fontWeight: '600',
  },

  songsCount: {
    color: 'grey',
    fontSize: 12,
  },
});
