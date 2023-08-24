import {ref, child, push, update, get} from "firebase/database";
import {database} from "./firebase";

export function addMessage({id:id, name:name, message:message, isAll:isAll}) {

    const which = isAll?"all":"students";


    const postData = {
        message:message,
        name:name
    };

    get(child(ref(database), '/chats/'+ which + '/' + id + '/' + "messages/")).then((snapshot) => {
        if (snapshot.exists()) {
            const updates = {};
            updates['/chats/'+ which + '/' + id + '/' + "messages/"+Object.keys(snapshot.val()).length] = postData;

            update(ref(database), updates);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


}