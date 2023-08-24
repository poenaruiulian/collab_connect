import {doc, deleteDoc, getFirestore} from "firebase/firestore";
import {ref, remove} from "firebase/database";
import {database} from "./firebase";

const firestore = getFirestore();

export async function deleteRoom({firebaseId:firebaseId, id:id}){
    await deleteDoc(doc(firestore, "rooms", firebaseId));
    await remove(ref(database, '/chats/students/' + id));
    await remove(ref(database, 'chats/all/' + id));
}