import {FlatList, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import * as MediaLibrary from "expo-music-library";
import FolderCard from '../cards/FolderCard';
// import { appContext } from "../../grobal/context";
import {FlashList} from '@shopify/flash-list';
import {appContext} from '../../global/Context';

const Folders = ({navigation}) => {
  const {audios, setFolders: _setFolders} = useContext(appContext);
  const [folders, setFolders] = useState([]);

  const getFolders = async () => {
    let _folders = {};
    audios.map(audio => {
      const {url} = audio;
      const dir = url.split('/');
      const folderName = dir[dir.length - 2];

      if (!_folders[folderName]) {
        _folders[folderName] = [];
      }

      _folders[folderName].push(audio);
    });

    setFolders(_folders);
    _setFolders(_folders);
  };

  const folderPress = item => {
    navigation.navigate('Folder', {title: item});
  };

  useEffect(() => {
    getFolders();
  }, [audios]);

  return (
    <View style={styles.container}>
      <FlashList
        data={Object.keys(folders)}
        renderItem={({item}) => (
          <FolderCard
            item={{title: item}}
            handlePress={() => folderPress(item)}
          />
        )}
        estimatedItemSize={65}
        ListFooterComponent={<View style={{height: 90}} />}
      />
    </View>
  );
};

export default Folders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
