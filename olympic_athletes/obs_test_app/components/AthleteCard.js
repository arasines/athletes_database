import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AthleteCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={`data:${item.photo.mimeType};base64,${item.photo.thumbnail}`} style={styles.image} />
        <View style={styles.textOverlay}>
        <Text style={styles.title}>{item.fullName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    margin: 8,
    borderRadius: 0,
    backgroundColor: 'lightgray',
    overflow: 'hidden'
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 0,
  },
  textOverlay: {
    position: 'absolute', // Position the overlay absolutely
    bottom: 0, // Position it at the bottom of the card
    left: 0, // Position it at the left of the card
    right: 0, // Position it at the right of the card
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text overlay
    padding: 3 // Add padding to provide some spacing around the text
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    //fontWeight: 'bold',
    color: "white"
  },
});

export default AthleteCard;
