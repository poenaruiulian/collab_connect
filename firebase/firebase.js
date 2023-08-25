import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "@firebase/database";


const firebaseConfig = {
// firebase config details here
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



export {auth, database}
