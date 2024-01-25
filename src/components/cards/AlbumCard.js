import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import * as FileSystem from "expo-file-system";
import React, {useEffect, useState} from 'react';
import {appIcon} from '../../assets';
import {COLORS, width} from '../../constants';
// import { useRouter } from "expo-router";

const AlbumCard = ({item, handlePress}) => {
  // const router = useRouter();
  const [artworkExists, setArtworkExists] = useState(false);

  useEffect(() => {
    if (item?.artwork !== '') {
      setArtworkExists(true);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={artworkExists ? {uri: item?.artwork} : appIcon}
        style={styles.image(artworkExists)}
      />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item?.title}
        </Text>
        {/* <View style={styles.more}>
          <Text>{item?.artist}</Text>
          <Text>{item?.albumSongs}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: {
    width: (width - 70) / 2,
    gap: 5,
    marginBottom: 20,
  },

  image: exist => ({
    width: (width - 70) / 2,
    height: (width - 70) / 2,
    objectFit: 'contain',
    borderRadius: 10,
    borderColor: exist ? 'transparent' : COLORS.primary[300],
    borderWidth: exist ? 0 : 0.5,
  }),

  details: {},

  title: {
    color: 'lightgrey',
  },

  more: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
