import {View, Text, Colors} from 'react-native-ui-lib'
import {ScrollView, TextInput, TouchableOpacity} from "react-native";
import React, {useContext, useState} from "react";
import KButton from "../../components/KButton";
import KSpacer from "../../components/KSpacer";
import {handleLogin} from "../../firebase/handleLogin";
import {AppContext} from "../../helpers/app_context";
import {setData} from "../../helpers/async_storage";
import {isStudent} from "../../firebase/isStudent";

export default function AuthMain() {

    const [whichAuth, setWhichAuth] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAdmin} = useContext(AppContext);

    return (
        <ScrollView contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "center"}}>

            <KSpacer height={20}/>
            <View row cente spread style={{width: "60%"}} backgroundColor={Colors.tertiary} padding-10 br50>
                <TouchableOpacity
                    onPress={() => setWhichAuth(true)}
                    style={{
                        backgroundColor: whichAuth ? Colors.primary : Colors.secondary,
                        borderRadius: 10,
                        width: "45%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text smallLabel style={{padding: 10}}>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setWhichAuth(false)}
                    style={{
                        backgroundColor: !whichAuth ? Colors.primary : Colors.secondary,
                        borderRadius: 10,
                        width: "45%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text smallLabel style={{padding: 10}} secondary={!whichAuth}>Teacher</Text>
                </TouchableOpacity>
            </View>
            <KSpacer height={20}/>

            <View center backgroundColor={Colors.secondary} style={{width: "80%", height: "30%"}} br50>
                <TextInput
                    autoCapitalize={"none"}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder={whichAuth ? "Enter your student email address" : "Enter your teacher email address"}
                    style={{
                        backgroundColor: Colors.tertiary,
                        padding: 10,
                        width: "90%",
                        borderRadius: 10
                    }}
                />
                <KSpacer height={10}/>
                <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize={"none"}
                    placeholder={"Enter your password"}
                    style={{
                        backgroundColor: Colors.tertiary,
                        padding: 10,
                        width: "90%",
                        borderRadius: 10
                    }}
                />
                <KSpacer height={10}/>
                <KButton onPress={() => {
                    isStudent(email).then(res => {
                        if (!whichAuth && !res) {
                            handleLogin(email, password).then(hl => {
                                    setAdmin(true);
                                    setData("admin", "true");
                            })
                        } else if (!whichAuth && res) {
                            //TODO maybe a modal here
                            alert("Can't log with a student account as teacher!")
                        }else if(whichAuth && res){
                            handleLogin(email, password)
                        }
                    })


                    if (!isStudent(email)) {
                        console.log("teacher")
                    } else {
                        console.log("student")
                    }
                }} bgColor={Colors.primary} color={whichAuth ? Colors.background : Colors.secondary}
                         title={whichAuth ? "Login as Student" : "Login as Teacher"}/>
            </View>
        </ScrollView>
    )
}