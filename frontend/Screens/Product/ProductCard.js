import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native'

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, brand, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? 
                image : 'https://i.pinimg.com/564x/6f/1d/f2/6f1df286cc7613c3024e0dd4b626fefa.jpg'}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.price}>${price}</Text>

            { countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <Button title={'Add'} color={'green'}> </Button>
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.8,
        padding: 5,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 10,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 45 - 60,
        height: width / 2 - 5 - 5,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    brand: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10,
        marginBottom: 5
    }
})

export default ProductCard;