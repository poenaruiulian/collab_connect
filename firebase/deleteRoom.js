import {doc, deleteDoc, getFirestore} from "firebase/firestore";
import {ref, remove} from "firebase/database";
import {database} from "./firebase";

const firestore = getFirestore();

export async function deleteRoom({firebaseId:firebaseId, id:id}){
    await remove(ref(database, '/chats/students/' + id));
    await remove(ref(database, 'chats/all/' + id));
    await remove(ref(database, 'todos/' + id));
    await remove(ref(database, 'rooms/' + id));
}