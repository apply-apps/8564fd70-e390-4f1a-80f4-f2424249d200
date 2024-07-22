// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FairyTaleDisplay = ({ story }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.storyText}>{story}</Text>
        </View>
    );
};

export default function App() {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateFairyTale = async () => {
        setLoading(true);
        setStory(null);

        try {
            const messages = [
                { role: 'system', content: 'You are a helpful assistant. Create a fairy tale based on given heroes, villains, and plot.' },
                { role: 'user', content: `Heroes: ${heroes}` },
                { role: 'user', content: `Villains: ${villains}` },
                { role: 'user', content: `Plot: ${plot}` }
            ];

            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: messages,
                model: 'gpt-4o'
            });

            const resultString = response.data.response;
            setStory(resultString);
        } catch (error) {
            console.error('Error generating fairy tale:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Heroes"
                    value={heroes}
                    onChangeText={setHeroes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villains"
                    value={villains}
                    onChangeText={setVillains}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />

                <Button title="Generate Fairy Tale" onPress={generateFairyTale} />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}

                {story && (
                    <FairyTaleDisplay story={story} />
                )}
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
    storyText: {
        fontSize: 16,
        lineHeight: 24,
    },
});