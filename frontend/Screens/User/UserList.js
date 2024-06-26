import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    Button
} from "react-native"
import EasyButton from "../../../Shared/StyledComponents/EasyButton"
import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <View>
                <Text> Name: {props.item.name}</Text>
                <Text> Email: {props.item.email}</Text>
            </View>
        </View>
    )
}

const UserList = ({ navigation }) => {

    const [users, setUsers] = useState([]);
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}/users`)
            .then((res) => setUsers(res.data))
            .catch((error) => alert("Error load users"))

        return () => {
            setUsers();
            setToken();
        }
    }, [])

    return (
        <View style={{ position: "relative", height: "100%" }}>
            <View style={{ marginBottom: 60 }}>
                <FlatList
                    data={users}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})

export default UserList;