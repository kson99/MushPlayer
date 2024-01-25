import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, width} from '../constants';
import {addOrRemoveFavorite, formatDuration, isFavourite} from '../utils';
import Toast from 'react-native-root-toast';
import {appContext} from '../global/Context';
import {storeData} from '../storage';
// import { storeData } from "../../storage";

const SongOptions = ({trigger, setTrigger, song}) => {
  const {
    playing,
    playlists,
    setPlaylists,
    favourite,
    setFavourite,
    queue,
    setQueue,
  } = useContext(appContext);

  const [toastMessage, setToastMessage] = useState('');
  const [isDetails, setIsDetails] = useState(false);
  const [isAddToPlaylist, setIsAddToPlaylist] = useState(false);
  const [isNewPlaylist, setIsNewPlaylist] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');
  const _isFavourite = isFavourite(favourite, song.url);
  const [min, sec] = new Date(song?.duration)
    .toISOString()
    .substring(14, 19)
    .split(':');

  const playNext = () => {
    let _queue = queue;
    const index = _queue.indexOf(playing) + 1;

    let newQueue = [..._queue.slice(0, index), song, ..._queue.slice(index)];
    setQueue(newQueue);
    setTrigger(false);
  };

  const addToPlaylist = name => {
    let _playlists = playlists;
    let playlist = playlists[name].songs;
    let alreadyInPlaylist = false;

    // adding song to playlist
    if (!playlist.includes(song.url)) {
      playlist.push(song.url);

      // Add playlist to playlists
      _playlists[name].songs = playlist;

      // Storing playlists data
      storeData({
        playlists: JSON.stringify(_playlists),
      });

      setPlaylists(_playlists);
    } else {
      alreadyInPlaylist = true;
    }

    setTrigger(false);
    if (alreadyInPlaylist) {
      setToastMessage(`Song already in ${name} playlist`);
    } else {
      setToastMessage(`Song added to ${name} playlist`);
    }
  };

  // crating new playlist
  const createPlaylist = () => {
    let _playlists = playlists;
    if (newPlaylist.trim() !== '') {
      _playlists[newPlaylist] = {
        cover: 'default',
        songs: [song.url],
      };

      storeData({
        playlists: JSON.stringify(_playlists),
      });

      setPlaylists(_playlists);
      setTrigger(false);
      setIsNewPlaylist(false);
      setNewPlaylist('');
    }
  };

  // Toast display
  useEffect(() => {
    if (toastMessage !== '') {
      let toast = Toast.show(toastMessage, {
        duration: Toast.durations.LONG,
      });

      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1000);
    }
  }, [toastMessage]);

  useEffect(() => {
    setIsAddToPlaylist(false);
    setIsNewPlaylist(false);
    setIsDetails(false);
  }, [trigger, song]);

  return (
    <Modal
      visible={trigger}
      onRequestClose={() => setTrigger(false)}
      animationType="fade"
      transparent
      avoidKeyboard={true}
      statusBarTranslucent>
      <Pressable
        style={styles.container(isNewPlaylist)}
        onPress={() => setTrigger(false)}>
        {isNewPlaylist ? (
          <Pressable style={styles.newPlaylist}>
            <TextInput
              placeholder="New Playlist"
              value={newPlaylist}
              onChangeText={e => setNewPlaylist(e)}
              style={styles.input}
              placeholderTextColor="grey"
            />
            <TouchableOpacity style={styles.saveBtn} onPress={createPlaylist}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        ) : (
          <Pressable style={styles.options}>
            <View style={styles.song}>
              <Text style={styles.songText}>{song.title}</Text>
            </View>

            {isDetails ? (
              <View>
                <DetailItem KEY="Song title" value={song.title} />
                <DetailItem KEY="Artist" value={song.artist} />
                <DetailItem KEY="Album" value={song.album} />
                <DetailItem KEY="Genre" value={song.genre} />
                <DetailItem KEY="Location" value={song.url} />
                <DetailItem
                  KEY="duration"
                  value={`${min * 1}min ${sec * 1}sec`}
                />
              </View>
            ) : isAddToPlaylist ? (
              // playlist options
              <View>
                <Option
                  title="New Playlist"
                  handlePress={() => setIsNewPlaylist(true)}
                />

                {Object.keys(playlists).map(key => (
                  <Option
                    title={key}
                    key={key}
                    handlePress={() => addToPlaylist(key)}
                  />
                ))}
              </View>
            ) : (
              // Song options
              <View>
                {/* Adding song to queue */}
                <Option title="Play next" handlePress={playNext} />

                <Option
                  title="Add to queue"
                  handlePress={() => {
                    setQueue(prev => [...prev, song]);
                    setTrigger(false);
                    setToastMessage('Song added to queue');
                  }}
                />

                {/* Adding song to playlists */}
                <Option
                  title="Add to playlist"
                  handlePress={() => setIsAddToPlaylist(true)}
                />

                {/* Add or remove from favourites  */}
                <Option
                  title={
                    _isFavourite
                      ? 'Remove from favourites'
                      : 'Add to favourites'
                  }
                  handlePress={() => {
                    addOrRemoveFavorite(favourite, setFavourite, song.url);
                    setTrigger(false);
                    if (_isFavourite) {
                      setToastMessage('Song removed from favorites');
                    } else {
                      setToastMessage('Song added to favorites');
                    }
                  }}
                />

                {/* Show song information */}
                <Option
                  title="Details"
                  handlePress={() => setIsDetails(true)}
                />
              </View>
            )}
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
};

export default SongOptions;

const Option = ({title, handlePress}) => {
  return (
    <TouchableOpacity style={styles.option} onPress={handlePress}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const DetailItem = ({KEY, value}) => {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailKey}>{KEY}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: isNewPlaylist => ({
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: isNewPlaylist ? 'center' : 'flex-end',
    alignItems: 'center',
  }),

  newPlaylist: {
    backgroundColor: COLORS.primary[100],
    width: width * 0.8,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },

  input: {
    width: '100%',
    backgroundColor: COLORS.primary.default,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'lightgrey',
  },

  saveBtn: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: COLORS.primary[300],
    borderRadius: 10,
  },

  saveBtnText: {
    color: 'lightgrey',
  },

  options: {
    width: width - 40,
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: COLORS.primary[100],
    marginBottom: 20,
  },

  song: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary[200],
  },

  songText: {
    color: 'lightgrey',
    fontWeight: '700',
    textAlign: 'center',
  },

  option: {
    paddingVertical: 15,
  },

  optionText: {
    color: 'lightgrey',
  },

  detail: {
    flexDirection: 'column',
    // gap: 5,
    paddingVertical: 5,
  },

  detailKey: {
    color: 'grey',
    fontWeight: '600',
  },

  detailValue: {
    color: 'lightgrey',
  },
});
