import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-web';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [inputItem, setInputItem] = useState('');
  const [data, setData] = useState([]);

  const carregarValor = async () => {
    const loadData = await AsyncStorage.getItem('list');

    if (loadData != null) {
      const obj = JSON.parse(loadData);
      setData(obj);
    }
  };

  const adicionar = async () => {
    try {
      if (inputItem != '') {
        let newItem = {
          id: (Math.random() * 1000).toFixed(0).toString(),
          descricao: inputItem
        }
        data.push(newItem);

        const json = JSON.stringify(data);

        await AsyncStorage.setItem('list', json);
        setInputItem('');
      }
    } catch (e) {
      throw new Error('Erro ao inserir dados');
    }
  };

  useEffect(() => { carregarValor(); }, []);

  const removeItem = async (id) => {
    try {
      const newData = data.filter(item => item.id !== id);
      setData(newData);

      let json = JSON.stringify(newData);
      await AsyncStorage.setItem('list', json);

    } catch (e) {
      throw new Error('Erro ao remover dados');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Login
        </Text>
        <View style={styles.flex}>
          <TextInput
            placeholder="Digite seu username"
            value={inputItem}
            onChangeText={(value) => setInputItem(value)}
            underlineColorAndroid="transparent"
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            onPress={() => adicionar()}
            style={styles.buttonStyle}>
            <Text
              style={styles.buttonTextStyle}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex2}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <Text>
                  {item.descricao}
                </Text>
                <Pressable
                  onPress={() => { removeItem(item.id) }}
                  style={styles.button}>
                  <FontAwesome
                    name="trash-o"
                    size={20}
                    color="#fff" />
                </Pressable>
              </View>
            )} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center'
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 10
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flex2: {
    display: 'flex',
    flexDirection: 'column'
  },
  button:{
    color: 'white'
  },
  flatList:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    display: 'flex'
  },
  flatListItem:{
    color: 'black'
  }
});

export default App;
