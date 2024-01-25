import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../Icon';
import {appIcon, icons} from '../../assets';
import {COLORS, width} from '../../constants';

const PlaylistCard = ({item, playlists, handlePress}) => {
  const playlist = playlists[item];

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageBox}>
        <Image
          source={playlist.cover === 'default' ? appIcon : playlist.color}
          style={styles.image}
        />

        <TouchableOpacity style={styles.playBtn}>
          <Icon icon={icons.play} size={30} />
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 5}}>
        <Text style={styles.playlistName}>{item}</Text>
        <Text style={styles.songsCount}>{playlist.songs.length} songs</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  card: {
    width: (width - 70) / 2,
    gap: 5,
    marginBottom: 15,
  },

  imageBox: {
    position: 'relative',
  },

  image: {
    width: (width - 70) / 2,
    height: (width - 70) / 2,
    objectFit: 'contain',
    borderRadius: 10,
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  playBtn: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },

  playlistName: {
    color: 'lightgrey',
  },

  songsCount: {
    fontWeight: '300',
    color: 'grey',
    fontSize: 12,
  },
});
