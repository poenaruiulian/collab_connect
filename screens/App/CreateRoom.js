import {View, Text, Colors} from "react-native-ui-lib";
import {FlatList, TextInput} from "react-native";
import {generateRoomId} from "../../helpers/generateRoomId";
import React, {useState} from "react";
import KButton from "../../components/KButton";
import KSpacer from "../../components/KSpacer";
import {isStudent} from "../../firebase/isStudent";
import {getStudentData} from "../../firebase/getStudentData";
import {createRoom} from "../../firebase/createRoom";
import {auth} from "../../firebase/firebase";
import LottieView from "lottie-react-native";


export default function CreateRoom({navigation}) {
    const [roomId, setRoomId] = useState(generateRoomId());
    const [newMember, setNewMember] = useState("");
    const [roomMembers, setRoomMembers] = useState([]);
    const [roomMembersEmails, setRoomMembersEmails] = useState([]);

    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <KSpacer height={40}/>
            <View padding-10 width={"95%"} bg-tertiary br30>
                <Text bigLabel primary> Room Id: {"\t"}<Text>{roomId}</Text></Text>
            </View>
            <KSpacer height={10}/>
            <View padding-10 br30 bg-secondary width={"95%"} row>
                <TextInput
                    value={newMember}
                    autoCapitalize={"none"}
                    style={{backgroundColor: Colors.tertiary, width: "60%", borderRadius: 10}}
                    textAlign={"center"}
                    placeholder={"Student Mail"}
                    onChangeText={(text) => setNewMember(text)}
                />
                <View width={"40%"} style={{alignItems: "flex-end"}}>
                    <KButton
                        title={"Add"}
                        color={Colors.secondary}
                        bgColor={Colors.primary}
                        onPress={async () => {
                            await isStudent(newMember).then(res => {
                                if (res) {
                                    getStudentData(newMember).then(resp => {
                                        if (!roomMembersEmails.includes(resp.mail)) {
                                            setRoomMembers([...roomMembers, resp]);
                                            setRoomMembersEmails([...roomMembersEmails, resp.mail]);
                                        } else {
                                            //TODO  maybe a modal here
                                            alert("There is already a student in the room with the email " + resp.mail);
                                        }
                                    })
                                } else {
                                    //TODO  maybe a modal here
                                    alert("There is no student with the email " + newMember);
                                }
                            })
                            setNewMember("");
                            console.log(roomMembers);
                        }}
                    />
                </View>
            </View>
            <KSpacer height={20}/>

            <View height={"60%"} center>
                {
                    roomMembers.length === 0 ?
                        <>
                            <View center>
                                <LottieView
                                    autoPlay
                                    speed={1.5}
                                    loop={false}
                                    source={require("../../lottie/room.json")}
                                    style={{ height: 480, width: 480 }}
                                />
                                <Text smallLabel grey40> No members</Text>
                            </View>
                            <KSpacer height={20} />
                        </>
                        :
                        <>
                            <Text bigLabel primary>Members:</Text>
                            <KSpacer height={10}/>
                            <FlatList contentContainerStyle={{backgroundColor: Colors.pimary}} data={roomMembers}
                                      renderItem={({item}) =>
                                          <>
                                              <View row center height={50} width={"100%"} padding-10 bg-tertiary br30>
                                                  <Text smallLabel secondary>Name: <Text>{item.name} {"\t"}</Text></Text>
                                                  <Text smallLabel secondary>Email: <Text>{item.mail}</Text></Text>
                                              </View>
                                              <KSpacer height={5}/>
                                          </>
                                      }/>
                        </>
                }

            </View>

            <KSpacer height={20}/>
            <KButton
                title={"Create room"}
                bgColor={Colors.primary}
                color={Colors.white}
                onPress={()=>{
                    createRoom({teacher: auth?.currentUser.email, id: roomId, members: roomMembersEmails})
                    navigation.pop()
                }}
            />
        </View>
    )
}