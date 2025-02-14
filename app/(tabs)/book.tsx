import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PACKAGE_SIZES = [
  { id: 'S', label: 'Small', desc: 'Up to 5kg' },
  { id: 'M', label: 'Medium', desc: 'Up to 15kg' },
  { id: 'L', label: 'Large', desc: 'Up to 30kg' },
];

export default function Book() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepDot,
              currentStep >= step && styles.activeStepDot,
            ]}>
            <Text
              style={[
                styles.stepNumber,
                currentStep >= step && styles.activeStepNumber,
              ]}>
              {step}
            </Text>
          </View>
          {step < 4 && <View style={styles.stepLine} />}
        </View>
      ))}
    </View>
  );

  const renderPickupLocation = () => (
    <View style={styles.stepContent}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
      </View>
      <View style={styles.addressInputContainer}>
        <Ionicons name="location" size={20} color="#007AFF" />
        <TextInput
          style={styles.addressInput}
          placeholder="Enter pickup address"
          placeholderTextColor="#666"
        />
      </View>
      <TouchableOpacity style={styles.currentLocationButton}>
        <Ionicons name="navigate" size={20} color="#007AFF" />
        <Text style={styles.currentLocationText}>Use Current Location</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDeliveryLocation = () => (
    <View style={styles.stepContent}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
      </View>
      <View style={styles.addressInputContainer}>
        <Ionicons name="location" size={20} color="#007AFF" />
        <TextInput
          style={styles.addressInput}
          placeholder="Enter delivery address"
          placeholderTextColor="#666"
        />
      </View>
      <TouchableOpacity style={styles.saveAddressButton}>
        <Ionicons name="bookmark-outline" size={20} color="#007AFF" />
        <Text style={styles.saveAddressText}>Save this address</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPackageDetails = () => (
    <View style={styles.stepContent}>
      <Text style={styles.sectionTitle}>Package Size</Text>
      <View style={styles.sizeSelector}>
        {PACKAGE_SIZES.map((size) => (
          <TouchableOpacity
            key={size.id}
            style={[
              styles.sizeOption,
              selectedSize === size.id && styles.selectedSize,
            ]}
            onPress={() => setSelectedSize(size.id)}>
            <Text
              style={[
                styles.sizeLabel,
                selectedSize === size.id && styles.selectedSizeLabel,
              ]}>
              {size.label}
            </Text>
            <Text
              style={[
                styles.sizeDesc,
                selectedSize === size.id && styles.selectedSizeDesc,
              ]}>
              {size.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Package Weight</Text>
      <View style={styles.weightInput}>
        <TextInput
          style={styles.weightValue}
          placeholder="0.0"
          keyboardType="decimal-pad"
        />
        <Text style={styles.weightUnit}>kg</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Describe your package"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.uploadButton}>
        <Ionicons name="camera" size={24} color="#007AFF" />
        <Text style={styles.uploadText}>Add Package Photo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDeliveryPreferences = () => (
    <View style={styles.stepContent}>
      <Text style={styles.sectionTitle}>Delivery Time</Text>
      <View style={styles.timeSlotContainer}>
        <TouchableOpacity style={styles.timeSlot}>
          <Text style={styles.timeSlotText}>Today</Text>
          <Text style={styles.timeSlotSubtext}>2-4 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timeSlot, styles.selectedTimeSlot]}>
          <Text style={[styles.timeSlotText, styles.selectedTimeSlotText]}>
            Tomorrow
          </Text>
          <Text style={[styles.timeSlotSubtext, styles.selectedTimeSlotText]}>
            9-11 AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeSlot}>
          <Text style={styles.timeSlotText}>Custom</Text>
          <Text style={styles.timeSlotSubtext}>Pick time</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Special Instructions</Text>
      <TextInput
        style={styles.instructionsInput}
        placeholder="Add any special instructions for the delivery"
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPickupLocation();
      case 2:
        return renderDeliveryLocation();
      case 3:
        return renderPackageDetails();
      case 4:
        return renderDeliveryPreferences();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Delivery</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content}>{renderStepContent()}</ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep((prev) => prev - 1)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            currentStep < 4
              ? setCurrentStep((prev) => prev + 1)
              : console.log('Complete booking')
          }>
          <Text style={styles.continueButtonText}>
            {currentStep === 4 ? 'Complete Booking' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  stepIndicator: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepDot: {
    backgroundColor: '#007AFF',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  mapText: {
    fontSize: 16,
    color: '#666',
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  addressInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  currentLocationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  saveAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  saveAddressText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sizeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  sizeOption: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectedSize: {
    backgroundColor: '#007AFF',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedSizeLabel: {
    color: '#fff',
  },
  sizeDesc: {
    fontSize: 12,
    color: '#666',
  },
  selectedSizeDesc: {
    color: '#fff',
  },
  weightInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  weightValue: {
    flex: 1,
    fontSize: 16,
  },
  weightUnit: {
    fontSize: 16,
    color: '#666',
  },
  descriptionInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timeSlot: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  timeSlotSubtext: {
    fontSize: 12,
    color: '#666',
  },
  instructionsInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});