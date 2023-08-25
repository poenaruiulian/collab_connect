import {getFirestore, collection, query, where, getDocs} from "firebase/firestore";

const firestore = getFirestore();
const students = collection(firestore, "students");

export async function isStudent(mail) {
    const user = query(
        students,
        where("mail", "==", mail)
    )
    const querySnapshot = await getDocs(user)
    const allDocs = querySnapshot.docs
    return allDocs[0] !== undefined;
}