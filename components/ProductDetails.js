import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeadNav from "./HeadNav";

function ProductDetails({ route }) {
  const [product, setProduct] = useState({});

  useEffect(
    function () {
      const productId = route.params.productId;

      fetch(`http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    },
    [route.params.productId]
  );

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const addToCart = async (product) => {
    let cart = await AsyncStorage.getItem("cartItems");
    let cartItems = JSON.parse(cart) || [];
    let existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      Alert.alert("Added to Cart!", "You have added product to cart.");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <ScrollView>
          <HeadNav />
          <View style={styles.product}>
            <View style={styles.product_image}>
              <Image
                source={{ width: 200, height: 200, uri: product.image_link }}
              />
            </View>
            <View style={styles.product_details}>
              <View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.brand}>Brand: {product.brand}</Text>
                <Text style={styles.price}>{product.price} &euro; </Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>

              <View style={styles.button}>
                <Button
                  title="Add to Cart"
                  color="green"
                  onPress={() => addToCart(product)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  product: {
    flex: 1,
    margin: 10,
  },
  product_image: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 30,
  },
  product_details: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 0,
  },
  brand: {
    marginBottom: 20,
  },
  price: {
    marginBottom: 20,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default ProductDetails;
