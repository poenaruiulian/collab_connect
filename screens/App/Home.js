import {Text, Colors, View} from "react-native-ui-lib"
import KButton from "../../components/KButton";
import {RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import {handleLogout} from "../../firebase/handleLogout";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../helpers/app_context";
import {setData} from "../../helpers/async_storage";
import KSpacer from "../../components/KSpacer";
import KHeader from "../../components/KHeader";
import {getTeachersRooms} from "../../firebase/getTeachersRooms";
import {auth} from "../../firebase/firebase";
import {getStudentsRooms} from "../../firebase/getStudentsRooms";

export default function Home({navigation}) {

    const {admin, setAdmin} = useContext(AppContext);
    const [rooms, setRooms] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const getRooms = () => {
        if (admin) {
            getTeachersRooms(auth?.currentUser.email).then(resp => {
                setRooms(resp);

            })
        }else{
            getStudentsRooms(auth?.currentUser.email).then(resp=>{
                setRooms(resp);
            })
        }
    }

    useEffect(() => {
        getRooms()
    }, []);

    return (
        <ScrollView contentContainerStyle={{flex: 1, alignItems: "center"}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {
                setRefreshing(true);
                getRooms();
                setRefreshing(false)
            }}
            />}>
            <KSpacer height={50}/>
            <KHeader onPress={() => navigation.navigate("CreateRoom")}/>
            <KSpacer height={50}/>

            <Text header>Your Rooms:</Text>
            {/*TODO Lottie when no rooms*/}
            <KSpacer height={20}/>
            {
                rooms.map(room =>
                    <TouchableOpacity width={"100%"} key={room.id} center>
                        <View center height={70} width={"90%"} bg-primary padding-10 br30 row style={{justifyContent:"space-evenly"}}>
                            <Text bigLabel >Room id: <Text>{room.id}</Text></Text>
                            <Text bigLabel> Members: <Text secondary>{room.members.length}</Text></Text>
                        </View>
                        <KSpacer height={10}/>
                    </TouchableOpacity>
                )
            }

            <KSpacer height={50}/>
            <KButton
                title={"Log out"}
                bgColor={admin ? Colors.red10 : Colors.green10}
                color={Colors.white}
                onPress={() => {
                    handleLogout();
                    setAdmin(false);
                    setData("admin", "false");
                }}
            />

        </ScrollView>
    )
}