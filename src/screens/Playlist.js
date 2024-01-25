import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {appIcon, icons} from '../assets';
import {COLORS, width} from '../constants';
import {FlashList} from '@shopify/flash-list';
import {appContext} from '../global/Context';
import {AppBar, SafeView, SongCard} from '../components';

const Playlist = ({route, navigation}) => {
  const {audios, playlists} = useContext(appContext);
  const {title} = route.params;
  const playlist = playlists[title].songs;
  const songs = audios.filter(({url}) => playlist.includes(url));

  const playlistDuration = () => {
    let total = 0;
    songs.map(({duration}) => (total += duration));

    const hours = Math.floor(total / 3600000);
    const minutes = Math.floor(total / 60000);
    const seconds = ((total / 1000) % 60).toFixed(0);
    if (hours > 0) {
      return `${hours}h ${minutes}min ${seconds}sec`;
    } else {
      return `${minutes}min ${seconds}sec`;
    }
  };

  return (
    <SafeView>
      <AppBar
        title={title}
        rightBtnIcon={icons.v_ellipsis}
        navigation={navigation}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.playlistInfo}>
            <Image source={appIcon} style={styles.image} />
            <View>
              <Text style={styles.label}>Playlist duration:</Text>
              <Text style={styles.duration}>{playlistDuration()}</Text>
            </View>
          </View>

          <View style={styles.seperator}>
            <View style={styles.seperatorTextBox}>
              <Text style={styles.seperatorText}>Songs</Text>
            </View>
            <View style={styles.seperatorTextBox1}>
              <Text style={styles.seperatorText}>({songs.length})</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1, paddingTop: 20, minHeight: 100}}>
          <FlashList
            data={songs}
            renderItem={({item}) => (
              <SongCard
                item={item}
                queued={songs}
                location={`Playlist: ${title}`}
              />
            )}
            estimatedItemSize={80}
            scrollEnabled={false}
            ListFooterComponent={<View style={{height: 20}} />}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  header: {
    gap: 20,
  },

  playlistInfo: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 20,
  },

  label: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
  },

  duration: {
    color: 'lightgrey',
    fontWeight: '600',
  },

  image: {
    width: width / 4,
    height: width / 4,
    objectFit: 'contain',
    borderRadius: 10,
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  seperator: {
    marginTop: 10,
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

  seperatorTextBox1: {
    position: 'absolute',
    top: -8,
    right: 0,
    backgroundColor: COLORS.primary.default,
    paddingLeft: 5,
  },

  seperatorText: {
    fontSize: 10,
    color: COLORS.primary[700],
    fontWeight: '700',
  },
});
