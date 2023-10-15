import React, {useContext} from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CartContext } from '../Context/CartContext';

const HeadNav = () => {
  const navigation = useNavigation();
  const { cartCount } = useContext(CartContext);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon name="arrow-back" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
      <Text>{cartCount}</Text>
        <Icon
          name="shopping-cart"
          size={30}
          onPress={() => navigation.navigate(`Cart`)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

export default HeadNav;
