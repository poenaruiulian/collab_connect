import {View, Text, Colors} from "react-native-ui-lib"
import KSpacer from "../../components/KSpacer";
import KButton from "../../components/KButton";
import {addMessage} from "../../firebase/addMessage";
import {database} from "../../firebase/firebase";
import {ref, onValue} from "firebase/database";
import React, {useContext, useEffect, useState} from "react";
import {FlatList, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native";
import {faChevronLeft, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {AppContext} from "../../helpers/app_context";

export default function ChatRoom({navigation, route}) {

    const [messagesAll, setMessagesAll] = useState([]);
    const [messagesStudents, setMessagesStudents] = useState([]);
    const {admin} = useContext(AppContext);
    const [whichChat, setWhichChat] = useState(admin)
    const [messageToSend, setMessageToSend] = useState("")


    const messagesRefAll = ref(database, 'chats/all/' + route.params.roomId + '/messages');
    const messagesRefStudents = ref(database, 'chats/students/' + route.params.roomId + '/messages');


    useEffect(() => {
        onValue(messagesRefAll, (snapshot) => {
            const data = snapshot.val();
            setMessagesAll(data);
        });
        onValue(messagesRefStudents, (snapshot) => {
            const data = snapshot.val();
            setMessagesStudents(data);
        });

    }, []);

    return (
        <View flex style={{ alignItems: "center"}} bg-primary>
            <KeyboardAvoidingView behavior={"position"}>
                <KSpacer height={40}/>
                <View width={"100%"} row bg-tertiary br30 padding-10 centerV>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <FontAwesomeIcon icon={faChevronLeft} size={24} color={Colors.primary}/>
                    </TouchableOpacity>
                    <View width={10}></View>
                    <Text bigLabel primary>Room: {route.params.roomId}</Text>
                    <View width={10}></View>
                    <TouchableOpacity onPress={()=>navigation.navigate("Todo", {roomId:route.params.roomId, name:route.params.name})}>
                        <Text bigLabel orange10>Tasks</Text>
                    </TouchableOpacity>
                </View>
                <KSpacer height={10}/>
                {!admin &&
                    <View style={{alignSelf: "center"}} width={"60%"} row bg-tertiary br30 padding-10 centerV spread
                    >
                        <TouchableOpacity style={{
                            alignItems: "center",
                            width: "45%",
                            backgroundColor: !whichChat ? Colors.primary : Colors.secondary,
                            borderRadius: 10,
                            padding: 10
                        }} onPress={() => setWhichChat(false)}>
                            <Text>Students</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            width: "45%",
                            backgroundColor: whichChat ? Colors.primary : Colors.secondary,
                            borderRadius: 10,
                            padding: 10
                        }} onPress={() => setWhichChat(true)}>
                            <Text>All</Text>
                        </TouchableOpacity>
                    </View>}
                <KSpacer height={10}/>
                <View style={{backgroundColor: Colors.primary}} flex width={"100%"} padding-5>
                    {
                        whichChat ?
                            <FlatList data={messagesAll} renderItem={({item}) =>
                                <>
                                    {
                                        messagesAll.indexOf(item) === 0 ?
                                            <View padding-10 center>
                                                <Text text90R grey20>{item.message}</Text>
                                            </View> :
                                            <View style={{
                                                alignItems: item.name === route.params.name || item.name === route.params.name+" - teacher" ? "flex-end" : "flex-start",
                                            }}
                                            >
                                                <Text smallLabel tertiary>{item.name}</Text>
                                                <View padding-5 br30 bg-secondary style={{
                                                    maxWidth: "46%",
                                                }}>
                                                    <Text mediumLabel grey20>{item.message}</Text>
                                                </View>
                                            </View>
                                    }
                                    <KSpacer height={10}/>
                                </>}
                            />
                            :
                            <FlatList data={messagesStudents} renderItem={({item}) =>
                                <>
                                    {
                                        messagesStudents.indexOf(item) === 0 ?
                                            <View padding-10 center>
                                                <Text text90R grey20>{item.message}</Text>
                                            </View> :
                                            <View style={{
                                                alignItems: item.name === route.params.name ? "flex-end" : "flex-start",
                                            }}
                                            >
                                                <Text smallLabel tertiary>{item.name}</Text>
                                                <View padding-5 br30 bg-secondary style={{
                                                    maxWidth: "46%",
                                                }}>
                                                    <Text mediumLabel grey20>{item.message}</Text>
                                                </View>
                                            </View>
                                    }
                                    <KSpacer height={10}/>
                                </>}
                            />

                    }
                </View>
                <View bg-secondary  width={"105%"} row centerH>
                    <View padding-10 width={'75%'}>
                        <TextInput
                            style={{
                                borderRadius: 10,
                                height: 50,
                                width: "100%",
                                backgroundColor: Colors.tertiary,

                            }}
                            textAlign={"center"}
                            onChangeText={(text) => setMessageToSend(text)}
                            value={messageToSend}
                        />
                    </View>
                    <View padding-20>
                        <TouchableOpacity style={{
                            width: "100%"
                        }} onPress={() => {
                            addMessage({
                                id: route.params.roomId,
                                message: messageToSend,
                                name: route.params.name + `${admin?" - teacher":""}`,
                                isAll: whichChat
                            })
                            setMessageToSend("");
                            Keyboard.dismiss()
                        }}>
                            <FontAwesomeIcon icon={faPaperPlane} size={24} color={Colors.grey30}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}