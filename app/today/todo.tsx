import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'http://192.168.88.92:5000';

interface Todo {
  _id: string;
  text: string;
  createdAt: string;
  completed: boolean;
}

export default function TodoScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<string>('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTasks(res.data);
    } catch (err) {
      console.error('❌ Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(() => {
      setTasks((prevTasks) => [...prevTasks]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addTask = async () => {
    if (input.trim()) {
      try {
        await axios.post(`${API_URL}/todos`, { text: input });
        setInput('');
        fetchTodos();
      } catch (err) {
        console.error('❌ Error adding todo:', err);
      }
    }
  };

  const editTask = (id: string, currentText: string) => {
    setEditText(currentText);
    setEditTodoId(id);
    setModalVisible(true);
  };

  const saveEditedTask = async () => {
    if (editText.trim() !== '') {
      try {
        await axios.put(`${API_URL}/todos/${editTodoId}`, { text: editText });
        fetchTodos();
        setModalVisible(false);
      } catch (err) {
        console.error('❌ Error editing todo:', err);
      }
    } else {
      Alert.alert('Error', 'Todo text cannot be empty!');
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (err) {
      console.error('❌ Error toggling completion:', err);
    }
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/todos/${id}`);
            fetchTodos();
          } catch (err) {
            console.error('❌ Error deleting todo:', err);
          }
        },
      },
    ]);
  };

  const timeAgo = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / (3600 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.text}</Text>
      <Text style={styles.timeAgo}>{timeAgo(item.createdAt)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => editTask(item._id, item.text)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item._id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleComplete(item._id, item.completed)}>
          <Text style={styles.completeButton}>{item.completed ? 'Undo' : 'Complete'}</Text>
        </TouchableOpacity>
      </View>
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Text style={styles.goBack}>← Back to Home</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
            />
            <TouchableOpacity onPress={saveEditedTask} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  timeAgo: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  completeButton: {
    color: 'green',
  },
  list: {
    paddingBottom: 20,
  },
  goBack: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});