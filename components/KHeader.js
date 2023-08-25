import {View, Text, Colors} from "react-native-ui-lib";
import {useContext, useState} from "react";
import {AppContext} from "../helpers/app_context";
import {TextInput} from "react-native";
import KButton from "./KButton";
import {addUserToRoom} from "../firebase/addUserToRoom";
import {auth} from "../firebase/firebase";


export default function KHeader({onPress:onPress}){

    const {admin} = useContext(AppContext);

    const [roomId, setRoomId] = useState("");

    return (
        <View padding-10 br30 bg-secondary width={"90%"} row>
            {admin ?
                <View backgroundColor={Colors.tertiary} center flex br30>
                    <KButton
                        bgColor={Colors.transparent}
                        color={Colors.primary}
                        title={"New room"}
                        onPress={onPress}
                    />
                </View>
                :
                <>
                <TextInput
                    value={roomId}
                    onChangeText={(text)=>setRoomId(text)}
                    textAlign={"center"}
                    autoCapitalize={"none"}
                    placeholder={"Enter room id"}
                    style={{backgroundColor: Colors.tertiary, width:"60%", borderRadius:10}}
                />
                <View width={"40%"} style={{alignItems:"flex-end"}}>
                    <KButton
                        onPress={()=>{
                            addUserToRoom({id:roomId,mail:auth?.currentUser.email})
                            setRoomId("");
                        }}
                        bgColor={Colors.primary}
                        color={Colors.white}
                        title={"Enter"}
                    />
                </View>
                </>
            }
        </View>
    )
}