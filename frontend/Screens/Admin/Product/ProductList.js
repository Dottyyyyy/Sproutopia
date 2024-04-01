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
import Categories from "../Category/Categories";
// import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <View>
                <Text> Name: {props.item.name}</Text>
                <Text> price: ${props.item.price}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <EasyButton
                    primary
                    medium
                    onPress={() => props.navigation.navigate('UpdateProductForm', { productId: props.item._id })}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                </EasyButton>
                <EasyButton
                    danger
                    medium
                    onPress={() => props.delete(props.item._id)}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                </EasyButton>
            </View>
        </View>
    )
}

const Categories = ({ navigation }) => {

    const [products, setProduct] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [categoryLocation, setCategoryLocation] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}/products`)
            .then((res) => setProduct(res.data))
            .catch((error) => alert("Error load categories"))

        return () => {
            setProduct();
            setToken();
        }
    }, [])

    // const addCategory = () => {
    //     const category = {
    //         name: categoryName,
    //         location: categoryLocation
    //     };

    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     };

    //     axios
    //         .post(`${baseURL}/categories/create`, category, config)
    //         .then((res) => setCategories([...categories, res.data]))
    //         .catch((error) => alert("Error to load categories"));

    //     setCategoryName("")
    //     setCategoryLocation("");
    // }

    const deleteProduct = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}/products/${id}`, config)
            .then((res) => {
                const newProducts = products.filter((item) => item.id !== id);
                setProduct(newProducts);
            })
            .catch((error) => alert("Error delete categories"));
    }

    return (
        <View style={{ position: "relative", height: "100%" }}>
            <View style={{ marginBottom: 60 }}>
                <FlatList
                    data={products}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={deleteProduct} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>

                {/* <Text>Name</Text>
                <TextInput
                    value={categoryName}
                    style={styles.input}
                    onChangeText={(text) => setCategoryName(text)}
                    placeholder="Category Name"
                />
                <Text>Location</Text>
                <TextInput
                    value={categoryLocation}
                    style={styles.input}
                    onChangeText={(text) => setCategoryLocation(text)}
                    placeholder="Location"
                />
                <EasyButton
                    medium
                    primary
                    onPress={() => addCategory()}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                </EasyButton> */}
                {/* <Button title="ADD" onPress={() => navigation.navigate('CreateCategory')} /> */}
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

export default Categories;