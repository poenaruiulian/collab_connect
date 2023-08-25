import {Text, Colors, View} from "react-native-ui-lib"
import KButton from "../../components/KButton";
import {ScrollView} from "react-native";
import {handleLogout} from "../../firebase/handleLogout";
import React, {useContext} from "react";
import {AppContext} from "../../helpers/app_context";
import {setData} from "../../helpers/async_storage";
import LottieView from "lottie-react-native";
import KSpacer from "../../components/KSpacer";

export default function Settings({route}) {

    const {admin, setAdmin} = useContext(AppContext);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
            <View center>
                <LottieView
                    autoPlay
                    loop
                    source={require("../../lottie/hello.json")}
                    style={{height: 254, width: 254}}
                />
            </View>

            <View paddingH-10>
                <Text text70>

                    Welcome to <Text mediumLabel yellow10>CollabConnect</Text>, your gateway to a new era of education. We bring teachers and students
                    together in a virtual space that's all about seamless communication and collaboration.{"\n\n"}

                    Imagine classrooms without walls, where learning happens anytime, anywhere. With <Text mediumLabel yellow10>CollabConnect</Text>, teachers
                    create <Text text70 style={{fontStyle:"italic"}}>Rooms</Text> that host two types of chats. In the <Text text70 style={{fontStyle:"italic"}}>Student Chat</Text>, students exchange ideas and
                    questions. In the <Text text70 style={{fontStyle:"italic"}}>Teacher-Student Chat</Text>, mentors guide discussions to deeper insights.{"\n\n"}

                    But it doesn't stop there. We've also integrated a <Text text70 style={{fontStyle:"italic"}}>Tasks</Text> feature that turns assignments into team
                    efforts. Think of it as a digital workspace, like what you find on GitHub, where everyone contributes to
                    shared goals.{"\n\n"}

                    Join us and experience education without boundaries. <Text mediumLabel yellow10>CollabConnect</Text> isn't just an app; it's a community
                    where minds meet, ideas flourish, and learning knows no limits.{"\n\n"}
                </Text>
            </View>

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

            <KSpacer height={100}/>

        </ScrollView>
    )
}