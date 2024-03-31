import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Product/Products"
import ProductForm from "../Screens/Admin/Product/ProductForm"
import UpdateProductForm from "../Screens/Admin/Product/ProductUpdate"
import Categories from "../Screens/Admin/Categories/Categories";
import CreateCategory from "../Screens/Admin/Categories/CreateCategories"
import UpdateCategories from "../Screens/Admin/Categories/UpdateCategories"
import ProductList from "../Screens/Admin/Product/ProductList"

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      {<Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: "Products"
        }}
      />}
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="UpdateCategories" component={UpdateCategories} />
      <Stack.Screen name="CreateCategory" component={CreateCategory} />
      {/* <Stack.Screen name="Orders" component={Orders} />*/}
      <Stack.Screen name="ProductForm" component={ProductForm} />
      <Stack.Screen name="UpdateProductForm" component={UpdateProductForm} />
      <Stack.Screen name="ProductList" component={ProductList} />
    </Stack.Navigator>
  );
};
export default AdminNavigator;
