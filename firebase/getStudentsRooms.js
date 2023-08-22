import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const firestore = getFirestore();
const rooms = collection(firestore, "rooms");

export async function getStudentsRooms(mail) {
    const room = query(
        rooms,
        where("members", "array-contains", mail)
    )
    const querySnapshot = await getDocs(room)
    let data = [];
    querySnapshot.docs.map(doc=>{
        data.push(doc.data())
    })
    return data;
}