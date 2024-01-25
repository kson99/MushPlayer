import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../Icon';
import {icons} from '../../assets';
// import {useRouter} from 'expo-router';
// import {width} from '../../constants';

const FolderCard = ({item, handlePress}) => {
  // const router = useRouter();

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.details}>
        <Icon icon={icons.folder_single} size={50} />
        <Text style={styles.title} numberOfLines={1}>
          {item?.title}
        </Text>
      </View>

      <TouchableOpacity>
        <Icon icon={icons.v_ellipsis} size={25} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FolderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 15,
  },

  details: {
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: 'lightgrey',
    flex: 1,
  },
});
