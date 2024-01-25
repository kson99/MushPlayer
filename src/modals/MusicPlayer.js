import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useContext, useEffect, useState} from 'react';
import Icon from '../components/Icon';
import {appIcon, icons} from '../assets';
import {COLORS, width} from '../constants';
import {FlashList} from '@shopify/flash-list';
import {appContext} from '../global/Context';
import {addOrRemoveFavorite, isFavourite} from '../utils';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {MediaPlayerOptions} from '.';
import {QueuedCard} from '../components';

const MusicPlayer = ({trigger, setTrigger}) => {
  const {
    queue,
    setQueue,
    playing,
    setPlaying,
    favourite,
    setFavourite,
    soundState,
    setSoundState,
  } = useContext(appContext);

  const {duration, position} = useProgress();
  const {state: songState} = usePlaybackState();
  const [artworkExists, setArtworkExists] = useState(false);
  const [isQueuedShow, setIsQueuedShow] = useState(false);
  const _isFavourite = isFavourite(favourite, playing?.url);
  const [showOptions, setShowOptions] = useState(false);
  const [button, setButton] = useState('');

  // On Next Click
  const playNextInQueue = async () => {
    await TrackPlayer.skipToNext();
    const index = await TrackPlayer.getCurrentTrack();
    const _playing = await TrackPlayer.getTrack(index);
    setPlaying(_playing);
  };

  // Play or pause music
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

  // On Previous Click
  const playPrevInQueue = async () => {
    await TrackPlayer.skipToPrevious();
    const index = await TrackPlayer.getCurrentTrack();
    const _playing = await TrackPlayer.getTrack(index);
    setPlaying(_playing);
  };

  const loopToogle = async () => {
    // const status = await playbackObj.setIsLoopingAsync(!soundObj.isLooping);
    // setSoundObj(status);
  };

  const shuffleToogle = () => {
    //
  };

  // Did song finish
  const didSongFinish = async () => {
    if (duration === position) {
      const index = await TrackPlayer.getCurrentTrack();
      const _playing = await TrackPlayer.getTrack(index);
      setPlaying(_playing);
    }
  };

  const getQueue = async () => {
    const tracks = await TrackPlayer.getQueue();
    setQueue(tracks);
  };

  useEffect(() => {
    if (soundState.state === 'Playing') {
      didSongFinish();
    }
  }, [position]);

  useEffect(() => {
    if (playing?.artwork !== '') {
      setArtworkExists(true);
    }

    getQueue();
  }, [playing]);

  return (
    <Modal
      visible={trigger}
      onRequestClose={() => setTrigger(false)}
      animationType="slide"
      transparent
      avoidKeyboard={false}
      statusBarTranslucent>
      <View style={styles.container}>
        {/* Image background */}
        <Image
          source={artworkExists ? {uri: playing?.artwork} : appIcon}
          style={styles.bgImage}
          resizeMode="cover"
          blurRadius={50}
        />

        <View style={styles.player}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setTrigger(false)}>
              <Icon icon={icons.chevron_down} size={30} />
            </TouchableOpacity>

            <Text style={styles.headerText(songState === 'playing')}>
              Now Playing
            </Text>

            <TouchableOpacity onPress={() => setIsQueuedShow(!isQueuedShow)}>
              <Icon
                icon={icons.playlist}
                size={25}
                color={isQueuedShow ? 'gold' : 'lightgrey'}
              />
            </TouchableOpacity>
          </View>

          {isQueuedShow ? (
            <View style={styles.playlist}>
              <FlashList
                data={queue}
                renderItem={({item, index}) => (
                  <QueuedCard item={item} queued={queue} index={index} />
                )}
                estimatedItemSize={80}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.playerBox}>
              {/* Album art */}
              <View />

              <View style={styles.albumArtBox}>
                <Image
                  source={artworkExists ? {uri: playing.artwork} : appIcon}
                  style={styles.albumArt}
                />

                <View style={styles.songInfo}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {playing.title}
                  </Text>
                  <Text style={styles.songArtist}>{playing.artist}</Text>
                </View>
              </View>

              {/* Footer */}
              <View>
                {/* Interactive buttons */}
                <View style={styles.interactives}>
                  {/* Favourutes */}
                  <TouchableOpacity
                    onPress={() =>
                      addOrRemoveFavorite(favourite, setFavourite, playing?.url)
                    }>
                    <Icon
                      icon={
                        _isFavourite ? icons.favourite : icons.favourite_outline
                      }
                      size={25}
                      color={_isFavourite ? 'gold' : 'lightgrey'}
                    />
                  </TouchableOpacity>

                  {/* Add to Playlist */}
                  <TouchableOpacity
                    onPress={() => {
                      setShowOptions(true);
                      setButton('addToPlaylist');
                    }}>
                    <Icon icon={icons.playlist_add} size={25} />
                  </TouchableOpacity>

                  {/* Song Details  */}
                  <TouchableOpacity
                    onPress={() => {
                      setShowOptions(true);
                      setButton('details');
                    }}>
                    <Icon icon={icons.info} size={25} />
                  </TouchableOpacity>
                </View>

                {/* Audi tracker */}
                <View style={styles.audioTracker}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    minimumTrackTintColor="gold"
                    maximumTrackTintColor="lightgrey"
                    onSlidingComplete={pos => TrackPlayer.seekTo(pos)}
                  />

                  <View style={styles.duration}>
                    <Text style={styles.durationText}>
                      {new Date(position * 1000)
                        .toISOString()
                        .substring(14, 19)}
                    </Text>
                    <Text style={styles.durationText}>
                      {new Date(playing.duration)
                        .toISOString()
                        .substring(14, 19)}
                    </Text>
                  </View>
                </View>

                {/* Media Controlls */}
                <View style={styles.mediaBtns}>
                  {/* Shuffle */}
                  <TouchableOpacity
                  // onPress={shuffleToogle}
                  >
                    <Icon icon={icons.shuffle} size={25} />
                  </TouchableOpacity>

                  {/* Prev */}
                  <TouchableOpacity onPress={playPrevInQueue}>
                    <Icon icon={icons.previos} size={25} />
                  </TouchableOpacity>

                  {/* Play / Pause */}
                  <TouchableOpacity onPress={togglePlayback}>
                    <Icon
                      icon={
                        soundState.state === 'Playing'
                          ? icons.pause
                          : icons.play
                      }
                      size={45}
                      color={
                        soundState.state === 'Playing' ? 'gold' : 'lightgrey'
                      }
                    />
                  </TouchableOpacity>

                  {/* Next */}
                  <TouchableOpacity onPress={playNextInQueue}>
                    <Icon icon={icons.next} size={25} />
                  </TouchableOpacity>

                  {/* Replay */}
                  <TouchableOpacity onPress={loopToogle}>
                    <Icon
                      icon={icons.replay}
                      size={25}
                      // color={soundObj?.isLooping ? 'gold' : 'lightgrey'}
                      color={'lightgrey'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      <MediaPlayerOptions
        trigger={showOptions}
        setTrigger={setShowOptions}
        song={playing}
        button={button}
      />
    </Modal>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.default,
    position: 'relative',
  },

  bgImage: {
    width: '100%',
    height: '100%',
  },

  player: {
    position: 'absolute',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 5,
    // paddingTop: Constants.statusBarHeight + 5,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: playing => ({
    color: playing ? 'gold' : 'lightgrey',
  }),

  playerBox: {
    flex: 1,
    justifyContent: 'space-between',
  },

  albumArtBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  albumArt: {
    width: width / 1.3,
    height: width / 1.3,
    borderRadius: 20,
  },

  songInfo: {
    alignItems: 'center',
    gap: 3,
  },

  songTitle: {
    color: 'lightgrey',
    fontWeight: '600',
  },

  songArtist: {
    color: 'darkgrey',
    fontSize: 13,
  },

  interactives: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  audioTracker: {
    paddingVertical: 30,
    gap: 5,
  },

  slider: {
    width: '100%',
    height: 10,
  },

  duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  durationText: {
    color: 'lightgrey',
  },

  mediaBtns: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },

  playlist: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, .2)',
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.primary[200],
  },
});
