import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

export const rootRef = firebase.database().ref()

export const objectsRef = rootRef.child('Objects')
export const favoriteRef = rootRef.child('Favorite')
export const profileRef = rootRef.child('Profiles')
export const typesRef = rootRef.child('Types')
export const museumsRef = rootRef.child('Museums')
export const commentsRef = rootRef.child('Comments')
export const FirebaseAuth = firebase.auth()
export const FirebaseStorage = firebase.storage()
export const rootRefStorage = FirebaseStorage.ref()
export const AvatarsRefStorage = rootRefStorage.child('Avatars')
export const TempRefStorage = rootRefStorage.child('Temp')
export const UserUpdateRefStorage = rootRefStorage.child('UserUpdate')


