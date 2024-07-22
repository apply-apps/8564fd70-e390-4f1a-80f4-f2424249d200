// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const tattoos = [
    { id: '1', image: 'https://picsum.photos/200/300?random=1', artist: 'Artist 1' },
    { id: '2', image: 'https://picsum.photos/200/300?random=2', artist: 'Artist 2' },
    { id: '3', image: 'https://picsum.photos/200/300?random=3', artist: 'Artist 3' },
    // Add more tattoos as needed
];

const TattooGallery = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tattooList, setTattooList] = useState(tattoos);

    useEffect(() => {
        const fetchTattoos = async () => {
            setIsLoading(true);

            // Simulate an API call
            setTimeout(() => {
                setTattooList(tattoos);
                setIsLoading(false);
            }, 2000);
        };

        fetchTattoos();
    }, []);

    const renderTattoo = ({ item }) => (
        <TouchableOpacity style={styles.tattooContainer}>
            <Image source={{ uri: item.image }} style={styles.tattooImage} />
            <Text style={styles.tattooArtist}>{item.artist}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.galleryContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={tattooList}
                    renderItem={renderTattoo}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tattoo Match</Text>
            <TattooGallery />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    galleryContainer: {
        flex: 1,
    },
    list: {
        alignItems: 'center',
    },
    tattooContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    tattooImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    tattooArtist: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});