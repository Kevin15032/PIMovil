// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BotonPrincipal from '../components/BotonPrincipal';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Bienvenido a Estrés Cero</Text>
      <Image
        source={require('../../assets/logo.png')} 
        style={styles.imagen}
      />

      <BotonPrincipal titulo="Ejercicios de Relajación" onPress={() => navigation.navigate('Ejercicios')} />
      <BotonPrincipal titulo="Artículos y Consejos" onPress={() => navigation.navigate('Articulos')} />
      <BotonPrincipal titulo="Test de Estrés" onPress={() => navigation.navigate('Tests')} />
      <BotonPrincipal titulo="Foro y Comunidad" onPress={() => navigation.navigate('Foro')} />

      <Text style={styles.firma}>Cuidar tu mente también es avanzar ✨</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4C6F',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagen: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  firma: {
    marginTop: 40,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
});
