import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/ui/Button';

export default function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedState, setSelectedState] = useState('');

  const states = ['Delhi', 'Mumbai', 'Bangalore'];

  const handleGetStarted = () => {
    if (selectedState) {
      router.replace('/auth');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Fast Delivery at Your Doorstep</Text>
      </View>

      <Image
        source={require('../assets/images/SplashImage.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      <View style={styles.selectionContainer}>
        <Text style={styles.sectionTitle}>Select Language</Text>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'English' && styles.selectedButton,
            ]}
            onPress={() => setSelectedLanguage('English')}>
            <View style={styles.languageButtonContent}>
              <Image
                source={
                  selectedLanguage === 'English'
                    ? require('../assets/icon/english-white.png')
                    : require('../assets/icon/english.png')
                }
                style={styles.languageIcon}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === 'English' && styles.selectedText,
                ]}>
                English
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'हिंदी' && styles.selectedButton,
            ]}
            onPress={() => setSelectedLanguage('हिंदी')}>
            <View style={styles.languageButtonContent}>
              <Image
                source={
                  selectedLanguage === 'हिंदी'
                    ? require('../assets/icon/hindi-white.png')
                    : require('../assets/icon/hindi.png')
                }
                style={styles.languageIcon}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === 'हिंदी' && styles.selectedText,
                ]}>
                हिंदी
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Select Your State</Text>
        <View style={styles.stateContainer}>
          {states.map((state) => (
            <TouchableOpacity
              key={state}
              style={[
                styles.stateButton,
                selectedState === state && styles.selectedButton,
              ]}
              onPress={() => setSelectedState(state)}>
              <View style={styles.stateButtonContent}>
                <Image
                  source={
                    selectedState === state
                      ? require('../assets/icon/picklocation-white.png')
                      : require('../assets/icon/picklocation.png')
                  }
                  style={styles.stateIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.stateText,
                    selectedState === state && styles.selectedText,
                  ]}>
                  {state}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button
        title="Get Started"
        onPress={handleGetStarted}
        disabled={!selectedState}
        style={styles.getStartedButton}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>About</Text>
        <Text style={styles.footerDot}>•</Text>
        <Text style={styles.footerText}>Contact</Text>
        <Text style={styles.footerDot}>•</Text>
        <Text style={styles.footerText}>Help</Text>
      </View>
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    bottom: 40,
  },
  illustration: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    bottom: 50,
  },
  selectionContainer: {
    marginBottom: 20,
    bottom: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  languageContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  languageButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center', // moved here from the loose declaration
  },
  languageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  languageIcon: {
    width: 24,
    height: 24,
  },
  // Remove the loose "alignItems: 'center'" line
  stateContainer: {
    gap: 12,
  },
  stateButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  stateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stateIcon: {
    width: 20,
    height: 20,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  stateText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  getStartedButton: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerDot: {
    color: '#666',
    marginHorizontal: 8,
  },
  version: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});