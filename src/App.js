import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './screens/tabScreens';
import Context from './global/Context';
import {Album, Artist, Folder, Playlist, Search} from './screens';
import {RootSiblingParent} from 'react-native-root-siblings';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Context>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Tabs" component={MyTabs} />
            <Stack.Screen name="Artist" component={Artist} />
            <Stack.Screen name="Album" component={Album} />
            <Stack.Screen name="Folder" component={Folder} />
            <Stack.Screen name="Playlist" component={Playlist} />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </Context>
  );
};

export default App;
