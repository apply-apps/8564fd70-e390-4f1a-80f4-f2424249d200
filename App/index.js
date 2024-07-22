// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';

const WorkoutDisplay = ({ workouts }) => {
    return (
        <View style={styles.displayContainer}>
            {workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutContainer}>
                    <Text style={styles.workoutName}>{workout.name}</Text>
                    <Text style={styles.exercisesTitle}>Exercises:</Text>
                    {workout.exercises.map((exercise, index) => (
                        <Text key={index} style={styles.exerciseText}>- {exercise.trim()}</Text>
                    ))}
                </View>
            ))}
        </View>
    );
};

const App = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [exercises, setExercises] = useState('');
    const [workouts, setWorkouts] = useState([]);

    const addWorkout = () => {
        if (workoutName && exercises) {
            const newWorkout = {
                id: workouts.length + 1,
                name: workoutName,
                exercises: exercises.split(',')
            };
            setWorkouts([...workouts, newWorkout]);
            setWorkoutName('');
            setExercises('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Workout Tracker</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Workout Name"
                    value={workoutName}
                    onChangeText={setWorkoutName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Exercises (comma separated)"
                    value={exercises}
                    onChangeText={setExercises}
                />

                <Button title="Add Workout" onPress={addWorkout} />

                {workouts.length > 0 && (
                    <WorkoutDisplay workouts={workouts} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

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
    displayContainer: {
        width: '100%',
        marginTop: 20,
    },
    workoutContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 10,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exercisesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exerciseText: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default App;