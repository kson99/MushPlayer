import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, width} from '../constants';
import Toast from 'react-native-root-toast';
import {storeData} from '../storage';
import {appContext} from '../global/Context';

const MediaPlayerOptions = ({trigger, setTrigger, song, button}) => {
  const {playlists, setPlaylists} = useContext(appContext);
  const [toastMessage, setToastMessage] = useState('');
  const [isNewPlaylist, setIsNewPlaylist] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');
  const [min, sec] = new Date(song.duration)
    .toISOString()
    .substring(14, 19)
    .split(':');

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

  const createPlaylist = () => {
    let _playlists = playlists;
    if (newPlaylist.trim() !== '') {
      _playlists[newPlaylist] = {
        cover: 'default',
        songs: [song.id],
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

  useEffect(() => {
    setIsNewPlaylist(false);
  }, [trigger]);

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
      <Pressable
        style={styles.container(isNewPlaylist)}
        onPress={() => setTrigger(false)}>
        <Pressable style={styles.options}>
          {isNewPlaylist ? (
            <View style={styles.newPlaylist}>
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
            </View>
          ) : button === 'addToPlaylist' ? (
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
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MediaPlayerOptions;

const DetailItem = ({KEY, value}) => {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailKey}>{KEY}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const Option = ({title, handlePress}) => {
  return (
    <TouchableOpacity style={styles.option} onPress={handlePress}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: isNewPlaylist => ({
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: isNewPlaylist ? 'center' : 'flex-end',
    alignItems: 'center',
  }),

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

  newPlaylist: {
    alignItems: 'center',
    gap: 10,
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
});
