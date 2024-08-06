import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, AsyncStorage } from 'react-native';

export default function Index() {

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const savedList = await AsyncStorage.getItem('shoppingList');
      if (savedList !== null) {
        setList(JSON.parse(savedList));
      }
    } catch (error) {
      console.error('Error loading list:', error);
    }
  };

  const saveList = async (newList) => {
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(newList));
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const addItem = () => {
    const newItem = { key: Math.random().toString(), value: item };
    const newList = [...list, newItem];
    setList(newList);
    saveList(newList);
    setItem('');
  };

  const deleteItem = (key) => {
    const newList = list.filter(item => item.key !== key);
    setList(newList);
    saveList(newList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Add Item" 
        value={item} 
        onChangeText={text => setItem(text)} 
      />
      <Button title="Add" onPress={addItem} />
      <FlatList 
        data={list} 
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.value}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.key)} />
          </View>
        )} 
      />
    </View>
  );
}