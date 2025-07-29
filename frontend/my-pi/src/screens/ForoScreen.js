import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/api';
import BotonPrincipal from '../components/BotonPrincipal';

export default function ForoScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioId, setUsuarioId] = useState(null);

  const obtenerPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Error al obtener posts', error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerUsuarioId = async () => {
    const id = await AsyncStorage.getItem('usuario_id');
    if (id) {
      setUsuarioId(parseInt(id));
    } else {
      Alert.alert('Error', 'No se encontró sesión activa');
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    obtenerUsuarioId();
    obtenerPosts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetallePost', { post: item })}
    >
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.contenido}>
        {item.contenido?.substring(0, 100) || 'Sin contenido'}...
      </Text>
      <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Foro Comunitario</Text>

      {usuarioId && (
        <BotonPrincipal
          titulo="Escribir nuevo post"
          onPress={() => navigation.navigate('CrearPost')}
        />
      )}

      {cargando ? (
        <ActivityIndicator size="large" color="#3E8EDE" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id_post.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FA',
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
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E8EDE',
  },
  contenido: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  fecha: {
    marginTop: 8,
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },
});
