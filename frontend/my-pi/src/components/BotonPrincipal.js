// src/components/BotonPrincipal.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonPrincipal({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#3E8EDE',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
