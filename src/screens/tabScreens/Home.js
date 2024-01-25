import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  Albums,
  Artists,
  Folders,
  Playing,
  SafeView,
  Songs,
  TopTabsBar,
} from '../../components';
import {COLORS, width} from '../../constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {appContext} from '../../global/Context';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const {playing} = useContext(appContext);

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TouchableOpacity
            style={styles.searchBoxInner}
            onPress={() => navigation.navigate('Search')}>
            <Text style={styles.searchText}>
              Search for (song, album, artists) here...
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Tabs */}
        <Tab.Navigator
          sceneContainerStyle={{
            backgroundColor: COLORS.primary.default,
            paddingHorizontal: 20,
          }}
          tabBar={props => <TopTabsBar {...props} />}>
          <Tab.Screen name="Songs" component={Songs} />
          <Tab.Screen name="Artists" component={Artists} />
          <Tab.Screen name="Albums" component={Albums} />
          <Tab.Screen name="Folders" component={Folders} />
        </Tab.Navigator>
      </View>

      {playing ? <Playing playing={playing} /> : null}
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },

  searchBox: {
    paddingTop: 15,
    paddingHorizontal: 20,
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

  tabs: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 7,
  },

  tabText: (tab, active) => ({
    color: tab === active ? 'gold' : 'lightgrey',
  }),

  nowPlaying: {
    position: 'absolute',
    bottom: 30,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: COLORS.primary['-100'],
    borderWidth: 0.5,
    borderColor: COLORS.primary[300],
    borderRadius: 20,
    height: 90,
  },

  playingContainer: {
    position: 'relative',
  },

  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  playing: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  nowPlayingImageHolder: {
    position: 'relative',
    height: 30,
    width: 50,
  },

  nowPlayingImage: {
    position: 'absolute',
    top: -20,
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: 'cover',
    borderColor: COLORS.primary[300],
    borderWidth: 0.5,
  },

  nowPlayingTitle: {
    fontWeight: '600',
    color: 'lightgrey',
    flex: 1,
    maxWidth: width - 150,
  },
});
