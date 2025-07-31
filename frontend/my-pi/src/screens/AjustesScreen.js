import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AjustesScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const cerrarSesion = async () => {
    await AsyncStorage.clear();
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    navigation.replace('Login');
  };

  const irALogin = () => {
    navigation.navigate('Login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: darkMode ? '#ffffff' : '#000000',
    },
    setting: {
      marginVertical: 10,
    },
    buttonText: {
      color: darkMode ? '#ffffff' : '#000000',
    },
    contact: {
      marginTop: 30,
    },
    contactText: {
      color: darkMode ? '#cccccc' : '#333333',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <View style={styles.setting}>
        <Text style={styles.buttonText}>Modo oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <View style={styles.setting}>
        <Button title="Cerrar sesión" onPress={cerrarSesion} color={darkMode ? '#444' : undefined} />
      </View>

      <View style={styles.setting}>
        <Button title="Ir a Login" onPress={irALogin} color={darkMode ? '#444' : undefined} />
      </View>

      <View style={styles.contact}>
        <Text style={styles.contactText}>Contacto: soporte@estrescero.com</Text>
        <Text style={styles.contactText}>Instagram: @estres_cero_app</Text>
      </View>
    </View>
  );
};

export default AjustesScreen;
