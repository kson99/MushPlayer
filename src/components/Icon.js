import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Icon = ({icon, size, color = 'lightgrey'}) => {
  return (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        tintColor: color,
      }}
    />
  );
};

export default Icon;
