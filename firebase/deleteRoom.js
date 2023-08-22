import {doc, deleteDoc, getFirestore} from "firebase/firestore";

const firestore = getFirestore();

export async function deleteRoom(firebaseId){
    await deleteDoc(doc(firestore, "rooms", firebaseId));
}