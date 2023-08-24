import {ref, child, push, update, get} from "firebase/database";
import {database} from "./firebase";

export function addTodos({id: id, state: state, task: task, createdBy: createdBy}) {


    const postData = {
        task: task,
        createdBy: createdBy
    };

    get(child(ref(database), '/todos/' + id + "/" + state)).then((snapshot) => {
        if (snapshot.exists()) {
            const updates = {};
            updates['/todos/' + id + "/" + state + "/" + Object.keys(snapshot.val()).length] = postData;

            update(ref(database), updates);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


}