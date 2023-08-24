import {View, Text, Colors} from "react-native-ui-lib";
import KSpacer from "../../components/KSpacer";
import KButton from "../../components/KButton";
import {editTodos} from "../../firebase/editTodos";
import {addTodos} from "../../firebase/addTodos";

export default function Todo(){
    return(
        <View flex>
            <KSpacer height={50} />
            {/*<Text>Todo</Text>*/}
            {/*<KButton*/}
            {/*    title={"Add task"}*/}
            {/*    bgColor={Colors.green10}*/}
            {/*    color={Colors.purple10}*/}
            {/*    onPress={()=>addTodos({*/}
            {/*        id:"b3b3",*/}
            {/*        state:"todo",*/}
            {/*        task:"be happy",*/}
            {/*        createdBy:"Iulian Poenaru"*/}
            {/*    })}*/}
            {/*/>*/}
            {/*<KSpacer heigh={20}/>*/}
            {/*<KButton*/}
            {/*    title={"Edit task"}*/}
            {/*    bgColor={Colors.green10}*/}
            {/*    color={Colors.purple10}*/}
            {/*    onPress={()=>editTodos({*/}
            {/*        id:"b3b3",*/}
            {/*        currentState:"todo",*/}
            {/*        futureState:"doing",*/}
            {/*        index:2*/}
            {/*    })}*/}
            {/*/>*/}
        </View>
    )
}