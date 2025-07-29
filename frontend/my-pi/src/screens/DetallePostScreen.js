// src/screens/DetallePostScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import API from '../api/api';
import BotonPrincipal from '../components/BotonPrincipal';

export default function DetallePostScreen({ route }) {
  const { post, id_usuario } = route.params;

  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando] = useState(true);

  const obtenerComentarios = async () => {
    try {
      const res = await API.get(`/posts/${post.id_post}/comentarios`);
      setComentarios(res.data);
    } catch (err) {
      console.error('Error al obtener comentarios', err);
    } finally {
      setCargando(false);
    }
  };

  const enviarComentario = async () => {
    if (!nuevoComentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío');
      return;
    }

    try {
      await API.post(`/posts/${post.id_post}/comentarios`, {
        id_usuario,
        contenido: nuevoComentario,
      });
      setNuevoComentario('');
      obtenerComentarios(); // Recargar la lista
    } catch (error) {
      console.error('Error al enviar comentario', error);
      Alert.alert('Error', 'No se pudo enviar el comentario');
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.comentario}>
      <Text style={styles.texto}>{item.contenido}</Text>
      <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{post.titulo}</Text>
      <Text style={styles.contenido}>{post.contenido}</Text>
      <Text style={styles.subtitulo}>Comentarios:</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id_comentario.toString()}
          renderItem={renderItem}
        />
      )}

      <Text style={styles.escribir}>Escribir un comentario</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu comentario..."
        value={nuevoComentario}
        onChangeText={setNuevoComentario}
        multiline
      />
      <BotonPrincipal titulo="Publicar comentario" onPress={enviarComentario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFC',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E8EDE',
  },
  contenido: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2B4C6F',
  },
  comentario: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  texto: {
    fontSize: 14,
    color: '#333',
  },
  fecha: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },
  escribir: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B4C6F',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
