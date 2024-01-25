import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AppBar from '../components/AppBar';
import {SafeView, SongCard} from '../components';
import {FlashList} from '@shopify/flash-list';
import {appContext} from '../global/Context';

const Folder = ({route, navigation}) => {
  const {folders} = useContext(appContext);
  const {title} = route.params;
  const folderSongs = folders[title];

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
          data={folderSongs}
          renderItem={({item}) => (
            <SongCard
              item={item}
              queued={folderSongs}
              location={`Folder: ${title}`}
            />
          )}
          estimatedItemSize={80}
        />
      </View>
    </SafeView>
  );
};

export default Folder;

const styles = StyleSheet.create({});
