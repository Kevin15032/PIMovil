// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { registrarUsuario } from '../api/api';
import BotonPrincipal from '../components/BotonPrincipal';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegistro = async () => {
    if (!nombre || !email || !contrasena) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      await registrarUsuario({ nombre, email, contrasena });
      Alert.alert('Éxito', 'Registro exitoso. Ahora puedes iniciar sesión');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar. El correo puede estar en uso.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <BotonPrincipal titulo="Registrarse" onPress={handleRegistro} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión
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
