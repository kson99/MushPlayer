import React, {createContext, useEffect, useState} from 'react';
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from 'react-native-get-music-files';
import {hasPermissions} from '../utils';
import {storage, storeData} from '../storage';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {trackPlayerInit} from '../controllers';
import {setupPlayer} from '../../musicPlayerServices';

export const appContext = createContext();

const Context = ({children}) => {
  const {state: songState} = usePlaybackState();
  const [audios, setAudios] = useState([]);
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState({});
  const [folders, setFolders] = useState({});
  const [playing, setPlaying] = useState(null);
  const [soundState, setSoundState] = useState({
    state: 'Paused',
    playing: null,
    songFinished: false,
  });
  const [playingIndex, setPlayingIndex] = useState(0);
  const [queueLocation, setQueueLocation] = useState('');
  const [favourite, setFavourite] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [songJustFinished, setSongJustFinished] = useState(false);
  const [queue, setQueue] = useState([]);
  const [playerReady, setPlayerReady] = useState(false);

  // Get songs from device
  const getAudios = async () => {
    let _hasPermissions = await hasPermissions();

    if (_hasPermissions) {
      await getAll({
        id: true,
        artist: true,
        duration: true,
        cover: true,
        title: true,
        minSongDuration: 30000,
        batchNumber: 5,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.ASC,
        limit: 20,
      })
        .then(songs => {
          // console.log('All Songs:', songs);
          let _songs = [];

          songs.map((song, i) => {
            let _song = {...song};
            delete _song['cover'];
            _song['id'] = i;
            _song['artwork'] = song.cover;

            _songs.push(_song);
          });

          setAudios(_songs);
          getStorageData();
        })
        .catch(err => {
          console.log('Error getting music files', err);
        });
    } else {
      console.log('Permission Denied!');
    }
  };

  // Getting albums from audios
  const getAlbums = () => {
    let _albums = {};

    audios.map(audio => {
      const {album, artwork} = audio;

      if (!_albums[album]) {
        _albums[album] = {artwork, songs: []};
      }

      _albums[album].songs.push(audio);
    });

    setAlbums(_albums);
  };

  // Getting artists from audios
  const getArtists = () => {
    let _artists = {};

    audios.map(audio => {
      const {artist} = audio;

      if (!_artists[artist]) {
        _artists[artist] = [];
      }

      _artists[artist].push(audio);
    });

    setArtists(_artists);
  };

  // Get data from MMKV storage
  const getStorageData = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();

    const fav = storage.getString('favourite');
    const _queue = storage.getString('lastQueue');
    const _playing = storage.getString('lastPlayed');
    const _playlists = storage.getString('playlists');
    const _playingIndex = storage.getNumber('playingIndex');

    if (fav) {
      setFavourite(JSON.parse(fav));
    }

    if (_playlists) {
      setPlaylists(JSON.parse(_playlists));
    }

    if (_queue) {
      setQueue(JSON.parse(_queue));
    }

    if (_playingIndex) {
      setPlayingIndex(_playingIndex);
    }

    if (trackIndex !== null) {
      let trackObject = await TrackPlayer.getTrack(trackIndex);

      setPlaying(trackObject);
      if (songState !== 'Playing') {
        setSoundState(prev => ({
          ...prev,
          state: 'Playing',
        }));
      }
    } else {
      // if (_playing) {
      //   let index = audios.indexOf(JSON.parse(_playing));
      // }
    }
  };

  const setup = async () => {
    let ready = await setupPlayer();

    setPlayerReady(ready);
  };

  //storing last played song, last queue and playing index into MMKV storage
  useEffect(() => {
    //
    if (playing) {
      storeData({
        lastPlayed: JSON.stringify(playing),
        lastQueue: JSON.stringify(queue),
        playingIndex: playingIndex,
      });
    }
  }, [playing, queue, playingIndex]);

  // Get albums and Artists
  useEffect(() => {
    getAlbums();
    getArtists();
  }, [audios]);

  useEffect(() => {
    setup();
    getAudios();
  }, []);

  return (
    <appContext.Provider
      value={{
        playerReady,

        audios,
        setAudios,
        albums,
        setAlbums,
        artists,
        setArtists,
        folders,
        setFolders,
        playing,
        setPlaying,
        soundState,
        setSoundState,

        playingIndex,
        setPlayingIndex,
        favourite,
        setFavourite,
        playlists,
        setPlaylists,
        songJustFinished,
        setSongJustFinished,
        queue,
        setQueue,
        queueLocation,
        setQueueLocation,
      }}>
      {children}
    </appContext.Provider>
  );
};

export default Context;
