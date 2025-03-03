import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ORDERS = [
  {
    id: 'FX8Z749US',
    from: 'London, UK',
    status: 'Pickup',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX123456780',
    from: 'London, UK',
    status: 'Progress',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX8Z749US',
    from: 'London, UK',
    status: 'Delivered',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX8Z749US',
    from: 'London, UK',
    status: 'cancel',
    date: 'Dec 8, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX9876543',
    from: 'Paris, FR',
    status: 'Progress',
    date: 'Dec 9, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX5432198',
    from: 'Berlin, DE',
    status: 'Pickup',
    date: 'Dec 9, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX7654321',
    from: 'Madrid, ES',
    status: 'Delivered',
    date: 'Dec 7, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  },
  {
    id: 'FX2468135',
    from: 'Rome, IT',
    status: 'cancel',
    date: 'Dec 6, 2023',
    steps: ['Order Placed', 'Pickup', 'Delivered']
  }
];

export default function Orders() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pickup': return '#FFB800';
      case 'progress': return '#FF6B00';
      case 'delivered': return '#00C853';
      case 'cancel': return '#FF0000';
      default: return '#666666';
    }
  };
  
  const getProgressWidth = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pickup': return '33%';
      case 'progress': return '66%';
      case 'delivered': return '100%';
      case 'cancel': return '100%';
      default: return '0%';
    }
  };
  
  const renderProgressOrStatus = (status: string) => {
    if (status.toLowerCase() === 'cancel') {
      return (
        <View style={styles.deliveredContainer}>
          <Ionicons name="close-circle" size={20} color="#FF0000" />
          <Text style={styles.canceldeliveredText}>Package cancelled</Text>
        </View>
      )
    }
    
    if (status.toLowerCase() === 'delivered') {
      return (
        <View style={styles.deliveredContainer}>
          <Ionicons name="checkmark-circle" size={20} color="#00C853" />
          <Text style={styles.deliveredText}>Package delivered successfully</Text>
        </View>
      );
    }

    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: getProgressWidth(status) }]} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track & Status</Text>
      </View>
  
      {ORDERS.map((order, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.orderCard}
          onPress={() => {
            const status = order.status.toLowerCase();
            if (status === 'pickup' || status === 'progress') {
              router.push('/rider-details');
            } else {
              router.push('/cancel-order');
            }
          }}
        >
          <View style={styles.orderHeader}>
            <Text style={styles.packageId}>Package #{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.fromText}>From: {order.from}</Text>
          
          {renderProgressOrStatus(order.status)}
          {!['delivered', 'cancel'].includes(order.status.toLowerCase()) && (
            <View style={styles.progressContainer}>
              {order.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <Text style={styles.stepText}>{step}</Text>
                </React.Fragment>
              ))}
            </View>
          )}
          <Text style={styles.dateText}>{order.date}</Text>
          
        </TouchableOpacity>
      ))}
    </ScrollView>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  orderCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageId: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  fromText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
  },
  stepText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '700',
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    borderRadius: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 1,
  },
  deliveredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  deliveredText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#00C853',
    fontWeight: '500',
  },
  canceldeliveredText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#E20C0C',
    fontWeight: '500',
  },
});