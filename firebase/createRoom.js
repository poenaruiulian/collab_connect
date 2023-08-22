import {getFirestore, collection, addDoc, updateDoc, doc} from "firebase/firestore";

const firestore = getFirestore();
const rooms = collection(firestore, "rooms");

async function addFirebaseIdToRoom(id){
    await updateDoc(doc(firestore, "rooms", id),{
        firebaseId:id
    })
}
export async function createRoom({teacher:teacher, id:id, members:members}) {
    await addDoc(rooms,{
        firebaseId:"",
        id:id,
        members:members,
        teacher:teacher
    }).then((res)=>addFirebaseIdToRoom(res.id));
}