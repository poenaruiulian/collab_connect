import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "@firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBOSD_FHR6cY_8VyTfXkB9l0VyZWrG0yi0",
    authDomain: "collabconnect-dc39f.firebaseapp.com",
    projectId: "collabconnect-dc39f",
    storageBucket: "collabconnect-dc39f.appspot.com",
    messagingSenderId: "18437694335",
    appId: "1:18437694335:web:1904aed35016620a6f304a",
    databaseURL:"https://collabconnect-dc39f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



export {auth, database}