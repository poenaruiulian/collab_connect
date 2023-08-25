import { updateDoc , doc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const firestore = getFirestore();
const rooms = collection(firestore, "rooms");

export async function addUserToRoom({id:id, mail:mail}){
    const room = query(rooms,where("id","==", id));
    const querySnapshot = await getDocs(room)
    const roomData = querySnapshot.docs[0].data();


    let aux = roomData.members
    aux.push(mail)

    await updateDoc(doc(firestore,"rooms", roomData.firebaseId),{
        members:aux
    })
}