import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ArtistCard,
  SafeView,
  SearchAlbumCard,
  SearchBar,
  SongCard,
} from '../components';
import {appContext} from '../global/Context';

const Search = ({navigation}) => {
  const {audios, artists: _artists, albums: _albums} = useContext(appContext);
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState({});

  const results = () => {
    let _songs = [];
    let __albums = {};
    let __artists = [];

    if (query.trim() !== '') {
      // Gettting songs that include query
      audios.map(song => {
        const {title} = song;
        if (title.toLowerCase().includes(query.toLowerCase())) {
          _songs.push(song);
        }
      });

      // Getting albums that inlude query
      Object.keys(_albums).map(title => {
        const album = _albums[title];

        if (title.toLowerCase().includes(query.toLowerCase())) {
          __albums[title] = album;
        }
      });

      // Getting artists that include query
      Object.keys(_artists).map(artistName => {
        const artist = _artists[artistName];

        if (artistName.toLowerCase().includes(query.toLowerCase())) {
          __artists[artistName] = artist;
        }
      });

      // Setting state values
      setSongs(_songs.length > 10 ? _songs.slice(0, 10) : _songs);
      setAlbums(
        Object.keys(__albums).length > 10
          ? Object.fromEntries(Object.entries(__albums).slice(0, 10))
          : __albums,
      );
      setArtists(
        Object.keys(__artists).length > 10
          ? Object.fromEntries(Object.entries(__artists).slice(0, 10))
          : __artists,
      );
    } else {
      // Clear lists for no queries
      setSongs([]);
      setAlbums({});
      setArtists({});
    }
  };

  const albumCardPress = title => {
    navigation.navigate('Album', {title});
  };

  const artistCardPress = title => {
    navigation.navigate('Artist', {title});
  };

  useEffect(() => {
    results();
  }, [query]);

  return (
    <SafeView>
      <SearchBar navigation={navigation} query={query} setQuery={setQuery} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Songs */}
          {songs.length > 0 ? (
            <View style={styles.category}>
              <Text style={styles.categoryText}>Songs</Text>
              <FlatList
                data={songs}
                renderItem={({item}) => (
                  <SongCard
                    item={item}
                    queued={[item]}
                    location={`Search: ${item?.title}`}
                  />
                )}
                contentContainerStyle={{paddingHorizontal: 5}}
                scrollEnabled={false}
              />
            </View>
          ) : null}

          {/* Albums */}
          {Object.keys(albums).length > 0 ? (
            <View style={styles.category}>
              <Text style={styles.categoryText}>Albums</Text>
              <FlatList
                data={Object.keys(albums)}
                renderItem={({item}) => (
                  <SearchAlbumCard
                    title={item}
                    item={albums[item]}
                    handlePress={() => albumCardPress(item)}
                  />
                )}
                contentContainerStyle={{paddingHorizontal: 5}}
                scrollEnabled={false}
              />
            </View>
          ) : null}

          {/* Artist */}
          {Object.keys(artists).length > 0 ? (
            <View style={styles.category}>
              <Text style={styles.categoryText}>Artists</Text>
              <FlatList
                data={Object.keys(artists)}
                renderItem={({item}) => (
                  <ArtistCard
                    title={item}
                    item={artists[item]}
                    handlePress={() => artistCardPress(item)}
                  />
                )}
                contentContainerStyle={{paddingHorizontal: 5}}
                scrollEnabled={false}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 10,
  },

  category: {
    gap: 5,
  },

  categoryText: {
    color: 'grey',
    fontWeight: '600',
  },
});
