import {ref, child, push, update, get} from "firebase/database";
import {database} from "./firebase";
import {addMessage} from "./addMessage";
import {addTodos} from "./addTodos";

export function editTodos({id:id, currentState:currentState,futureState:futureState, index:index}) {

    get(child(ref(database), 'todos/'+id + "/" + currentState)).then((snapshot) => {
        if (snapshot.exists()) {


            let aux = snapshot.toJSON()

            let todoToMove = aux[String(index)];

            for(let ind = index; ind < Object.keys(snapshot.val()).length-1; ind++){
                aux[String(ind)] = aux[String(ind+1)];
            }
            delete aux[String(Object.keys(snapshot.val()).length-1)];

            const updates = {};
            updates['todos/'+id + "/" + currentState] = aux;

           update(ref(database), updates);
           addTodos({
               id:id,
               state:futureState,
               task:todoToMove.task,
               createdBy: todoToMove.createdBy
           })
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}