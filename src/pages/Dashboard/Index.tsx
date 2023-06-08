import React, {useContext, useState} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import {useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from "../../routes/app.routes";

export default function Dashboard(){
    const [number, setNumber] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();


    async function openOrder(){
       if(number === ''){
        return;
       }

       // fazer requisição, abrir a mesa e seguir para proxima tela
       navigation.navigate('Order',{number:number, order_id: '3e9333ee-4c72-4a75-8637-a0ba03f2eca2'})
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput 
            placeholder="Numero da mesa"
            placeholderTextColor="#f0f0f0"
            style={styles.input}
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.textButton}>Abrir mesa</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor:'#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})