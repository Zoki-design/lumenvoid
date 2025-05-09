import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:5000'; // 👉 өөрийн backend IP-г тохируул

export default function TodoScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      const todoTexts = res.data.map((todo: any) => todo.text);
      setTasks(todoTexts);
    } catch (err) {
      console.error('❌ Todo татах алдаа:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (input.trim()) {
      try {
        await axios.post(`${API_URL}/todos`, { text: input });
        setInput('');
        fetchTodos();
      } catch (err) {
        console.error('❌ Todo нэмэх алдаа:', err);
      }
    }
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{index + 1}. {item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Text style={styles.goBack}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  goBack: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
});
