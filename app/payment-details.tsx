import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PaymentDetails() {
  const [selectedPayment, setSelectedPayment] = React.useState('online');
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apply Coupon</Text>
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholder="Enter coupon code"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <Ionicons name="location" size={20} color="#007AFF" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Pickup Location</Text>
              <Text style={styles.locationText}>123 Business Avenue, Suite 100</Text>
              <Text style={styles.locationCity}>New York, NY 10001</Text>
            </View>
          </View>
          <View style={styles.locationDivider} />
          <View style={styles.locationItem}>
            <Ionicons name="location" size={20} color="#007AFF" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Drop Location</Text>
              <Text style={styles.locationText}>456 Commercial Street</Text>
              <Text style={styles.locationCity}>New York, NY 10002</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Base Fare</Text>
          <Text style={styles.priceValue}>$30.00</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Distance (10 km)</Text>
          <Text style={styles.priceValue}>$70.00</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Weight Charges</Text>
          <Text style={styles.priceValue}>$0.00</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>$100.00</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <Text style={styles.infoText}>• Base fare: $30</Text>
        <Text style={styles.infoText}>• $7 per kilometer</Text>
        <Text style={styles.infoText}>• Additional $50 for packages over 10kg</Text>
        <Text style={styles.infoText}>• Additional $100 for packages over 15kg</Text>
        <Text style={styles.infoText}>• Estimated delivery time: 90 minutes</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentOptionsContainer}>
          <View style={styles.paymentMethodsRow}>
            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'cash' && styles.selectedPayment, { flex: 1, marginRight: 8 }]}
              onPress={() => setSelectedPayment('cash')}
            >
              <Ionicons name="cash" size={24} color="#007AFF" />
              <Text style={styles.paymentText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'online' && styles.selectedPayment, { flex: 1 }]}
              onPress={() => setSelectedPayment('online')}
            >
              <Ionicons name="card" size={24} color="#007AFF" />
              <Text style={styles.paymentText}>Online</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.amountText}>$15.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.createOrderButton}>
        <Text style={styles.createOrderText}>Create Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  couponInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  locationContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  locationCity: {
    fontSize: 14,
    color: '#666',
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedPayment: {
    backgroundColor: '#e8f2ff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  paymentText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  createOrderButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentOptionsContainer: {
    marginBottom: 12,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'right',
  },
});