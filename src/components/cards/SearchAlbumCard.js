import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SearchAlbumCard = ({title, item, handlePress}) => {
  return (
    <TouchableOpacity style={styles.albumCard} onPress={handlePress}>
      <Image source={{uri: item?.cover}} style={styles.albumCover} />
      <View style={styles.albumDetails}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.albumSongsCount}>{item.songs.length} songs</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchAlbumCard;

const styles = StyleSheet.create({
  albumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    gap: 20,
  },

  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
    objectFit: 'cover',
  },

  albumDetails: {
    flex: 1,
    gap: 5,
  },

  albumTitle: {
    color: 'lightgrey',
    fontWeight: '600',
  },

  albumSongsCount: {
    color: 'grey',
    fontSize: 12,
  },
});
