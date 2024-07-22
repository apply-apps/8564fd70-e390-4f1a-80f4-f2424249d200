// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task) {
            const newTask = {
                id: tasks.length + 1,
                name: task,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTask('');
        }
    };

    const toggleTaskCompletion = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>To-Do List</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Add a new task"
                    value={task}
                    onChangeText={setTask}
                />

                <Button title="Add Task" onPress={addTask} />

                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <View style={styles.taskContainer}>
                            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                                <Text style={item.completed ? styles.taskCompleted : styles.task}>{item.name}</Text>
                            </TouchableOpacity>
                            <Button title="Delete" onPress={() => deleteTask(item.id)} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    taskContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    task: {
        fontSize: 18,
    },
    taskCompleted: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: 'grey',
    },
});