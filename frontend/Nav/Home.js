import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";

import ProductContainer from "../Screens/Product/ProductContainer";
import SingleProduct from "../Screens/Product/SingleProduct";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Product Container"
          component={ProductContainer}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Product Detail"
          component={SingleProduct}
          // options={{
          //     headerShown: false,
          // }}
        />
      </Stack.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  // Add more styles as needed
});
export default Home;
