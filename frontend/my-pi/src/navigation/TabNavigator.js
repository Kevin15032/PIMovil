// Navegación de pestañas inferiores
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ForoScreen from '../screens/ForoScreen';
// ...importa otras pantallas

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Foro" component={ForoScreen} />
    {/* Agrega más pestañas aquí */}
  </Tab.Navigator>
);

export default TabNavigator;
