
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.gameCard}>
        <Text style={styles.gameName}>{`${item.city} ${item.year}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    marginRight: 16,
  },
  gameName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameCard;
