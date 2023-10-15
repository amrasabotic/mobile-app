import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../Context/CartContext";
import HeadNav from "./HeadNav";

const Checkout = ({ navigation }) => {
  const { cartCount, cartData } = useContext(CartContext);
  const [orders, setOrder] = useState(cartData);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  });
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  async function handleSubmit() {
    if (
      userData.name === "" ||
      userData.surname === "" ||
      userData.email === "" ||
      userData.phone === "" ||
      userData.address === ""
    ) {
      Alert.alert("Please enter a value", "All the fields must be fullfield.");
    } else {
      setOrder(cartData);
      await AsyncStorage.setItem("cartItems", JSON.stringify([]));
      await AsyncStorage.setItem("orders", JSON.stringify(orders));
      await AsyncStorage.setItem("shippingInfo", JSON.stringify(userData));

      setUserData({});
      Alert.alert(
        "Successfuly ordered!",
        "Congratulation, you have placed the order successfully.",
        [{ text: "Ok", onPress: () => navigation.navigate(`AllProducts`) }]
      );
    }
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <HeadNav />
      </SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Checkout</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            ref={inputRef}
            required={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={userData.surname}
            onChangeText={(text) => handleInputChange("surname", text)}
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={userData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Shipping Address"
            value={userData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            required
          />
          <Button title="Checkout" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white'
  },
});

export default Checkout;
