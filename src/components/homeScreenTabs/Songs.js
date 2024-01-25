import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SongCard from '../cards/SongCard';
import {COLORS, width} from '../../constants';
import {appContext} from '../../global/Context';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {getAll} from 'react-native-get-music-files';

const Songs = () => {
  const {audios, playerReady} = useContext(appContext);

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
    audios.length > 0
      ? audios
      : // Dummy data
        [
          {
            title: 'Placeholder',
            artist: 'Artist',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsr_Y7US9FprGZB6zIOqPdM8_ztXKrGgOtQ&usqp=CAU',
            id: 1,
            duration: 355,
            genre: 'Rap',
            album: 'Album',
          },
        ],
  );

  const layoutProvider = new LayoutProvider(
    index => 0,
    (type, dim, index) => {
      if (index < audios.length) {
        dim.width = width;
        dim.height = 80;
      } else {
        dim.width = 0;
        dim.height = 0;
      }
    },
  );

  const renderRow = (type, data) => {
    return <SongCard item={data} queued={audios} location="Songs" />;
  };

  const getSongs = async () => {
    getAll({})
      .then(tracks => {
        // setSongs(tracks);
        console.log(JSON.stringify(tracks, null, 2));
        console.log(tracks.length);
      })
      .catch(error => {
        console.log('Error getting music files:', error);
      });
  };

  useEffect(() => {
    // getSongs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Songs</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        {playerReady && audios.length > 0 ? (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={renderRow}
            renderFooter={() => <View style={{height: 90}} />}
          />
        ) : (
          <View style={styles.loadingBox}>
            {/* <View>

            <ActivityIndicator color="grey" size={'small'} />
            </View> */}

            <View>
              <Text style={styles.loadingText}>Just a sec...</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Songs;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
  },

  header: {
    height: 2,
    position: 'relative',
    backgroundColor: COLORS.primary[100],
    marginBottom: 5,
  },

  headerBox: {
    position: 'absolute',
    top: -7,
    paddingRight: 5,
    backgroundColor: COLORS.primary.default,
  },

  headerText: {
    fontSize: 10,
    color: COLORS.primary[700],
    fontWeight: '700',
  },

  loadingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },

  loadingText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: -90,
  },
});
