// src/screens/TestsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import API from '../api/api';

export default function TestsScreen({ navigation }) {
  const [tests, setTests] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerTests = async () => {
    try {
      const res = await API.get('/tests');
      setTests(res.data);
    } catch (error) {
      console.error('Error al obtener tests', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerTests();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('PreguntasTest', { id_test: item.id_test })}
      >
        <Text style={styles.botonTexto}>Iniciar Test</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Tests de Estrés</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={tests}
          keyExtractor={(item) => item.id_test.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4F6',
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
  descripcion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#3E8EDE',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
