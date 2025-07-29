import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ComentarioItem = ({ usuario, comentario }) => (
  <View style={styles.container}>
    <Text style={styles.usuario}>{usuario}</Text>
    <Text style={styles.comentario}>{comentario}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6fa',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  usuario: {
    fontWeight: 'bold',
  },
  comentario: {
    color: '#333',
  },
});

export default ComentarioItem;
