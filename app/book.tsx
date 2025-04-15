import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useUserStore } from '../store/userStore';
import { createOrder } from '../services/api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

// Define location type
interface LocationType {
  latitude: number;
  longitude: number;
}

export default function Book() {
  const packageTypes = [
    'Food',
    'Grocery',
    'Documents',
    'Electronics',
    'Clothes',
    'Medicine',
    'Gift',
    'Office Goods',
    'Other'
  ];
  const weightOptions = ['Up to 5 kg', '5-10 kg', '10-15 kg', '15-20 kg'];
  const paymentTypes = ['cash on delivery', 'online payment'];

  // Add state variables
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('cash on delivery');
  const [parcelValue, setParcelValue] = useState('');
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Pickup details
  const [pickupName, setPickupName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupPhone, setPickupPhone] = useState('');
  const [pickupLocality, setPickupLocality] = useState('');
  
  // Delivery details
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryLocality, setDeliveryLocality] = useState('');
  
  // Time and date
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [meridian, setMeridian] = useState('AM');
  const [date, setDate] = useState('');
  
  // Instructions
  const [instruction, setInstruction] = useState('');
  
  // Location state
  const [pickupLocation, setPickupLocation] = useState<LocationType | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<LocationType | null>(null);
  const [userLocation, setUserLocation] = useState<LocationType | null>(null);
  
  // Map state
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [selectedLocationType, setSelectedLocationType] = useState<'pickup' | 'delivery'>('pickup');
  
  // Tooltip state
  const [showPickupTooltip, setShowPickupTooltip] = useState(false);
  const [showDeliveryTooltip, setShowDeliveryTooltip] = useState(false);
  
  // Map refs
  const pickupMapRef = useRef<MapView>(null);
  const deliveryMapRef = useRef<MapView>(null);
  
  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    setDate(formattedDate);
  }, []);
  
  // Calculate price based on package type and weight
  useEffect(() => {
    let basePrice = 0;
    
    // Base price by package type
    switch(selectedPackage) {
      case 'Food':
        basePrice = 50;
        break;
      case 'Grocery':
        basePrice = 70;
        break;
      case 'Documents':
        basePrice = 40;
        break;
      case 'Electronics':
        basePrice = 100;
        break;
      case 'Clothes':
        basePrice = 60;
        break;
      case 'Medicine':
        basePrice = 80;
        break;
      case 'Gift':
        basePrice = 90;
        break;
      case 'Office Goods':
        basePrice = 85;
        break;
      case 'Other':
        basePrice = 75;
        break;
      default:
        basePrice = 0;
    }
    
    // Add weight factor
    let weightFactor = 1;
    switch(selectedWeight) {
      case 'Up to 5 kg':
        weightFactor = 1;
        break;
      case '5-10 kg':
        weightFactor = 1.5;
        break;
      case '10-15 kg':
        weightFactor = 2;
        break;
      case '15-20 kg':
        weightFactor = 2.5;
        break;
    }
    
    setPrice(Math.round(basePrice * weightFactor));
  }, [selectedPackage, selectedWeight]);

  // Get user's current location
  useEffect(() => {
    (async () => {
      console.log("Requesting location permissions...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status);
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      console.log("Getting current position...");
      let location = await Location.getCurrentPositionAsync({});
      console.log("Current position:", location);
      
      const userLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log("User location set to:", userLoc);
      setUserLocation(userLoc);
      
      // Set initial map region to user's location
      if (pickupMapRef.current) {
        pickupMapRef.current.animateToRegion({
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      
      if (deliveryMapRef.current) {
        deliveryMapRef.current.animateToRegion({
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      
      // Get address for current location and set as pickup address
      try {
        console.log("Reverse geocoding current location...");
        const result = await Location.reverseGeocodeAsync({
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
        });
        console.log("Reverse geocoding result:", result);
        
        if (result.length > 0) {
          const address = result[0];
          const formattedAddress = [
            address.street,
            address.name,
            address.district,
            address.city,
            address.region,
            address.country,
          ]
            .filter(Boolean)
            .join(', ');
            
          console.log("Setting pickup address to:", formattedAddress);
          setPickupAddress(formattedAddress);
          setPickupLocation(userLoc);
        } else {
          console.log("No address found for current location");
        }
      } catch (error) {
        console.error('Error getting address for current location:', error);
      }
    })();
  }, []);

  // Handle map marker press
  const handleMapMarkerPress = (location: LocationType) => {
    setSelectedLocation(location);
    
    // Get address from coordinates using reverse geocoding
    Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude,
    }).then((result) => {
      if (result.length > 0) {
        const address = result[0];
        const formattedAddress = [
          address.street,
          address.name,
          address.district,
          address.city,
          address.region,
          address.country,
        ]
          .filter(Boolean)
          .join(', ');
          
        if (selectedLocationType === 'pickup') {
          setPickupAddress(formattedAddress);
          setPickupLocation(location);
        } else {
          setDeliveryAddress(formattedAddress);
          setDeliveryLocation(location);
        }
      }
    });
  };

  // Handle map selection confirmation
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      if (selectedLocationType === 'pickup') {
        setPickupLocation(selectedLocation);
        setShowPickupMap(false);
      } else {
        setDeliveryLocation(selectedLocation);
        setShowDeliveryMap(false);
      }
    }
  };

  // Check if all required fields are filled
  const isFormComplete = 
    selectedPackage && 
    selectedWeight && 
    pickupName && 
    pickupAddress && 
    pickupPhone && 
    pickupLocality && 
    deliveryName && 
    deliveryAddress && 
    deliveryPhone && 
    deliveryLocality;

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormComplete) {
      Alert.alert('Incomplete Form', 'Please fill all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Get user phone from Zustand store
      const userPhoneFromStore = useUserStore.getState().phoneNumber;
      console.log('User phone from Zustand store:', userPhoneFromStore);
      
      const orderData = {
        userPhone: userPhoneFromStore || '',
        Item: selectedPackage,
        weight: selectedWeight,
        parcelValue: parcelValue || '',
        price: price,
        paymentType: selectedPaymentType,
        PickupDetails: {
          name: pickupName,
          address: pickupAddress,
          Phone: pickupPhone,
          Locality: pickupLocality,
          location: pickupLocation
        },
        DeliveryDetails: {
          name: deliveryName,
          address: deliveryAddress,
          Phone: deliveryPhone,
          Locality: deliveryLocality,
          location: deliveryLocation
        },
        Time: {
          hours: hours,
          minutes: minutes,
          meridian: meridian
        },
        instruction: instruction || '',
        Date: date
      };
      
      console.log('Submitting order with data:', orderData);
      
      const result = await createOrder(orderData);
      console.log('Order created successfully. Response:', result);
      
      // Show success message
      Alert.alert(
        'Order Created', 
        'Your order has been created successfully!', 
        [
          {
            text: 'OK',
            onPress: () => router.push('/payment-details')
          }
        ]
      );
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert(
        'Error', 
        'Failed to create order. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => setLoading(false)
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a function to use current location for pickup
  const useCurrentLocationForPickup = async () => {
    console.log("Use current location button pressed");
    if (userLocation) {
      console.log("User location available:", userLocation);
      setSelectedLocation(userLocation);
      
      try {
        console.log("Reverse geocoding user location...");
        const result = await Location.reverseGeocodeAsync({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
        console.log("Reverse geocoding result:", result);
        
        if (result.length > 0) {
          const address = result[0];
          const formattedAddress = [
            address.street,
            address.name,
            address.district,
            address.city,
            address.region,
            address.country,
          ]
            .filter(Boolean)
            .join(', ');
            
          console.log("Setting pickup address to:", formattedAddress);
          setPickupAddress(formattedAddress);
          setPickupLocation(userLocation);
          
          // Show a confirmation alert
          Alert.alert('Location Set', 'Your current location has been set as the pickup address.');
        } else {
          console.log("No address found for user location");
          Alert.alert('Address Not Found', 'Could not find an address for your current location.');
        }
      } catch (error) {
        console.error('Error getting address for current location:', error);
        Alert.alert('Error', 'Failed to get address for your current location.');
      }
    } else {
      console.log("User location not available");
      Alert.alert('Location Not Available', 'Unable to get your current location. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Order</Text>
      </View>
      
      {/* Package Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Package Details</Text>
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Package Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedPackage}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedPackage(itemValue);
              }}
            >
              <Picker.Item label="Select package type" value="" style={styles.pickerItem} />
              {packageTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Weight</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedWeight}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedWeight(itemValue);
              }}
            >
              <Picker.Item label="Select weight" value="" style={styles.pickerItem} />
              {weightOptions.map((weight) => (
                <Picker.Item key={weight} label={weight} value={weight} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Payment Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedPaymentType}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedPaymentType(itemValue);
              }}
            >
              {paymentTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Parcel Value (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter parcel value"
            value={parcelValue}
            onChangeText={setParcelValue}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Estimated Price:</Text>
          <Text style={styles.priceValue}>₹{price}</Text>
        </View>
      </View>
      
      {/* Pickup Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact name"
            value={pickupName}
            onChangeText={setPickupName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact number"
            value={pickupPhone}
            onChangeText={setPickupPhone}
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address</Text>
          <View style={styles.addressContainer}>
            <View style={styles.addressInputContainer}>
              {pickupAddress ? (
                <View style={styles.addressDisplayContainer}>
                  <Text style={styles.addressDisplayText}>{pickupAddress}</Text>
                  <TouchableOpacity 
                    style={styles.editAddressButton}
                    onPress={() => setPickupAddress('')}
                  >
                    <Ionicons name="create-outline" size={18} color="#1E88E5" />
                  </TouchableOpacity>
                </View>
              ) : (
                <GooglePlacesAutocomplete
                  placeholder="Search pickup location"
                  onPress={(data, details = null) => {
                    console.log("Place selected:", data);
                    setPickupAddress(data.description);
                    if (details) {
                      console.log("Place details:", details);
                      setPickupLocation({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                      });
                    }
                  }}
                  query={{
                    key: 'AIzaSyCo28ctuRkyNaMItMhh9WshkyEqQmktuT8',
                    language: 'en',
                  }}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    textInput: {
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#1E88E5',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      fontSize: 14,
                      backgroundColor: '#fff',
                    },
                    listView: {
                      borderWidth: 1,
                      borderColor: '#1E88E5',
                      borderRadius: 8,
                      backgroundColor: '#fff',
                    },
                    row: {
                      padding: 13,
                      height: 'auto',
                      minHeight: 44,
                    },
                  }}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={300}
                  minLength={2}
                  listViewDisplayed="auto"
                />
              )}
            </View>
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => {
                setSelectedLocationType('pickup');
                setSelectedLocation(pickupLocation);
                setShowPickupMap(true);
              }}
            >
              <Ionicons name="map" size={24} color="#1E88E5" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.currentLocationButton}
            onPress={useCurrentLocationForPickup}
          >
            <Ionicons name="location" size={16} color="#1E88E5" />
            <Text style={styles.currentLocationText}>Use Current Location</Text>
          </TouchableOpacity>
          
          {/* Tooltip for current location */}
          {pickupLocation && (
            <TouchableOpacity 
              style={styles.locationInfoButton}
              onPress={() => setShowPickupTooltip(!showPickupTooltip)}
            >
              <Ionicons name="information-circle" size={16} color="#1E88E5" />
              <Text style={styles.locationInfoText}>Location Info</Text>
            </TouchableOpacity>
          )}
          
          {showPickupTooltip && pickupLocation && (
            <View style={styles.tooltipContainer}>
              <Text style={styles.tooltipText}>
                Latitude: {pickupLocation.latitude.toFixed(6)}
              </Text>
              <Text style={styles.tooltipText}>
                Longitude: {pickupLocation.longitude.toFixed(6)}
              </Text>
              <Text style={styles.tooltipText}>
                {pickupLocation === userLocation ? "Current Location" : "Selected Location"}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Locality</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter locality"
            value={pickupLocality}
            onChangeText={setPickupLocality}
          />
        </View>
      </View>
      
      {/* Drop-off Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drop-off Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact name"
            value={deliveryName}
            onChangeText={setDeliveryName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact number"
            value={deliveryPhone}
            onChangeText={setDeliveryPhone}
            keyboardType="phone-pad"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address</Text>
          <View style={styles.addressContainer}>
            <View style={styles.addressInputContainer}>
              {deliveryAddress ? (
                <View style={styles.addressDisplayContainer}>
                  <Text style={styles.addressDisplayText}>{deliveryAddress}</Text>
                  <TouchableOpacity 
                    style={styles.editAddressButton}
                    onPress={() => setDeliveryAddress('')}
                  >
                    <Ionicons name="create-outline" size={18} color="#1E88E5" />
                  </TouchableOpacity>
                </View>
              ) : (
                <GooglePlacesAutocomplete
                  placeholder="Search delivery location"
                  onPress={(data, details = null) => {
                    setDeliveryAddress(data.description);
                    if (details) {
                      setDeliveryLocation({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                      });
                    }
                  }}
                  query={{
                    key: 'AIzaSyCo28ctuRkyNaMItMhh9WshkyEqQmktuT8',
                    language: 'en',
                  }}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    textInput: {
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#1E88E5',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      fontSize: 14,
                      backgroundColor: '#fff',
                    },
                    listView: {
                      borderWidth: 1,
                      borderColor: '#1E88E5',
                      borderRadius: 8,
                      backgroundColor: '#fff',
                    },
                    row: {
                      padding: 13,
                      height: 'auto',
                      minHeight: 44,
                    },
                  }}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={300}
                  minLength={2}
                  listViewDisplayed="auto"
                />
              )}
            </View>
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => {
                setSelectedLocationType('delivery');
                setSelectedLocation(deliveryLocation);
                setShowDeliveryMap(true);
              }}
            >
              <Ionicons name="map" size={24} color="#1E88E5" />
            </TouchableOpacity>
          </View>
          
          {/* Tooltip for delivery location */}
          {deliveryLocation && (
            <TouchableOpacity 
              style={styles.locationInfoButton}
              onPress={() => setShowDeliveryTooltip(!showDeliveryTooltip)}
            >
              <Ionicons name="information-circle" size={16} color="#1E88E5" />
              <Text style={styles.locationInfoText}>Location Info</Text>
            </TouchableOpacity>
          )}
          
          {showDeliveryTooltip && deliveryLocation && (
            <View style={styles.tooltipContainer}>
              <Text style={styles.tooltipText}>
                Latitude: {deliveryLocation.latitude.toFixed(6)}
              </Text>
              <Text style={styles.tooltipText}>
                Longitude: {deliveryLocation.longitude.toFixed(6)}
              </Text>
              <Text style={styles.tooltipText}>
                {deliveryLocation === userLocation ? "Current Location" : "Selected Location"}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Locality</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter locality"
            value={deliveryLocality}
            onChangeText={setDeliveryLocality}
          />
        </View>
      </View>
      
      {/* Time and Date Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Time & Date</Text>
        
        <View style={styles.timeContainer}>
          <View style={styles.timePickerContainer}>
            <Text style={styles.timeLabel}>Hours</Text>
            <Picker
              selectedValue={hours}
              style={styles.timePicker}
              onValueChange={(itemValue) => setHours(itemValue)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <Picker.Item key={hour} label={hour.toString()} value={hour} />
              ))}
            </Picker>
          </View>
          
          <View style={styles.timePickerContainer}>
            <Text style={styles.timeLabel}>Minutes</Text>
            <Picker
              selectedValue={minutes}
              style={styles.timePicker}
              onValueChange={(itemValue) => setMinutes(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <Picker.Item 
                  key={minute} 
                  label={minute.toString().padStart(2, '0')} 
                  value={minute} 
                />
              ))}
            </Picker>
          </View>
          
          <View style={styles.timePickerContainer}>
            <Text style={styles.timeLabel}>AM/PM</Text>
            <Picker
              selectedValue={meridian}
              style={styles.timePicker}
              onValueChange={(itemValue) => setMeridian(itemValue)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Select date"
            value={date}
            onChangeText={setDate}
            editable={false}
          />
        </View>
      </View>
      
      {/* Instructions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Instructions</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, styles.multilineInput]}
            placeholder="Enter any special instructions"
            value={instruction}
            onChangeText={setInstruction}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>
      
      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, !isFormComplete && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!isFormComplete || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Proceed to Payment</Text>
        )}
      </TouchableOpacity>
      
      {/* Map Modal for Pickup Location */}
      <Modal
        visible={showPickupMap}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPickupMap(false)}
      >
        <View style={styles.mapModalContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Select Pickup Location</Text>
            <TouchableOpacity onPress={() => setShowPickupMap(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <MapView
            ref={pickupMapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            } : undefined}
            onPress={(e) => handleMapMarkerPress(e.nativeEvent.coordinate)}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Your Location"
                pinColor="blue"
              />
            )}
            {selectedLocation && selectedLocation !== userLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Selected Location"
                pinColor="red"
              />
            )}
          </MapView>
          
          <View style={styles.mapFooter}>
            <TouchableOpacity 
              style={styles.currentLocationMapButton}
              onPress={() => {
                if (userLocation) {
                  handleMapMarkerPress(userLocation);
                }
              }}
            >
              <Ionicons name="location" size={20} color="#fff" />
              <Text style={styles.currentLocationMapButtonText}>Use Current Location</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirmLocation}
            >
              <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Map Modal for Delivery Location */}
      <Modal
        visible={showDeliveryMap}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowDeliveryMap(false)}
      >
        <View style={styles.mapModalContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Select Delivery Location</Text>
            <TouchableOpacity onPress={() => setShowDeliveryMap(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <MapView
            ref={deliveryMapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            } : undefined}
            onPress={(e) => handleMapMarkerPress(e.nativeEvent.coordinate)}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Selected Location"
              />
            )}
          </MapView>
          
          <View style={styles.mapFooter}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirmLocation}
            >
              <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    padding: 20,
  },
  header: {
    marginBottom: 25,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  pickerContainer: {
    marginBottom: 18,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0052CC',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
  },
  pickerItem: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: '#1E88E5',
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 15,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0052CC',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0052CC',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timePickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0052CC',
    marginBottom: 8,
    textAlign: 'center',
  },
  timePicker: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInputContainer: {
    flex: 1,
  },
  mapButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mapModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  mapFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
  },
  currentLocationText: {
    color: '#1E88E5',
    marginLeft: 4,
    fontSize: 14,
  },
  currentLocationMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  currentLocationMapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  currentAddressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E88E5',
  },
  currentAddressLabel: {
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 4,
  },
  currentAddressText: {
    color: '#333',
  },
  locationInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
  },
  locationInfoText: {
    color: '#1E88E5',
    marginLeft: 4,
    fontSize: 14,
  },
  tooltipContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E88E5',
    marginTop: 5,
  },
  tooltipText: {
    color: '#333',
    fontSize: 12,
    marginBottom: 4,
  },
  addressDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  addressDisplayText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  editAddressButton: {
    padding: 5,
  },
});
