import {Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestMultiple,
} from 'react-native-permissions';
import {storeData} from '../storage';
// import { storeData } from "../storage";

const hasPermissions = async () => {
  if (Platform.OS === 'android') {
    let hasPermission =
      (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
        RESULTS.GRANTED ||
      (await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)) === RESULTS.GRANTED;

    if (!hasPermission) {
      hasPermission = await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      ]);
    }

    return hasPermission;
  }

  if (Platform.OS === 'ios') {
    let hasPermission =
      (await check(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
    if (!hasPermission) {
      hasPermission =
        (await request(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
    }

    return hasPermission;
  }

  return false;
};

// Song duratio format
const formatDuration = duration => {
  const minutes = Math.floor(duration / 60000);
  const seconds = (duration % 60000).toFixed(0);

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// Timer counter
const timeCounter = sec => {
  if (sec < 60) {
    let seconds = sec.toFixed(0);
    if (seconds < 61 && seconds > 59) {
      return `0:00`;
    }
    return `0:${seconds < 10 ? '0' + seconds : seconds}`;
  } else {
    let minutes = Math.floor(sec / 60);
    let seconds = (sec % 60).toFixed(0);

    if (seconds < 61 && seconds > 59) {
      return `${minutes}:00`;
    } else {
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
  }
};

// Converting image to base64
const imageToBase64 = async imageURL => {
  try {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to Base64:', error);
    throw error;
  }
};

// SOng is in Favourites Check!
const isFavourite = (favourite, url) => {
  if (favourite.includes(url)) {
    return true;
  } else {
    return false;
  }
};

// Add or remove Song from Favourites
const addOrRemoveFavorite = (favourite, setFavourite, songId) => {
  let fav = favourite;

  if (isFavourite(favourite, songId)) {
    fav = fav.filter(id => id !== songId);
  } else {
    fav.push(songId);
  }

  storeData({
    favourite: JSON.stringify(fav),
  });
  setFavourite(fav);
};

// Inserting into array @ index
const arrayInsert = (array, index, item) => {
  return [...array.slice(0, index), item, array.slice(index)];
};

export {
  hasPermissions,
  formatDuration,
  timeCounter,
  addOrRemoveFavorite,
  isFavourite,
  arrayInsert,
};
