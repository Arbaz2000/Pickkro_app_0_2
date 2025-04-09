import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useUserStore } from '../store/userStore';
import { createOrder } from '../services/api';

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
          Locality: pickupLocality
        },
        DeliveryDetails: {
          name: deliveryName,
          address: deliveryAddress,
          Phone: deliveryPhone,
          Locality: deliveryLocality
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
          <TextInput
            style={[styles.textInput, styles.multilineInput]}
            placeholder="Enter full address"
            value={pickupAddress}
            onChangeText={setPickupAddress}
            multiline
            numberOfLines={3}
          />
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
          <TextInput
            style={[styles.textInput, styles.multilineInput]}
            placeholder="Enter full address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
            numberOfLines={3}
          />
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
});
