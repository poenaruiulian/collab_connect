import {View, Text, Colors} from "react-native-ui-lib";
import {useContext, useState} from "react";
import {AppContext} from "../helpers/app_context";
import {TextInput} from "react-native";
import KButton from "./KButton";

export default function KHeader({onPress:onPress}){

    const {admin} = useContext(AppContext);

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
                    textAlign={"center"}
                    autoCapitalize={"none"}
                    placeholder={"Add the room id"}
                    style={{backgroundColor: Colors.tertiary, width:"60%", borderRadius:10}}
                />
                <View width={"40%"} style={{alignItems:"flex-end"}}>
                    <KButton
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