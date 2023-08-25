import {Text, Colors, View} from "react-native-ui-lib"
import KButton from "../../components/KButton";
import {Alert, FlatList, RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import {handleLogout} from "../../firebase/handleLogout";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../helpers/app_context";
import {setData} from "../../helpers/async_storage";
import KSpacer from "../../components/KSpacer";
import KHeader from "../../components/KHeader";
import {getTeachersRooms} from "../../firebase/getTeachersRooms";
import {auth, database} from "../../firebase/firebase";
import {getStudentsRooms} from "../../firebase/getStudentsRooms";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {getUserData} from "../../firebase/getUserData";
import {deleteRoom} from "../../firebase/deleteRoom";
import {onValue, ref} from "firebase/database";
import LottieView from "lottie-react-native";

export default function Home({navigation}) {

    const {admin, setAdmin} = useContext(AppContext);
    const [rooms, setRooms] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const [userData, setUserData] = useState({});

    const getRooms = () => {
        if (admin) {
            getTeachersRooms(auth?.currentUser.email).then(resp => {
                setRooms(resp);

            })
        } else {
            getStudentsRooms(auth?.currentUser.email).then(resp => {
                setRooms(resp);
            })
        }
    }

    useEffect(() => {
        const getUser = async () => await getUserData({admin: admin, mail: auth?.currentUser.email}).then(resp => {
            setUserData(resp);
        })
        getUser()
        // getRooms()
        onValue(ref(database, 'rooms/'), (snapshot) => {
            let data = [];
            if (snapshot.exists()) {
                let aux = snapshot.toJSON()
                for (let i in aux) {
                    data.push(aux[`${i}`])
                }

                if (admin) {
                    data = data.filter(item => item.teacher === auth?.currentUser.email)
                } else {
                    let aux = []
                    for (let item in data) {
                        for (let i in Object.values(data[item].members)) {
                            if (Object.values(data[item].members)[i] === auth?.currentUser.email) {
                                aux.push(data[item])
                            }
                        }
                    }
                    data = aux;
                }

            } else {
                console.log("Nope")
            }
            setRooms(data);


        });

    }, []);

    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <KSpacer height={52}/>
            <View width={"90%"} row spread style={{alignItems: "center"}}>
                <Text bigLabel grey10>Welcome, <Text grey10={!admin} yellow10={admin}>{userData?.name ?? "friend"}</Text></Text>
                <TouchableOpacity onPress={() => navigation.navigate("Setting", {name: userData.name})}>
                    <FontAwesomeIcon icon={faGear} size={32} color={Colors.grey10}/>
                </TouchableOpacity>
            </View>
            <KSpacer height={10}/>
            <KHeader onPress={() => navigation.navigate("CreateRoom")}/>
            <KSpacer height={50}/>

            {
                rooms.length === 0?
                    <>
                        <View center>
                            <LottieView
                                autoPlay
                                speed={1.5}
                                loop
                                source={require("../../lottie/search.json")}
                                style={{ height: 380, width: 380 }}
                            />
                            <Text smallLabel grey40> No rooms</Text>
                        </View>
                    </>
                    :
                    <>
                        <Text header>Your Rooms:</Text>
                        <KSpacer height={20}/>
                        <FlatList data={rooms} renderItem={({item}) =>
                            <TouchableOpacity style={{alignItems: "center"}} width={"100%"} key={item.id} onLongPress={() => {
                                admin && Alert.alert(
                                    "Do you want to delete this rooms?",
                                    "",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                            onPress: () => {
                                            }
                                        },
                                        {
                                            text: "Confirm",
                                            style: "destructive",
                                            onPress: () => deleteRoom({firebaseId: item.firebaseId, id: item.id})
                                        }
                                    ]
                                )
                            }} onPress={() => {
                                navigation.navigate("ChatRoom", {roomId: item.id, name: userData.name})
                            }}>
                                <View center height={70} width={"90%"} bg-primary padding-10 br30 row
                                      style={{justifyContent: "space-evenly"}}>
                                    <Text bigLabel>Room id: <Text>{item.id}</Text></Text>
                                    <Text bigLabel> Members: <Text secondary>{Object.keys(item.members).length}</Text></Text>
                                </View>
                                <KSpacer height={10}/>
                            </TouchableOpacity>
                        }/></>
            }
        </View>
    )
}