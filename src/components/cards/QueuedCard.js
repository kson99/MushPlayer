import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from '../Icon';
import {COLORS, width} from '../../constants';
import {appIcon, icons} from '../../assets';
// import { play, playNext } from "../../controllers";
import {appContext} from '../../global/Context';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {QueuedSongOptions} from '../../modals';

const QueuedCard = ({item, queued: audios, index}) => {
  const {playing, setPlaying, setPlayingIndex, setSongJustFinished} =
    useContext(appContext);

  const {state: songState} = usePlaybackState();
  const [artworkExists, setArtworkExists] = useState(false);
  const [isOption, setIsOption] = useState(false);

  // Song card Press
  const cardPress = async () => {
    setPlaying(item);
    const index = audios.indexOf(item);

    await TrackPlayer.skip(index);
    if (songState !== 'playing') {
      await TrackPlayer.play();
    }
  };

  useEffect(() => {
    if (item?.artwork !== '') {
      setArtworkExists(true);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={cardPress}>
      <Text style={{color: 'lightgrey'}}>{index + 1}</Text>

      <View>
        <Image
          source={
            artworkExists
              ? {
                  uri: item.artwork,
                }
              : appIcon
          }
          style={styles.image(artworkExists)}
        />

        {playing && playing.url === item.url ? (
          <View style={styles.isPlaying}>
            <Icon
              icon={songState === 'playing' ? icons.pause : icons.play}
              size={20}
              color={songState === 'playing' ? 'gold' : 'lightgrey'}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.details}>
        <View style={styles.song}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>

        <TouchableOpacity onPress={() => setIsOption(true)}>
          <Icon icon={icons.v_ellipsis} size={25} />
        </TouchableOpacity>
      </View>

      <QueuedSongOptions
        trigger={isOption}
        setTrigger={setIsOption}
        song={item}
      />
    </TouchableOpacity>
  );
};

export default QueuedCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    gap: 20,
  },

  imageBox: {
    position: 'relative',
  },

  image: exists => ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 10,
    borderColor: exists ? 'transparent' : COLORS.primary[100],
    borderWidth: exists ? 0 : 1,
  }),

  isPlaying: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  details: {
    // width: width - 140,
    flex: 1,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary[100],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  song: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },

  title: {
    color: 'lightgrey',
    fontWeight: '600',
  },

  artist: {
    color: 'darkgrey',
    fontWeight: '400',
    fontSize: 13,
  },
});
