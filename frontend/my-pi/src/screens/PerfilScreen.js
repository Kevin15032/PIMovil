import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8000'; 
const USER_ID = 1;

export default function ProfileScreen() {
  const [perfil, setPerfil] = useState({
    nombre: '',
    email: '',
    nivel_estres: 0,
    preferencias: ''
  });

  //  Obtener datos al cargar la pantalla
  useEffect(() => {
    axios.get(`${API_URL}/usuarios/${USER_ID}`)
      .then(res => setPerfil(res.data))
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudo cargar el perfil');
      });
  }, []);

  //  Enviar cambios al backend
  const handleGuardar = () => {
    axios.put(`${API_URL}/usuarios/${USER_ID}`, perfil)
      .then(() => Alert.alert('Guardado', 'Cambios guardados correctamente'))
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudieron guardar los cambios');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil de Usuario</Text>

      <TextInput
        style={styles.input}
        value={perfil.nombre}
        onChangeText={val => setPerfil({ ...perfil, nombre: val })}
        placeholder="Nombre"
      />

      <TextInput
        style={styles.input}
        value={perfil.email}
        onChangeText={val => setPerfil({ ...perfil, email: val })}
        placeholder="Correo"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={String(perfil.nivel_estres)}
        onChangeText={val => setPerfil({ ...perfil, nivel_estres: parseInt(val) })}
        placeholder="Nivel de estrés"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={perfil.preferencias}
        onChangeText={val => setPerfil({ ...perfil, preferencias: val })}
        placeholder="Preferencias"
      />

      <Button title="Guardar Cambios" onPress={handleGuardar} color="#2e7d32" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15
  }
});
