import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#3498db" />
  </View>
);

export default Loader;
