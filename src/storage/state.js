import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audios: [],
  favourite: [],
  playing: null,
  playingIndex: null,
  soundObj: null,
  playbackObj: null,
  showPlayer: false,
  playbackDuration: null,
  playbackPosition: null,
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setAudios: (state, action) => {
      state.audios = action.payload;
    },

    setFavourite: (state, action) => {
      state.favourite = action.payload;
    },

    setPlaying: (state, action) => {
      state.playing = action.payload;
    },

    setPlayingIndex: (state, action) => {
      state.playingIndex = action.payload;
    },

    setSoundObj: (state, action) => {
      state.soundObj = action.payload;
    },

    setPlaybackObj: (state, action) => {
      state.playbackObj = action.payload;
    },

    setShowPlayer: (state, action) => {
      state.showPlayer = action.payload;
    },

    setPlaybackDuration: (state, action) => {
      state.playbackDuration = action.payload;
    },

    setPlaybackPosition: (state, action) => {
      state.playbackPosition = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAudios,
  setPlaybackDuration,
  setPlaybackObj,
  setPlaybackPosition,
  setPlaying,
  setPlayingIndex,
  setSoundObj,
  setShowPlayer,
  setFavourite,
} = contextSlice.actions;

export default contextSlice.reducer;
