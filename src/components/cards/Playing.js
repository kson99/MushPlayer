import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
// import * as FileSystem from "expo-file-system";
import {COLORS, width} from '../../constants';
// import { pause, play, resume } from "../../controllers";
import Icon from '../Icon';
import {appIcon, icons} from '../../assets';
import {usePlaybackState} from 'react-native-track-player';
import {playOrPause} from '../../controllers';
import {MusicPlayer} from '../../modals';
import {appContext} from '../../global/Context';

const Playing = ({playing}) => {
  const {soundState, setSoundState} = useContext(appContext);
  const {state: songState} = usePlaybackState();
  const [artworkExists, setArtworkExists] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (playing?.artwork !== '') {
      setArtworkExists(true);
    }
  }, [playing]);

  const togglePlayback = async () => {
    if (songState === 'playing') {
      await TrackPlayer.pause();
      setSoundState(prev => ({
        ...prev,
        state: 'Paused',
      }));
    } else {
      await TrackPlayer.play();
      setSoundState(prev => ({
        ...prev,
        state: 'Playing',
      }));
    }
  };

  useEffect(() => {
    if (playing?.artwork !== '') {
      setArtworkExists(true);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => setShowPlayer(true)}
      style={styles.nowPlaying}>
      <View style={styles.playingContainer}>
        <Image
          source={artworkExists ? {uri: playing?.artwork} : appIcon}
          style={styles.bgImage}
          resizeMode="cover"
          blurRadius={20}
        />

        <View style={styles.playing}>
          <View style={styles.nowPlayingImageHolder}>
            <Image
              source={artworkExists ? {uri: playing?.artwork} : appIcon}
              style={styles.nowPlayingImage}
            />
          </View>

          <View>
            <Text style={styles.nowPlayingTitle} numberOfLines={1}>
              {playing?.title}
            </Text>
          </View>

          <TouchableOpacity onPress={togglePlayback}>
            <Icon
              icon={soundState.state === 'Playing' ? icons.pause : icons.play}
              size={25}
              color={soundState.state === 'Playing' ? 'gold' : 'lightgrey'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <MusicPlayer
        trigger={showPlayer}
        setTrigger={setShowPlayer}
        playing={playing}
      />
    </TouchableOpacity>
  );
};

export default Playing;

const styles = StyleSheet.create({
  nowPlaying: {
    position: 'absolute',
    bottom: 30,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: COLORS.primary['-100'],
    borderWidth: 0.5,
    borderColor: COLORS.primary[300],
    borderRadius: 20,
    height: 90,
  },

  playingContainer: {
    position: 'relative',
  },

  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  playing: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  nowPlayingImageHolder: {
    position: 'relative',
    height: 30,
    width: 50,
  },

  nowPlayingImage: {
    position: 'absolute',
    top: -20,
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: 'cover',
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  progressIndicator: {
    position: 'absolute',
    top: -20,
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: 'cover',
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  nowPlayingTitle: {
    fontWeight: '600',
    color: 'lightgrey',
    flex: 1,
    maxWidth: width - 150,
  },
});
