import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

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

  // Add state variables
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [hasPickupDetails, setHasPickupDetails] = useState(false);
  const [hasDropoffDetails, setHasDropoffDetails] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [DropcontactName, setDropContactName] = useState('');
  const [DropcontactNumber, setDropContactNumber] = useState('');
  const [currentDateTime] = useState(new Date().toLocaleString());

  // Check if all fields are filled
  const isFormComplete =
    selectedPackage && selectedWeight && hasPickupDetails && hasDropoffDetails;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Order</Text>
        <View style={styles.locationContainer}>
          <Text>Current Location</Text>
        </View>
      </View>
      <Text style={styles.dateTimeText}>{currentDateTime}</Text>
      {/* Pickup Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Details</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact name"
            value={contactName}
            onChangeText={setContactName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+ Add</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
          </View>
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
            value={DropcontactName}
            onChangeText={setDropContactName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter contact number"
            value={DropcontactNumber}
            onChangeText={setDropContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>+ Add Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.buttonText}>Open Map</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+ Add Another Drop-off</Text>
          </TouchableOpacity>
        </View>
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
        // Replace the Show Amount button code with this
        <TouchableOpacity
          style={[styles.showAmountButton, styles.enabledButton]}
          onPress={() => {
            router.push('/payment-details');
          }}
        >
          <Text style={styles.enabledButtonText}>Show Amount</Text>
        </TouchableOpacity>
      </View>
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
  locationContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 20,
    marginRight: 5,
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
  addButton: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 0,
    alignItems: 'center',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 5,
    gap: 10,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    right: 0,
  },
  mapButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 5,
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
  showAmountButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 5,
  },
  enabledButton: {
    backgroundColor: '#1E88E5',
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  enabledButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#FFA726',
    fontWeight: '600',
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
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: '#1E88E5',
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0052CC',
    marginRight: 5,
  },
  orderInfoText: {
    fontSize: 14,
    color: '#333',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 10,
  },
});
