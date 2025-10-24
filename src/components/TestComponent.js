import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestComponent = () => {
  console.log('TestComponent rendering...');
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Component - App is working!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default TestComponent;
