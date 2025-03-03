import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CancelOrderDetails() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={{ padding: 8 }}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancel Order</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.orderRow}>
          <Text style={styles.orderLabel}>Order #HD67931</Text>
          <Text style={styles.orderStatus}>order cancel</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderSubLabel}>Cancellation Request</Text>
          <Text style={styles.orderDate}>Today, 5:30 PM</Text>
        </View>
      </View>

      <View style={styles.deliveryInfo}>
        <View style={styles.locationItem}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>Michael Anderson</Text>
            <Text style={styles.locationAddress}>1234 Willow Street, Apartment 5B</Text>
            <Text style={styles.locationAddress}>San Francisco, CA 94110</Text>
            <Text style={styles.phoneNumber}>+1 (415) 555-0123</Text>
          </View>
        </View>

        <View style={styles.locationItem}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>Drop: Mary Johnson</Text>
            <Text style={styles.locationAddress}>456 Residential Ave</Text>
            <Text style={styles.locationAddress}>New York, NY 10002</Text>
            <Text style={styles.phoneNumber}>+1 (345) 678-9012</Text>
          </View>
        </View>
      </View>
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
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderInfo: {
    padding: 16,
    backgroundColor: '#ff3b30',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  orderStatus: {
    fontSize: 14,
    color: '#fff',
  },
  orderSubLabel: {
    fontSize: 14,
    color: '#fff',
  },
  orderDate: {
    fontSize: 14,
    color: '#fff',
  },
  deliveryInfo: {
    padding: 16,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  locationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
});