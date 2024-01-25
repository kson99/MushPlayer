import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, width} from '../constants';
import {addOrRemoveFavorite, formatDuration, isFavourite} from '../utils';
import Toast from 'react-native-root-toast';
import {storeData} from '../storage';
import {appContext} from '../global/Context';

const QueuedSongOptions = ({trigger, setTrigger, song}) => {
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
  const _isFavourite = isFavourite(favourite, song.id);
  const [min, sec] = formatDuration(song.duration).split(':');

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

    if (!playlist.includes(song.id)) {
      playlist.push(song.id);
    } else {
      alreadyInPlaylist = true;
    }

    _playlists[name].songs = playlist;

    storeData({
      playlists: JSON.stringify(_playlists),
    });

    setPlaylists(_playlists);
    setTrigger(false);
    if (alreadyInPlaylist) {
      setToastMessage(`Song already in ${name} playlist`);
    } else {
      setToastMessage(`Song added to ${name} playlist`);
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

  return (
    <Modal
      visible={trigger}
      onRequestClose={() => setTrigger(false)}
      animationType="fade"
      transparent
      avoidKeyboard={true}
      statusBarTranslucent>
      <Pressable style={styles.container} onPress={() => setTrigger(false)}>
        <Pressable style={styles.options}>
          <View style={styles.song}>
            <Text style={styles.songText}>{song.title}</Text>
          </View>

          {isDetails ? (
            <View>
              <DetailItem KEY="Filename" value={song.filename} />
              <DetailItem KEY="Song title" value={song.title} />
              <DetailItem KEY="Artist" value={song.artist} />
              <DetailItem KEY="Location" value={song.uri.split('://')[1]} />
              <DetailItem KEY="duration" value={`${min}min ${sec}sec`} />
            </View>
          ) : isAddToPlaylist ? (
            // playlist options
            <View>
              <Option title="New Playlist" />
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
              {/* Adding song to playlists */}
              <Option
                title="Add to playlist"
                handlePress={() => setIsAddToPlaylist(true)}
              />

              {/* Add or remove from favourites  */}
              <Option
                title={
                  _isFavourite ? 'Remove from favourites' : 'Add to favourites'
                }
                handlePress={() => {
                  addOrRemoveFavorite(favourite, setFavourite, song.id);
                  setTrigger(false);
                  if (_isFavourite) {
                    setToastMessage('Song removed from favorites');
                  } else {
                    setToastMessage('Song added to favorites');
                  }
                }}
              />

              {/* Show song information */}
              <Option title="Details" handlePress={() => setIsDetails(true)} />
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default QueuedSongOptions;

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
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    // flex: 1,
    color: 'lightgrey',
    // fontWeight: "300",
  },
});
