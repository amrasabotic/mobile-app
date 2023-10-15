import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import HeadNav from "./HeadNav";
import { CartContext } from "../Context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Orders({ navigation }) {
  const { isCartUpdated, setIsCartUpdated } = useContext(CartContext);

  const [isEmpty, setIsEmpty] = useState(true);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setIsEmpty(orders.length === 0);
  }, [orders]);

  useEffect(() => {
    async function getData() {
      try {
        const cart = await AsyncStorage.getItem("orders");
        setOrders(JSON.parse(cart));
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [orders]);

  useEffect(() => {
    async function getUserData() {
      try {
        const cart = await AsyncStorage.getItem("shippingInfo");
        setUserData(JSON.parse(cart));
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }, [userData]);

  const orderedProducts = orders.map((item) => {
    return (
      <View key={item.id} style={styles.product}>
        <Image
          source={{ width: 50, height: 50, uri: item.image_link }}
          style={{ alignSelf: "center" }}
        />
        <View>
          <Text style={{ fontSize: 15 }}>{item.name}</Text>
          <View style={styles.qty}>
            <Text style={{ fontSize: 15 }}>Quantity: {item.quantity}</Text>
            <Text style={{ fontSize: 15 }}>Price: {item.price} &euro;</Text>
          </View>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            Total: {(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <>
      {isEmpty ? (
        <View style={styles.message}>
          <Text style={styles.message_text}>Your don't have any order!</Text>
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
        <ScrollView style={{ backgroundColor: "white" }}>
          <View>
            <Text
              style={{ fontSize: 20, textAlign: "center", paddingVertical: 10, fontWeight: 'bold' }}
            >
              Your Order Informations
            </Text>
          </View>
          <View style={styles.shipping_info}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
             Shipping Informations
            </Text>
            <Text style={styles.text_white}>
              Full Name:{" "}
              <Text style={styles.text_bold}>
                {userData.name} {userData.surname}
              </Text>
            </Text>
            <Text style={styles.text_white}>
              Email: <Text style={styles.text_bold}>{userData.email}</Text>
            </Text>
            <Text style={styles.text_white}>
              Phone number:{" "}
              <Text style={styles.text_bold}>{userData.phone}</Text>
            </Text>
            <Text style={styles.text_white}>
              Shipping Address:{" "}
              <Text style={styles.text_bold}>{userData.address}</Text>
            </Text>
          </View>
          <View style={styles.ordered_products}>
            <Text
              style={{ fontSize: 20, textAlign: "center", paddingVertical: 10 }}
            >
              Ordered Products
            </Text>
            {orderedProducts}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  shipping_info: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingBottom: 20,
    margin: 20,
    borderRadius: 10,
  },
  ordered_products: {
    backgroundColor: "white",
    padding: 20,
  },
  product: {
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "#eee",
  },
  qty: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text_bold: {
    fontWeight: "bold",
  },
  text_white: {
    color: "white",
    fontSize: 15,
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
});

export default Orders;
