import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CancelOrder() {
  const [selectedReason, setSelectedReason] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const cancellationReasons = [
    'Wrong delivery address',
    'Price too high',
    'Ordered by mistake',
    'Changed my mind',
    'Other'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={{ padding: 8 }}
          onPress={() => router.back()}
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
          <Text style={styles.orderStatus}>Delivered</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderSubLabel}>Cancellation Request</Text>
          <Text style={styles.orderDate}>Today, 3:30 PM</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Order Placed</Text>
            <Text style={styles.progressText}>In Transit</Text>
            <Text style={[styles.progressText, styles.activeProgress]}>Delivered</Text>
          </View>
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

      <View style={styles.reasonSection}>
        <Text style={styles.reasonTitle}>Cancellation Reason</Text>
        <TouchableOpacity 
          style={styles.reasonSelector}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.reasonPlaceholder}>
            {selectedReason || 'Select a reason'}
          </Text>
          <Ionicons 
            name={showDropdown ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            {cancellationReasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedReason(reason);
                  setShowDropdown(false);
                }}
              >
                <Text style={[
                  styles.dropdownText,
                  selectedReason === reason && styles.selectedDropdownText
                ]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.warningContainer}>
        <Ionicons name="warning" size={24} color="#FFA500" />
        <Text style={styles.warningText}>
          Your order is already in transit. Cancellation may not be possible at this stage.
        </Text>
      </View>

      <Text style={styles.freeText}>
        five cancellation free in month,{"\n"}
        after complete five cancels 40Rs per{"\n"}
        cancel charges apply
      </Text>

      <View style={styles.actionButtons}>
        // In the confirm button press handler
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => router.push('/cancel-order-details')}
        >
          <Text style={styles.confirmButtonText}>Confirm Cancellation</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.keepButton}
          onPress={() => router.back()}
        >
          <Text style={styles.keepButtonText}>Keep Order</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderStatus: {
    fontSize: 14,
    color: '#666',
  },
  orderSubLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
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
  reasonSection: {
    padding: 16,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  reasonSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  reasonPlaceholder: {
    fontSize: 14,
    color: '#666',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  freeText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 16,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  confirmButton: {
    backgroundColor: '#DF7016',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  keepButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  keepButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DF7016',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  activeProgress: {
    color: '#DF7016',
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    position: 'absolute',
    width:'100%',
    top: '50%',
    marginHorizontal: 16,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDropdownText: {
    color: '#DF7016',
    fontWeight: '500',
  },
});
