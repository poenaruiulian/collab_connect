import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
    const response = await AsyncStorage.getItem(key);
    return response != null ? JSON.parse(response) : undefined;
}
const setData = async (key,value) => {
    return AsyncStorage.setItem(key,value);
}

export {getData, setData}