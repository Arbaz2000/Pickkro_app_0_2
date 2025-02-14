import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

export function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(500)}
      style={styles.container}>
      <Text style={styles.title}>Your App Name</Text>
      <Text style={styles.subtitle}>Welcome</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});