// src/screens/CrearPostScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/api';
import BotonPrincipal from '../components/BotonPrincipal';

export default function CrearPostScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      const id = await AsyncStorage.getItem('usuario_id');
      if (id) {
        setUsuarioId(parseInt(id));
      } else {
        Alert.alert('Error', 'No se encontró sesión activa.');
        navigation.navigate('Login');
      }
    };
    obtenerIdUsuario();
  }, []);

  const handleCrearPost = async () => {
    if (!titulo || !contenido) {
      Alert.alert('Completa todos los campos');
      return;
    }

    try {
      await API.post('/posts', {
        id_usuario: usuarioId,
        titulo,
        contenido,
      });

      Alert.alert('Éxito', 'Post creado correctamente');
      navigation.goBack(); // Volver al foro
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el post');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear Nuevo Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Título del post"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Contenido"
        value={contenido}
        onChangeText={setContenido}
        multiline
        numberOfLines={6}
      />

      <BotonPrincipal titulo="Publicar" onPress={handleCrearPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFE',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3E8EDE',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
