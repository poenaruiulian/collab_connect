import {getFirestore, collection, addDoc} from "firebase/firestore";

const firestore = getFirestore();
const rooms = collection(firestore, "rooms");

export async function createRoom({teacher:teacher, id:id, members:members}) {
    await addDoc(rooms,{
        id:id,
        members:members,
        teacher:teacher
    })
}