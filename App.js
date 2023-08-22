import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./screens/App/Home";
import AuthMain from "./screens/Auth/AuthMain";

import {auth} from "./firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {configTheme} from "./theming";
import {AppContext} from "./helpers/app_context";
import {getData, setData} from "./helpers/async_storage";
import CreateRoom from "./screens/App/CreateRoom";
import Settings from "./screens/App/Settings";


const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"Home"} component={Home}/>
            <Stack.Screen options={{headerShown: false, presentation:"modal"}} name={"CreateRoom"} component={CreateRoom}/>
            <Stack.Screen options={{headerShown: false, presentation:"modal"}} name={"Setting"} component={Settings}/>

        </Stack.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={"AuthMain"} component={AuthMain}/>
        </Stack.Navigator>
    )
}

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })

        const getAdmin = async () => {
            await getData("admin").then(res => {
                setAdmin(res === true);
            }).catch(err => {
                console.log(err);
                setData("admin", false);
            })
        }

        getAdmin();

    }, []);
    configTheme();
    return (
        <AppContext.Provider value={{admin, setAdmin}}>
            <NavigationContainer>
                {isLoggedIn ? AppStack() : AuthStack()}
            </NavigationContainer>
        </AppContext.Provider>
    );
}
