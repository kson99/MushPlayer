import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Playing, SafeView, SongCard} from '../../components';
import {COLORS, width} from '../../constants';
import {FlashList} from '@shopify/flash-list';
import {appContext} from '../../global/Context';

const Favourites = () => {
  const {audios, favourite, playing} = useContext(appContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const _songs = audios.filter(({url}) => favourite.includes(url));
    setSongs(_songs);
  }, [favourite]);

  return (
    <SafeView>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <View style={styles.searchBoxInner}>
            <Text style={styles.searchText}>
              Search for (song, album, artists) here...
            </Text>
          </View>

          <View style={styles.seperator}>
            <View style={styles.seperatorTextBox}>
              <Text style={styles.seperatorText}>Favourites</Text>
            </View>
          </View>
        </View> */}

        <View style={{flex: 1}}>
          <FlashList
            data={songs}
            renderItem={({item}) => (
              <SongCard item={item} queued={songs} location="Favourites" />
            )}
            estimatedItemSize={80}
            ListFooterComponent={<View style={{height: 90}} />}
          />
        </View>
      </View>
      {playing ? <Playing playing={playing} /> : null}
    </SafeView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    gap: 20,
  },

  header: {
    gap: 20,
  },

  searchBoxInner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary['-200'],
    color: 'grey',
  },

  searchText: {
    color: 'grey',
    fontSize: 16,
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

  seperatorText: {
    fontSize: 10,
    color: COLORS.primary[700],
    fontWeight: '700',
  },
});
