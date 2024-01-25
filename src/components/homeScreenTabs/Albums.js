import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AlbumCard from '../cards/AlbumCard';
import {FlashList} from '@shopify/flash-list';
import {width} from '../../constants';
import {appContext} from '../../global/Context';

const Albums = ({navigation}) => {
  const {albums} = useContext(appContext);

  const albumPress = item => {
    navigation.navigate('Album', {title: item});
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={Object.keys(albums)}
        renderItem={({item}) => (
          <AlbumCard
            item={{
              title: item,
              artwork: albums[item].artwork,
            }}
            handlePress={() => albumPress(item)}
          />
        )}
        numColumns={2}
        ListFooterComponent={<View style={{height: 90}} />}
        estimatedItemSize={(width - 70) / 2 + 20}
      />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
