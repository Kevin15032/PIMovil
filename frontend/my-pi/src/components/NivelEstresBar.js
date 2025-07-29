import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NivelEstresBar = ({ nivel }) => (
  <View style={styles.container}>
    <Text>Nivel de Estrés: {nivel}</Text>
    <View style={[styles.bar, { width: `${nivel}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bar: {
    height: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    marginTop: 4,
  },
});

export default NivelEstresBar;
