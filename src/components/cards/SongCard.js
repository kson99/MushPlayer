import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import Icon from '../Icon';
import {COLORS, width} from '../../constants';
import {useContext, useEffect, useState} from 'react';
import {appIcon, icons} from '../../assets';
import {Icon} from '..';
import {appContext} from '../../global/Context';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {playOrPause} from '../../controllers';
import {SongOptions} from '../../modals';
import {addTracks} from '../../../musicPlayerServices';
// import {appIcon, icons} from '../../assets';
// import {appContext} from '../../grobal/context';
// import {play, playNext} from '../../controllers';
// import * as FileSystem from "expo-file-system";

const SongCard = ({item, queued: audios, location}) => {
  const {
    playing,
    setPlaying,
    setPlayingIndex,
    setQueue,
    queueLocation,
    setQueueLocation,
    soundState,
    setSoundState,
  } = useContext(appContext);

  const {state: songState} = usePlaybackState();
  const [artworkExists, setArtworkExists] = useState(false);
  const [isOption, setIsOption] = useState(false);

  // Song card Press
  const cardPress = async () => {
    setPlaying(item);
    const index = audios.indexOf(item);
    console.log(item.url);

    // No queue exists
    try {
      if (!playing) {
        await addTracks(audios).then(async () => {
          await TrackPlayer.skip(index);
          await TrackPlayer.play();
        });

        setQueueLocation(location);
      } else {
        // if queue exists

        // Song from same queue location
        if (queueLocation === location) {
          await TrackPlayer.skip(index);

          if (songState !== 'playing') {
            await TrackPlayer.play();
          }
        } else {
          // Song from different queue location
          await TrackPlayer.reset();
          await addTracks(audios);

          setQueue(audios);
          setPlayingIndex(index);
          await TrackPlayer.skip(index);
          await TrackPlayer.play();
          setQueueLocation(location);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setSoundState(prev => ({
      ...prev,
      state: 'Playing',
    }));
  };

  useEffect(() => {
    if (item?.artwork !== '') {
      setArtworkExists(true);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={cardPress}>
      <View>
        <Image
          source={
            artworkExists
              ? {
                  uri: item?.artwork,
                }
              : appIcon
          }
          style={styles.image(artworkExists)}
        />
        {playing && playing.url === item.url ? (
          <View style={styles.isPlaying}>
            <Icon
              icon={soundState.state === 'Playing' ? icons.pause : icons.play}
              size={20}
              color={soundState.state === 'Playing' ? 'gold' : 'lightgrey'}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.details}>
        <View style={styles.song}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsOption(true)}>
          <Icon icon={icons.v_ellipsis} size={25} />
        </TouchableOpacity>
      </View>
      <SongOptions trigger={isOption} setTrigger={setIsOption} song={item} />
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    gap: 20,
  },

  imageBox: {
    position: 'relative',
  },

  image: exists => ({
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 10,
    borderColor: exists ? 'transparent' : COLORS.primary[100],
    borderWidth: exists ? 0 : 1,
  }),

  isPlaying: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  details: {
    width: width - 120,
    height: '100%',
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.primary[100],
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
