import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const firestore = getFirestore();
const rooms = collection(firestore, "rooms");

export async function getTeachersRooms(mail) {
    const room = query(
        rooms,
        where("teacher", "==", mail)
    )
    const querySnapshot = await getDocs(room)
    let data = [];
   querySnapshot.docs.map(doc=>{
       data.push(doc.data())
   })
    return data;
}