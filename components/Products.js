import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "./Header";

function Products({ navigation }) {
  const [products, setProducts] = useState([]);

  const defaultImgSrc =
    "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769";

  useEffect(function () {
    fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleImageError = (event) => {
    event.target.src = defaultImgSrc;
  };

  const displayProducts = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(`AboutProduct`, { productId: item.id })
      }
      key={item.id}
    >
      <View style={styles.card}>
        <View style={styles.product_image}>
          <Image
            source={{ width: 80, height: 80, uri: item.image_link }}
            onError={handleImageError}
          />
        </View>
        <Text style={styles.product_name}>{item.name}</Text>
        <Text style={styles.product_price}>{item.price} &euro;</Text>
        <View style={styles.button}>
          <Button
            title="Add to Cart"
            color="green"
            onPress={() =>
              navigation.navigate(`AboutProduct`, { productId: item.id })
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      <View style={styles.products}>
        <FlatList
          data={products}
          renderItem={displayProducts}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  products: {
    marginTop: 10,
    marginBottom: 100,
  },
  card: {
    borderRadius: 15,
    padding: 5,
    marginVertical: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  product_image: {
    alignItems: "center",
  },
  product_name: {
    fontSize: 15,
    paddingVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  product_price: {
    color: "gray",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "green",
  },
});

export default Products;
