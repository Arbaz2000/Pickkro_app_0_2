import 'react-native-get-random-values'; // Import the polyfill at the top
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';

const PriceCalculator: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  useEffect(() => {
    if (distance) {
      calculatePrice();
    }
  }, [distance]);

  const calculatePrice = () => {
    const distanceInKm = parseFloat(distance);
    if (distanceInKm <= 3) {
      setPrice(30);
    }
    if (distanceInKm > 3) {
      const cost = Math.round(30 + (distanceInKm - 3) * 7);
      setPrice(cost);
    }
  };

  const calculateRoute = async () => {
    if (!origin || !destination) {
      Alert.alert('Error', 'Please enter both pickup and delivery locations');
      return;
    }
    const simulatedDistance = '10';
    setDistance(simulatedDistance);
    setDuration('15 minutes');
  };

  const handleLocationSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null, isOrigin: boolean) => {
    const placeDescription = data.description;
    if (isOrigin) {
      setOrigin(placeDescription);
    } else {
      setDestination(placeDescription);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Delivery starts from Rs 7/km</Text>

        <View style={[styles.inputContainer, { zIndex: 2 }]}>
          <GooglePlacesAutocomplete
            placeholder="Enter pickup location"
            onPress={(data, details) => handleLocationSelect(data, details, true)}
            query={{
              key: 'AIzaSyCo28ctuRkyNaMItMhh9WshkyEqQmktuT8',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.textInput,
              listView: styles.listView,
              row: styles.row,
            }}
            onFail={error => console.error(error)}
            enablePoweredByContainer={false}
            minLength={2}
            textInputProps={{
              placeholderTextColor: '#666',
            }}
          />
        </View>

        <View style={[styles.inputContainer, { zIndex: 1 }]}>
          <GooglePlacesAutocomplete
            placeholder="Enter delivery location"
            onPress={(data, details) => handleLocationSelect(data, details, false)}
            query={{
              key: 'AIzaSyCo28ctuRkyNaMItMhh9WshkyEqQmktuT8',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.textInput,
              listView: styles.listView,
              row: styles.row,
            }}
            onFail={error => console.error(error)}
            enablePoweredByContainer={false}
            minLength={2}
            textInputProps={{
              placeholderTextColor: '#666',
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={calculateRoute}
        >
          <Text style={styles.buttonText}>Check Prices for Estimates</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>We treat your package as our most precious gift</Text>

        {price !== null && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Estimated charges if parcel weight is less than 10 kg
            </Text>
            <Text style={styles.priceAmount}>₹{price} | Distance: {distance} km</Text>
            {duration && <Text style={styles.durationText}>Estimated time: {duration}</Text>}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  autocompleteContainer: {
    flex: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    zIndex: 1,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  row: {
    padding: 13,
    height: 44,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    color: '#777',
  },
  priceContainer: {
    marginTop: 16,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 16,
    color: '#333',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  durationText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});

export default PriceCalculator;
