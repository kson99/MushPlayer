import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {SafeView, SongCard} from '../components';
import {appContext} from '../global/Context';
import AppBar from '../components/AppBar';
import {FlashList} from '@shopify/flash-list';

const Album = ({route, navigation}) => {
  const {albums} = useContext(appContext);
  const {title} = route.params;
  const album = albums[title];

  return (
    <SafeView>
      <AppBar title={title} navigation={navigation} />
      <View
        style={{
          flex: 1,
          paddingTop: 5,
          paddingHorizontal: 20,
        }}>
        <FlashList
          data={album.songs}
          renderItem={({item}) => (
            <SongCard
              item={item}
              queued={album.songs}
              location={`Album: ${title}`}
            />
          )}
          estimatedItemSize={80}
        />
      </View>
    </SafeView>
  );
};

export default Album;

const styles = StyleSheet.create({});
