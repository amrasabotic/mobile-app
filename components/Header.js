import React from "react";
import { Platform, SafeAreaView, StatusBar, Text } from "react-native";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require("../assets/logo1.png")} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text style={styles.header_text}>Amra's Shop</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems : 'center'
  },
  header: {
    height: 50,
    // backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
  },
  header_text: {
    fontFamily: Platform.OS === "ios" ? "Snell Roundhand" : 'Roboto',
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
