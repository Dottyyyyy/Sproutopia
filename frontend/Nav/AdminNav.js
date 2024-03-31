import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Product"
import ProductForm from "../Screens/Product/ProductForm"
import Categories from "../Screens/Admin/Categories/Categories";
import CreateCategory from "../Screens/Admin/Categories/CreateCategories"
import UpdateCategories from "../Screens/Admin/Categories/UpdateCategories"

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
            /> }
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="UpdateCategories" component={UpdateCategories} />
      <Stack.Screen name="CreateCategory" component={CreateCategory} />
      {/* <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm} /> */}
    </Stack.Navigator>
  );
};
export default AdminNavigator;
