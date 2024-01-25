import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {appContext} from '../../global/Context';
// import { useRouter } from "expo-router";
// import * as MediaLibrary from "expo-music-library";
// import { appContext } from "../../grobal/context";

const Artists = ({navigation}) => {
  // const router = useRouter();
  const {audios, artists: _artists} = useContext(appContext);
  const [artists, setArtists] = useState({});

  const sortArtists = async () => {
    let Obj = {};

    Object.keys(_artists).map(artist => {
      const letter = artist.toUpperCase()[0];

      if (!Obj[letter]) {
        Obj[letter] = [];
      }

      Obj[letter].push({title: artist, artistSongs: _artists[artist].length});
    });

    const ordered = Object.keys(Obj)
      .sort()
      .reduce((acc, letter) => {
        acc[letter] = Obj[letter];
        return acc;
      }, {});

    setArtists(ordered);
  };

  useEffect(() => {
    sortArtists();
  }, [audios]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {Object.keys(artists).map(letter => (
          <View key={letter}>
            <Text style={styles.listLetter}>{letter}</Text>
            {artists[letter].map(artist => (
              <TouchableOpacity
                style={styles.artist}
                key={artist?.title}
                onPress={() =>
                  navigation.navigate('Artist', {title: artist.title})
                }>
                <Text style={styles.artistName}>{artist.title}</Text>
                <Text style={styles.songsCount}>
                  {artist.artistSongs} songs
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Artists;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 5,
    paddingBottom: 90,
  },

  inner: {
    flex: 1,
  },

  listLetter: {
    color: 'grey',
    fontWeight: '800',
  },

  artist: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  artistName: {
    color: 'lightgrey',
  },

  songsCount: {
    fontWeight: '300',
    color: 'grey',
    fontSize: 12,
  },
});
