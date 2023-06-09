import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { Feather } from "@expo/vector-icons";
import { ModalPicker } from "../../components/ModalPicker/Index";
import { ListItem } from "../../components/ListItem";


type RouteDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;


type ProductProps = {
    id: string;
    name: string;
}

type ItemProps ={
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]); 


  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [pruductSelected, setProductSelected] = useState<ProductProps| undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);


  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)


  useEffect(() => {
    async function loadingInfo() {
      const response = await api.get("/category");

      //console.log(response.data)

      setCategory(response.data);
      setCategorySelected(response.data['0']);
    }
    loadingInfo();
  }, []);


  useEffect(() =>{
    async function loadProducts(){
        const response = await api.get('/category/products',{
            params:{
                category_id: categorySelected?.id
            }
        })
        setProducts(response.data);
        setProductSelected(response.data[0])
    }
    loadProducts();
  },[categorySelected])

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeCategory(item:CategoryProps){
    setCategorySelected(item);
    console.log(item)
  }

   function handlechangeProduct(item:ProductProps){
    setProductSelected(item)
  }


  async function handleAdd(){
    const response = api.post('/order/add',{
      order_id: route.params.order_id,
      product_id:pruductSelected?.id,
      amount: Number(amount)
    })
    let data = {
      id: response.data.id,
      product_id:pruductSelected?.id as string,
      name: pruductSelected?.name as string,
      amount: amount
    }

    setItems(oldArray => [...oldArray, data])
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash-2" size={25} color="#ff3f4b" />
        </TouchableOpacity>
      </View>
      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: "#fff" }}>
                {categorySelected?.name}
            </Text>
        </TouchableOpacity>
      )}

     {products.length !== 0 &&(
         <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
         <Text style={{ color: "#fff" }}>
            {setProductSelected?.name}
         </Text>
       </TouchableOpacity>
     )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade:</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonItem, {opacity: items.length === 0 ? 0.3 : 1}]} 
        disabled={items.length === 0}
        >

          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

      </View>

        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginTop: 24}}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =><ListItem data={item} />}
        
        />


      <Modal 
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
        >
            <ModalPicker
                handleCloseModal={() => setModalCategoryVisible(false)}
                options={category}
                selectedItem={handleChangeCategory}
            />
      </Modal>
      <Modal
      transparent={true}
      visible={modalProductVisible}
      animationType="fade"
      >
          <ModalPicker
                handleCloseModal={() => setModalProductVisible(false)}
                options={products}
                selectedItem={handlechangeProduct}
            />

      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonItem: {
    width: '75%',
    backgroundColor: '#3fffa3',
    borderBottomColor: 4,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
