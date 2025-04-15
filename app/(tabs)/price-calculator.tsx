import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import PriceCalculator from '@/components/PriceCalculator';

export default function PriceCalculatorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Price Calculator',
          headerShown: true,
        }} 
      />
      <View style={styles.content}>
        <PriceCalculator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
  },
}); 