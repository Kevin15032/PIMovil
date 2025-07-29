// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUsuario } from '../api/api';
import BotonPrincipal from '../components/BotonPrincipal';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUsuario({ email, contrasena });

      const usuarioId = res.data.usuario_id;

      
      await AsyncStorage.setItem('usuario_id', String(usuarioId));

      Alert.alert('Bienvenido', `ID Usuario: ${usuarioId}`);

      
      navigation.navigate('Home');

    } catch (err) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <BotonPrincipal titulo="Entrar" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  link: {
    marginTop: 10,
    color: '#3E8EDE',
    textAlign: 'center',
  },
});
