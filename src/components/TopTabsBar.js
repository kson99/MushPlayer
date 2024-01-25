import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "./Icon";
import { icons } from "../assets";

const TopTabsBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = route.name;
        let icon;

        switch (route.name) {
          case "Songs":
            icon = icons.songs;
            break;
          case "Artists":
            icon = icons.artist;
            break;
          case "Albums":
            icon = icons.album;
            break;
          case "Folders":
            icon = icons.folder;
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={route.key}
          >
            <Icon
              icon={icon}
              size={30}
              color={isFocused ? "gold" : "lightgrey"}
            />
            <Text style={styles.tabText(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopTabsBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
  },

  tabs: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  tab: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 7,
  },

  tabText: (active) => ({
    color: active ? "gold" : "lightgrey",
  }),
});
