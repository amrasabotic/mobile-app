import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../Context/CartContext";
import HeadNav from "./HeadNav";

function Cart({ navigation }) {
  const { cartData, setCartData, isCartUpdated, setIsCartUpdated } = useContext(CartContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsEmpty(cartData.length === 0);
  }, []);

  //Calculating total for all products in cart
  useEffect(() => {
    let totalPrice = 0;
    cartData.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cartData]);

  //remove one item from cart
  async function addData(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  const removeProduct = (item) => {
    const updatedCartItems = cartData.filter((cartItem) => cartItem !== item);
    if (updatedCartItems.length === 0) {
      setCartData([]);
      addData("cartItems", []);
    } else {
      setCartData(updatedCartItems);
      addData("cartItems", updatedCartItems);
    }
  };

  //Epty cart
  const emptyCart = () => {
    setCartData([]);
    Alert.alert("Empty Cart", "You have empty your shopping cart");
    setIsCartUpdated(true);
  };

  //Increment quantity
  async function handleIncrement(cart_id) {
    setCartData((cartData) =>
      cartData.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setIsCartUpdated(true);
  }

  //decrement quantity
  async function handleDecrement(cart_id) {
    setCartData((cartData) =>
      cartData.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
    setIsCartUpdated(true);
  }

  //function to display products in cart
  const displayProducts = cartData.map((item) => {
    return (
      <View key={item.id} style={styles.product_card}>
        <Image source={{ width: 50, height: 50, uri: item.image_link }} />
        <View style={styles.product_details}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.product_name} numberOfLines={4}>
              {item.name}
            </Text>
            <View style={styles.remove_btn}>
              <Button
                title="X"
                onPress={() => removeProduct(item)}
                color="red"
              />
            </View>
          </View>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <Text style={styles.price}>{item.price} &euro;</Text>
            <View style={styles.quantity_control}>
              <View style={styles.qty_btn}>
                <Button
                  title="-"
                  onPress={() => handleDecrement(item.id)}
                  color="gray"
                />
              </View>
              <Text
                style={{
                  paddingTop: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  width: 40,
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </Text>
              <View style={styles.qty_btn}>
                <Button
                  title="+"
                  onPress={() => handleIncrement(item.id)}
                  color="gray"
                />
              </View>
            </View>
          </View>
          <Text style={{ fontWeight: "bold" }}>
            Total: {(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  }

  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <HeadNav />
      </SafeAreaView>
      {isEmpty ? (
        <View style={styles.message}>
          <Text style={styles.message_text}>Your Cart is empty!</Text>
          <Text style={styles.message_text}>Go back to shop.</Text>
          <View style={styles.shop_btn}>
            <Button
              title="Shop Now"
              color="green"
              onPress={() => navigation.navigate(`AllProducts`)}
            />
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.container}
          >
            <View style={styles.productsContainer}>{displayProducts}</View>
            <View style={styles.button}>
              <Button
                title="Shop Now"
                color="green"
                onPress={() => navigation.navigate(`AllProducts`)}
              />
              <Button title="Empty Cart" color="red" onPress={emptyCart} />
            </View>
            <View style={styles.empty_btn}></View>
          </ScrollView>
          <View style={styles.payment_details}>
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>
              Total: {totalPrice.toFixed(2)} &euro;
            </Text>
            <Button
              title="Checkout"
              color="green"
              onPress={() =>
                navigation.navigate(`CheckoutScreen`, { cartData: cartData })
              }
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  productsContainer: {
    backgroundColor: "#eee",
    padding: 20,
  },
  product_card: {
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
    flexDirection: "row",
  },
  product_details: {
    paddingHorizontal: 20,
    width: "100%",
  },
  product_name: {
    fontWeight: "bold",
    width: "80%",
  },
  price: {
    color: "gray",
    paddingTop: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 100,
  },
  message: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shop_btn: {
    marginTop: 20,
  },
  payment_details: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  quantity_control: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qty_btn: {
    width: 25,
  },
  remove_btn: {
    // height: 30,
    padding: 1,
  },
});

export default Cart;
