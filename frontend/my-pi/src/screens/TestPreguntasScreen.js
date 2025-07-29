// src/screens/TestPreguntasScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import API from '../api/api';

export default function TestPreguntasScreen({ route }) {
  const { id_test } = route.params;
  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerPreguntas = async () => {
    try {
      const res = await API.get(`/tests/${id_test}/preguntas`);
      setPreguntas(res.data);
    } catch (err) {
      console.error('Error al obtener preguntas', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPreguntas();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.numero}>Pregunta {index + 1}</Text>
      <Text style={styles.pregunta}>{item.texto_pregunta}</Text>
      <Text style={styles.opciones}>Opciones: {item.opciones}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Preguntas del Test</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={preguntas}
          keyExtractor={(item) => item.id_pregunta.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
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
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  numero: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 6,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E8EDE',
    marginBottom: 4,
  },
  opciones: {
    fontSize: 14,
    color: '#333',
  },
});
