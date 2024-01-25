import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {SafeView, SongCard} from '../components';
import AppBar from '../components/AppBar';
import {appContext} from '../global/Context';
import {FlashList} from '@shopify/flash-list';

const Artist = ({route, navigation}) => {
  const {artists} = useContext(appContext);
  const {title} = route.params;
  const artist = artists[title];

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
          data={artist}
          renderItem={({item}) => (
            <SongCard
              item={item}
              queued={artist}
              location={`Artist: ${title}`}
            />
          )}
          estimatedItemSize={80}
        />
      </View>
    </SafeView>
  );
};

export default Artist;

const styles = StyleSheet.create({});
