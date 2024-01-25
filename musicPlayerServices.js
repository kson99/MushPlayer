import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const playbackService = async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-jump-forward', async ({interval}) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + interval);
  });
  TrackPlayer.addEventListener('remote-jump-backward', async ({interval}) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - interval);
  });
  TrackPlayer.addEventListener('remote-seek', async ({position}) => {
    await TrackPlayer.seekTo(position);
  });
};

const setupPlayer = async () => {
  let isSetup = false;

  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
};

const addTracks = async tracks => {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export {playbackService, setupPlayer, addTracks};
