import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const ComentariosScreen = ({ route }) => {
  const { id_post } = route.params;
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);

  const id_usuario = 1; // 🔁 Usa el ID real del usuario autenticado

  const obtenerComentarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/posts/${id_post}/comentarios`);
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const enviarComentario = async () => {
    if (!contenido.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/posts/${id_post}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario,
          contenido,
        }),
      });

      if (response.ok) {
        setContenido('');
        obtenerComentarios(); // Actualiza la lista
      } else {
        console.error('Error al enviar comentario');
      }
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>

      {loading ? (
        <Text>Cargando comentarios...</Text>
      ) : (
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.comentario}>
              <Text style={styles.usuario}>Usuario {item.id_usuario}:</Text>
              <Text>{item.contenido}</Text>
            </View>
          )}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Escribe un comentario..."
        value={contenido}
        onChangeText={setContenido}
      />
      <Button title="Enviar" onPress={enviarComentario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  comentario: { marginBottom: 12, backgroundColor: '#eee', padding: 10, borderRadius: 5 },
  usuario: { fontWeight: 'bold' },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 8, marginVertical: 12, borderRadius: 5 },
});

export default ComentariosScreen;
