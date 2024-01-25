import {MMKV} from 'react-native-mmkv';
// import { store } from "./store";
// import {
//   setAudios,
//   setFavourite,
//   setPlaybackDuration,
//   setPlaybackObj,
//   setPlaybackPosition,
//   setPlaying,
//   setPlayingIndex,
//   setShowPlayer,
//   setSoundObj,
// } from "./state";

const storage = new MMKV();

const storeData = object => {
  const keys = Object.keys(object);

  keys.forEach(key => {
    storage.set(key, object[key]);
  });
};

export {
  // store,
  storage,
  storeData,
  // setAudios,
  // setPlaying,
  // setPlaybackDuration,
  // setPlaybackObj,
  // setPlaybackPosition,
  // setPlayingIndex,
  // setSoundObj,
  // setShowPlayer,
  // setFavourite,
};
