import {View, Text, Colors, Drawer, Carousel} from "react-native-ui-lib";
import KSpacer from "../../components/KSpacer";
import KButton from "../../components/KButton";
import {editTodos} from "../../firebase/editTodos";
import {addTodos} from "../../firebase/addTodos";
import {FlatList, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {addMessage} from "../../firebase/addMessage";
import React, {useEffect, useState} from "react";
import {database} from "../../firebase/firebase";
import {onValue, ref} from "firebase/database";
import {GestureHandlerRootView} from 'react-native-gesture-handler'

class TypeOfTodo {
    static todo = "todo";
    static doing = "doing";
    static done = "done";
}

export default function Todo({navigation, route}) {

    const [todos, setTodos] = useState({
        todo: [],
        doing: [],
        done: []
    });
    const [task, setTask] = useState("");

    const [typeOfTodo, setTypeOfTodo] = useState(TypeOfTodo.todo);

    const todosRef = ref(database, 'todos/' + route.params.roomId);
    useEffect(() => {
        onValue(todosRef, (snapshot) => {
            const data = snapshot.val();
            setTodos(data);
        });
    }, [])

    return (
        <View flex style={{alignItems: "center"}} bg-primary>
            <KeyboardAvoidingView behavior={"position"} >
                <KSpacer height={40}/>
                <View width={"100%"} row bg-tertiary br30 padding-10 centerV>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} color={Colors.primary}/>
                    </TouchableOpacity>
                    <View width={10}></View>
                    <Text bigLabel primary>Tasks</Text>
                </View>
                <KSpacer height={40}/>

                <View style={{alignSelf: "center"}} width={"90%"} row bg-tertiary br30 padding-10 centerV spread
                >
                    <TouchableOpacity style={{
                        alignItems: "center",
                        width: "28%",
                        backgroundColor: typeOfTodo === TypeOfTodo.todo ? Colors.primary : Colors.secondary,
                        borderRadius: 10,
                        padding: 10
                    }} onPress={() => setTypeOfTodo(TypeOfTodo.todo)}>
                        <Text>To do</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: "center",
                        width: "28%",
                        backgroundColor: typeOfTodo === TypeOfTodo.doing ? Colors.primary : Colors.secondary,

                        borderRadius: 10,
                        padding: 10
                    }} onPress={() => setTypeOfTodo(TypeOfTodo.doing)}>
                        <Text>Doing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        alignItems: "center",
                        width: "28%",
                        backgroundColor: typeOfTodo === TypeOfTodo.done ? Colors.primary : Colors.secondary,

                        borderRadius: 10,
                        padding: 10
                    }} onPress={() => setTypeOfTodo(TypeOfTodo.done)}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
                <KSpacer height={20}/>

                {
                    typeOfTodo === TypeOfTodo.todo &&
                    <View flex width={"100%"}
                          padding-5
                    >
                        <FlatList
                                  data={todos.todo}
                                  renderItem={({item}) =>
                                      <>
                                          {
                                              todos.todo.indexOf(item) === 0 ?
                                                  <View centerV padding-s4 bg-grey50 br30 style={{height: 60}}>
                                                      <Text text70>{item.task}</Text>
                                                      <Text text90>{item.createdBy}</Text>
                                                  </View> : <GestureHandlerRootView style={{alignItems: "center"}}>
                                                      <Drawer
                                                          style={{
                                                              width: "90%",
                                                              borderRadius: 10
                                                          }}
                                                          rightItems={[{
                                                              text: 'Done',
                                                              background: Colors.green40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "todo",
                                                                  futureState: "done",
                                                                  index: todos.todo.indexOf(item)
                                                              }),
                                                          }]}
                                                          leftItem={{
                                                              text: 'Doing',
                                                              background: Colors.orange40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "todo",
                                                                  futureState: "doing",
                                                                  index: todos.todo.indexOf(item)
                                                              }),
                                                          }}
                                                      >
                                                          <View centerV padding-s4 bg-white style={{height: 60}}>
                                                              <Text text70>{item.task}</Text>
                                                              <Text text90>{item.createdBy}</Text>
                                                          </View>
                                                      </Drawer>
                                                  </GestureHandlerRootView>
                                          }
                                          <KSpacer height={10}/>
                                      </>
                                  }/>
                    </View>
                }

                {
                    typeOfTodo === TypeOfTodo.doing &&
                    <View height={"100%"} width={"100%"}
                          padding-5
                    >
                        <FlatList contentContainerStyle={{flex: 1}}
                                  data={todos.doing}
                                  renderItem={({item}) =>
                                      <>
                                          {
                                              todos.doing.indexOf(item) === 0 ?
                                                  <View centerV padding-s4 bg-grey50 br30 style={{height: 60}}>
                                                      <Text text70>{item.task}</Text>
                                                      <Text text90>{item.createdBy}</Text>
                                                  </View> : <GestureHandlerRootView style={{alignItems: "center"}}>
                                                      <Drawer
                                                          style={{
                                                              width: "90%",
                                                              borderRadius: 10
                                                          }}
                                                          rightItems={[{
                                                              text: 'Done',
                                                              background: Colors.green40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "doing",
                                                                  futureState: "done",
                                                                  index: todos.doing.indexOf(item)
                                                              }),
                                                          }]}
                                                          leftItem={{
                                                              text: 'To do',
                                                              background: Colors.orange40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "doing",
                                                                  futureState: "todo",
                                                                  index: todos.doing.indexOf(item)
                                                              }),
                                                          }}
                                                      >
                                                          <View centerV padding-s4 bg-white style={{height: 60}}>
                                                              <Text text70>{item.task}</Text>
                                                              <Text text90>{item.createdBy}</Text>
                                                          </View>
                                                      </Drawer>
                                                  </GestureHandlerRootView>
                                          }

                                          <KSpacer height={10}/>
                                      </>
                                  }/>
                    </View>
                }

                {
                    typeOfTodo === TypeOfTodo.done &&
                    <View height={"100%"} width={"100%"}
                          padding-5
                    >
                        <FlatList contentContainerStyle={{flex: 1}}
                                  data={todos.done}
                                  renderItem={({item}) =>
                                      <>
                                          {
                                              todos.done.indexOf(item) === 0 ?
                                                  <View centerV padding-s4 bg-grey50 br30 style={{height: 60}}>
                                                      <Text text70>{item.task}</Text>
                                                      <Text text90>{item.createdBy}</Text>
                                                  </View> : <GestureHandlerRootView style={{alignItems: "center"}}>
                                                      <Drawer
                                                          style={{
                                                              width: "90%",
                                                              borderRadius: 10
                                                          }}
                                                          rightItems={[{
                                                              text: 'Doing',
                                                              background: Colors.green40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "done",
                                                                  futureState: "doing",
                                                                  index: todos.done.indexOf(item)
                                                              }),
                                                          }]}
                                                          leftItem={{
                                                              text: 'To do',
                                                              background: Colors.orange40,
                                                              onPress: () => editTodos({
                                                                  id: route.params.roomId,
                                                                  currentState: "done",
                                                                  futureState: "todo",
                                                                  index: todos.done.indexOf(item)
                                                              }),
                                                          }}
                                                      >
                                                          <View centerV padding-s4 bg-white style={{height: 60}}>
                                                              <Text text70 style={{ textDecorationLine: 'line-through' }}>{item.task}</Text>
                                                              <Text text90>{item.createdBy}</Text>
                                                          </View>
                                                      </Drawer>
                                                  </GestureHandlerRootView>
                                          }
                                          <KSpacer height={10}/>
                                      </>
                                  }/>
                    </View>
                }

                {typeOfTodo === TypeOfTodo.todo &&
                    <View width={"100%"} row center>
                        <View padding-10 width={'75%'}>
                            <TextInput
                                placeholder={"Enter a task"}
                                style={{
                                    borderRadius: 10,
                                    height: 50,
                                    width: "100%",
                                    backgroundColor: Colors.tertiary,

                                }}
                                textAlign={"center"}
                                onChangeText={(text) => setTask(text)}
                                value={task}
                            />
                        </View>
                        <View padding-20>
                            <TouchableOpacity style={{
                                width: "100%"
                            }} onPress={() => {
                                addTodos({
                                    id: route.params.roomId,
                                    state: "todo",
                                    task: task,
                                    createdBy: route.params.name
                                })
                                setTask("")
                                Keyboard.dismiss()
                            }}>
                                <FontAwesomeIcon icon={faCirclePlus} size={32} color={Colors.grey30}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </KeyboardAvoidingView>
        </View>

    )
}