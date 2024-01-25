import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Icon, Playing, PlaylistCard, SafeView} from '../../components';
import {COLORS, width} from '../../constants';
import {icons} from '../../assets';
import {appContext} from '../../global/Context';
import {FlashList} from '@shopify/flash-list';
import {CreatePlaylist} from '../../modals';

const Playlists = ({navigation}) => {
  const {playing, playlists} = useContext(appContext);
  const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);

  const playlistCardPress = playlist => {
    navigation.navigate('Playlist', {title: playlist});
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.createPlaylist}
            onPress={() => setIsCreatePlaylist(true)}>
            <Icon icon={icons.playlist_add} size={20} />
            <Text style={styles.createPlaylistText}>Create Playlist</Text>
          </TouchableOpacity>

          <View style={styles.seperator}>
            <View style={styles.seperatorTextBox}>
              <Text style={styles.seperatorText}>Playlists</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1, paddingTop: 30}}>
          <FlashList
            data={Object.keys(playlists)}
            renderItem={({item}) => (
              <PlaylistCard
                item={item}
                playlists={playlists}
                handlePress={() => playlistCardPress(item)}
              />
            )}
            numColumns={2}
            estimatedItemSize={(width - 70) / 2 + 30}
          />
        </View>
      </View>

      <CreatePlaylist
        trigger={isCreatePlaylist}
        setTrigger={setIsCreatePlaylist}
        playlists={playlists}
      />

      {playing ? <Playing playing={playing} /> : null}
    </SafeView>
  );
};

export default Playlists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 15,
    gap: 30,
    flexBasis: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  seperator: {
    position: 'relative',
    height: 1,
    width: width - 40,
    backgroundColor: COLORS.primary[200],
  },

  seperatorTextBox: {
    position: 'absolute',
    top: -8,
    backgroundColor: COLORS.primary.default,
    paddingRight: 5,
  },

  seperatorText: {
    fontSize: 10,
    color: COLORS.primary[700],
    fontWeight: '700',
  },

  createPlaylist: {
    gap: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.primary['-100'],
    backgroundColor: COLORS.primary[100],
  },

  createPlaylistText: {
    color: 'lightgrey',
  },
});
