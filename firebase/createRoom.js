import {getFirestore, collection, addDoc, updateDoc, doc} from "firebase/firestore";
import {database} from "./firebase";
import { ref, set } from "firebase/database";

const firestore = getFirestore();

export async function createRoom({teacher:teacher, id:id, members:members}) {
    await set(ref(database, '/chats/students/'+id), {
        messages:[
            {message:"This is the start of a beautiful journey"}
        ]
    });

    await set(ref(database, 'chats/all/'+id), {
        messages:[
            {message:"This is the start of a beautiful journey"}
        ]
    });

    await set(ref(database, 'todos/'+id), {
        todo:[{
            task:"These tasks here will be done.",
            createdBy:"CollabConnect"
        }],
        doing:[{
            task:"These tasks here are work in progress.",
            createdBy:"CollabConnect"
        }],
        done:[{
            task:"These tasks here are done.",
            createdBy:"CollabConnect"
        }]
    });

    await set(ref(database, 'rooms/'+id), {
        id:id,
        members:members,
        teacher:teacher
    });

}