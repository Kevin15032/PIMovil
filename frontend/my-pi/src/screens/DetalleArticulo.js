import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.65:8000'; // Ajusta si cambia

export default function DetalleArticulo({ route }) {
  const { id_articulo } = route.params;

  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await axios.get(`${API_URL}/articulos/${id_articulo}`);
        setArticulo(response.data);
      } catch (err) {
        setError('Error al cargar el artículo.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticulo();
  }, [id_articulo]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{articulo.titulo}</Text>
      <Text style={styles.categoria}>Categoría: {articulo.categoria}</Text>
      <Text style={styles.contenido}>{articulo.contenido}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoria: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#666',
  },
  contenido: {
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
