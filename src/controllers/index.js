import TrackPlayer from 'react-native-track-player';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
};

const skip = async () => {};

const playOrPause = async state => {
  if (state === 'playing') {
    TrackPlayer.pause();
  } else {
    TrackPlayer.play();
  }
};

export {trackPlayerInit, playOrPause};
