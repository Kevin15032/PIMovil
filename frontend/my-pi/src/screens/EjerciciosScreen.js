// src/screens/EjerciciosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import API from '../api/api';

export default function EjerciciosScreen() {
  const [ejercicios, setEjercicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEjercicios = async () => {
    try {
      const res = await API.get('/ejercicios');
      setEjercicios(res.data);
    } catch (error) {
      console.error('Error al obtener ejercicios', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEjercicios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.tipo}>{item.tipo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Ejercicios de Relajación</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={ejercicios}
          keyExtractor={(item) => item.id_ejercicio.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F0F6',
    padding: 16,
  },
  encabezado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B4C6F',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E8EDE',
  },
  tipo: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: '#333',
  },
});
