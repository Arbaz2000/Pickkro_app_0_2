import 'react-native-get-random-values'; // Import the polyfill at the top
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';

interface Location {
  description: string;
}

const PriceCalculator: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

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
    <FlatList
      data={[]} // Empty array as we don't need dynamic data for this use case
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.header}>Delivery starts from Rs 7/km</Text>

          <View style={styles.inputContainer}>
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
              }}
              onFail={error => console.error(error)}
              textInputProps={{
                value: origin, // Bind the input value to state
                onChangeText: text => setOrigin(text), // Update the state on text change
              }}
            />
          </View>

          <View style={styles.inputContainer}>
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
              }}
              onFail={error => console.error(error)}
              textInputProps={{
                value: destination, // Bind the input value to state
                onChangeText: text => setDestination(text), // Update the state on text change
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
            </View>
          )}
        </View>
      }
      renderItem={() => null} // We don't need to render any list items dynamically
      scrollEnabled={true} // Ensure the entire content can scroll
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
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
  },
  autocompleteContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
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
});

export default PriceCalculator;

function setDuration(arg0: string) {
  throw new Error('Function not implemented.');
}
