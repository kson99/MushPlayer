import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {storeData} from '../storage';
import {COLORS, width} from '../constants';
import {appContext} from '../global/Context';

const CreatePlaylist = ({trigger, setTrigger, playlists}) => {
  const {setPlaylists} = useContext(appContext);
  const [newPlaylist, setNewPlaylist] = useState('');

  const createPlaylist = () => {
    let _playlists = playlists;
    if (newPlaylist.trim() !== '') {
      _playlists[newPlaylist] = {
        cover: 'default',
        songs: [],
      };

      storeData({
        playlists: JSON.stringify(_playlists),
      });

      setPlaylists(_playlists);
      setTrigger(false);
      setNewPlaylist('');
    }
  };

  return (
    <Modal
      visible={trigger}
      onRequestClose={() => setTrigger(false)}
      animationType="fade"
      transparent
      avoidKeyboard={true}
      statusBarTranslucent>
      <Pressable style={styles.container} onPress={() => setTrigger(false)}>
        <Pressable style={styles.popup}>
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
      </Pressable>
    </Modal>
  );
};

export default CreatePlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    gap: 15,
    backgroundColor: COLORS.primary[100],
    width: width * 0.8,
    borderRadius: 20,
    padding: 20,
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
});
