import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import ArticulosScreen from '../screens/ArticulosScreen';
import TestsScreen from '../screens/TestsScreen';
import ForoScreen from '../screens/ForoScreen';
import TestPreguntasScreen from '../screens/TestPreguntasScreen'; 
import DetallePostScreen from '../screens/DetallePostScreen';
import CrearPostScreen from '../screens/CrearPostScreen';
import AjustesScreen from '../screens/AjustesScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear cuenta' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
        <Stack.Screen name="Articulos" component={ArticulosScreen} />
        <Stack.Screen name="Tests" component={TestsScreen} />
        <Stack.Screen name="Foro" component={ForoScreen} />
        <Stack.Screen name="PreguntasTest" component={TestPreguntasScreen} options={{ title: 'Preguntas del Test' }} />
        <Stack.Screen name="DetallePost" component={DetallePostScreen} options={{ title: 'Detalle del Post' }} />
        <Stack.Screen name="CrearPost" component={CrearPostScreen} options={{ title: 'Nuevo Post' }} />
        <Stack.Screen name="Ajustes" component={AjustesScreen} options={{ title: 'Ajustes' }} />
        
        



      </Stack.Navigator>
    </NavigationContainer>
  );
}
