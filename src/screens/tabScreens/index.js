import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Favourites, Home, Playlists} from '..';
import {COLORS} from '../../constants';
import {icons} from '../../assets';
import {Icon} from '../../components';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          borderRadius: 30,
          bottom: 15,
          left: 15,
          right: 15,
          height: 60,
          backgroundColor: COLORS.primary[100],
        },

        tabBarIcon: ({focused, color, size}) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = icons.home;
              break;
            case 'Playlists':
              icon = icons.playlist;
              break;
            case 'Favourites':
              icon = icons.favourite;
              break;
          }

          return <Icon icon={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'gold',
        tabBarInactiveTintColor: 'lightgrey',
        tabBarLabelStyle: {display: 'none'},
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
