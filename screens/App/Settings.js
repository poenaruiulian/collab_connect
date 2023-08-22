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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear} from "@fortawesome/free-solid-svg-icons";
import {getUserData} from "../../firebase/getUserData";

export default function Settings({navigation}) {

    const {admin, setAdmin} = useContext(AppContext);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const getUser = async () => await getUserData({admin:admin, mail:auth?.currentUser.email
    }).then(resp => {
            setUserData(resp);
        })
        getUser()
    }, []);

    return (
        <ScrollView contentContainerStyle={{flex: 1, alignItems: "center"}}>
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