import {View, Text, Colors} from "react-native-ui-lib";
import {TouchableOpacity} from "react-native";

export default function KButton({title: title, bgColor: bgColor, color: color, onPress: onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: "60%",
                height: 40,
                backgroundColor: bgColor,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text style={{padding: 10, color: color}} mediumLabel>{title}</Text>
        </TouchableOpacity>
    )
}