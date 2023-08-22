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
import {auth} from "../../firebase/firebase";
import {getStudentsRooms} from "../../firebase/getStudentsRooms";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {getUserData} from "../../firebase/getUserData";
import {deleteRoom} from "../../firebase/deleteRoom";

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
        getRooms()
    }, [rooms]);

    return (
        // <ScrollView contentContainerStyle={{flex: 1, alignItems: "center"}} refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={() => {
        //         setRefreshing(true);
        //         getRooms();
        //         setRefreshing(false)
        //     }}
        //     />}>
        <View style={{flex: 1, alignItems: "center"}} >
            <KSpacer height={50}/>
            <View width={"90%"} row spread style={{alignItems: "center"}}>
                <Text bigLabel grey10>Welcome, {userData?.name ?? "friend"}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                    <FontAwesomeIcon icon={faGear} size={32} color={Colors.grey10}/>
                </TouchableOpacity>
            </View>
            <KSpacer height={10}/>
            <KHeader onPress={() => navigation.navigate("CreateRoom")}/>
            <KSpacer height={50}/>

            <Text header>Your Rooms:</Text>
            {/*TODO Lottie when no rooms*/}
            <KSpacer height={20}/>
            <FlatList data={rooms} renderItem={({item})=>
                <TouchableOpacity style={{alignItems:"center"}} width={"100%"} key={item.id} onLongPress={() => {
                    admin &&  Alert.alert(

                        "Do you want to delete this rooms?",
                        "",
                        [
                            {
                                text: "Cancel",
                                style:"cancel",
                                onPress: () => {}
                            },
                            {
                                text: "Confirm",
                                style:"destructive",
                                onPress: () => deleteRoom(item.firebaseId)
                            }
                        ]
                    )
                }} onPress={() => {
                    console.log("Press")
                }}>
                    <View center height={70} width={"90%"} bg-primary padding-10 br30 row
                          style={{justifyContent: "space-evenly"}}>
                        <Text bigLabel>Room id: <Text>{item.id}</Text></Text>
                        <Text bigLabel> Members: <Text secondary>{item.members.length}</Text></Text>
                    </View>
                    <KSpacer height={10}/>
                </TouchableOpacity>
            }/>
        </View>
        // </ScrollView>
    )
}