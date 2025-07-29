// src/screens/ArticulosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import API from '../api/api';

export default function ArticulosScreen() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerArticulos = async () => {
    try {
      const res = await API.get('/articulos');
      setArticulos(res.data);
    } catch (error) {
      console.error('Error al obtener artículos', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerArticulos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.categoria}>Categoría: {item.categoria || 'General'}</Text>
      <Text style={styles.contenido}>
        {item.contenido?.substring(0, 100) || 'Sin contenido'}...
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Artículos sobre el Estrés</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={articulos}
          keyExtractor={(item) => item.id_articulo.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FC',
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
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E8EDE',
  },
  categoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  contenido: {
    fontSize: 14,
    color: '#333',
  },
});
