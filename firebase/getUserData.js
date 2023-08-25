import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const firestore = getFirestore();
const students = collection(firestore, "students");
const teachers = collection(firestore, "teachers");

export async function getUserData({admin:admin, mail:mail}) {
    const user = query(
        admin?teachers:students,
        where("mail", "==", mail)
    )
    const querySnapshot = await getDocs(user)
    return querySnapshot.docs[0].data();
}