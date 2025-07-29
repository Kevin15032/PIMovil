import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostItem = ({ usuario, contenido }) => (
  <View style={styles.container}>
    <Text style={styles.usuario}>{usuario}</Text>
    <Text style={styles.contenido}>{contenido}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  usuario: {
    fontWeight: 'bold',
  },
  contenido: {
    color: '#333',
  },
});

export default PostItem;
