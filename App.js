import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CartProvider } from "./Context/CartContext";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const FirstScreenStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="AllProducts"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AllProducts" component={Products} />
        <Stack.Screen name="AboutProduct" component={ProductDetails} />
      </Stack.Navigator>
    );
  };

  const SecondScreenStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="MyCart"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MyCart" component={Cart} />
        <Stack.Screen name="CheckoutScreen" component={Checkout} />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <CartProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerStyle: {
                marginTop: 30,
              },
              headerTintColor: "black",
              headerTitleStyle: {
                display: "none",
              },
            }}
          >
            <Drawer.Screen
              name="Products"
              options={{
                drawerLabel: "Product",
                title: "Product",
              }}
              component={FirstScreenStack}
            />
            <Drawer.Screen
              name="Cart"
              options={{
                drawerLabel: "Cart",
                title: "Cart",
              }}
              component={SecondScreenStack}
            />

            <Drawer.Screen
              name="Orders"
              options={{ drawerLabel: "Orders", title: "Orders" }}
              component={Orders}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </CartProvider>
    </>
  );
}
