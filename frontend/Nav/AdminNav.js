import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/Product/ProductForm"
import UpdateProductForm from "../Screens/Admin/Product/UpdateProduct"
import Categories from "../Screens/Admin/Category/Categories";
import CreateCategory from "../Screens/Admin/Category/CreateCategories"
import UpdateCategories from "../Screens/Admin/Category/UpdateCategories"
import adminOrderList from "../Screens/Order/OrderList"
import ProductList from "../Screens/Admin/Product/ProductList"
import AdminCharts from "../Screens/Admin/Charts/AdminCharts"
import BarGraph from "../Screens/Admin/Charts/BarChart";
import PieGraph from "../Screens/Admin/Charts/PieChart";
import LineGraph from "../Screens/Admin/Charts/LineGraph";
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
      <Stack.Screen name="adminOrderList" component={adminOrderList} />
      <Stack.Screen name="AdminCharts" component={AdminCharts}/>
      <Stack.Screen name="BarCharts" component={BarGraph} options={{ title: "Sales Per User" }}/>
      <Stack.Screen name="PieCharts" component={PieGraph} options={{ title: "Most Ordered Product" }}/>
      <Stack.Screen name="LineGraph" component={LineGraph} options={{ title: "Sales Per Month" }}/>
    </Stack.Navigator>
  );
};
export default AdminNavigator;
