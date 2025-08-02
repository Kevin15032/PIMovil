import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import API from '../api/api';
import { useRoute } from '@react-navigation/native';

export default function DetalleEjercicio() {
  const route = useRoute();
  const { id_ejercicio } = route.params;

  const [ejercicio, setEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEjercicio = async () => {
      try {
        const response = await API.get(`/ejercicios/${id_ejercicio}`);
        setEjercicio(response.data);
      } catch (error) {
        console.error('Error al obtener el ejercicio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEjercicio();
  }, [id_ejercicio]);

  const extractYouTubeId = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!ejercicio) {
    return (
      <View style={styles.centered}>
        <Text>No se pudo cargar el ejercicio.</Text>
      </View>
    );
  }

  const videoId = extractYouTubeId(ejercicio.url_video);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{ejercicio.titulo}</Text>
      <Text style={styles.tipo}>Tipo: {ejercicio.tipo}</Text>
      <Text style={styles.descripcion}>{ejercicio.descripcion}</Text>

      {videoId ? (
        <WebView
          style={styles.video}
          javaScriptEnabled
          source={{ uri: embedUrl }}
        />
      ) : (
        <Text style={styles.alerta}>Video no disponible.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D3557',
  },
  tipo: {
    fontSize: 16,
    marginBottom: 5,
    fontStyle: 'italic',
    color: '#457B9D',
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  video: {
    height: 200,
  },
  alerta: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});
