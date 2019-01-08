import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
const androidConfig = {
    clientId: '597910904949-5mbfs5e9l0fi2s9dupd5dg4a3ueqibeg.apps.googleusercontent.com',
    appId: '1:597910904949:android:12d3585c04495dfe',
    apiKey: 'AIzaSyDY78OAOnKV-86eXBAvP74bjWOqaVj8-0s',
    databaseURL: "https://dmvinh-509d8.firebaseio.com",
    storageBucket: 'dmvinh-509d8.appspot.com',
    messagingSenderId: '597910904949',
    projectId: 'dmvinh-509d8',

    // enable persistence by adding the below flag
    persistence: true,
}

const museumApp = firebase.initializeApp(
    // use platform specific firebase config
    androidConfig,
    // name of this app
    'museumApp',
  );

export const rootRef = museumApp.database().ref()

export const objectsRef = rootRef.child('Objects')
export const favoriteRef = rootRef.child('Favorite')
export const profileRef = rootRef.child('Profiles')
export const typesRef = rootRef.child('Types')
export const museumsRef = rootRef.child('Museums')
export const MixRef = rootRef.child('IdMix')
export const commentsRef = rootRef.child('Comments')
export const FirebaseAuth = museumApp.auth()
export const FirebaseStorage = museumApp.storage()
export const rootRefStorage = FirebaseStorage.ref()
export const AvatarsRefStorage = rootRefStorage.child('Avatars')
export const TempRefStorage = rootRefStorage.child('Temp')
export const UserUpdateRefStorage = rootRefStorage.child('UserUpdate')


