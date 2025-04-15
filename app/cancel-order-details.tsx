import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function CancelOrderDetails() {
  const params = useLocalSearchParams();
  const order = params.order ? JSON.parse(decodeURIComponent(params.order as string)) : null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString || 'N/A';
    }
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order not found</Text>
      </View>
    );
  }

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
          <Text style={styles.orderLabel}>Order #{order._id?.slice(-8) || 'N/A'}</Text>
          <Text style={styles.orderStatus}>Order Canceled</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.orderSubLabel}>Cancellation Request</Text>
          <Text style={styles.orderDate}>{formatDate(order.Date || new Date().toISOString())}</Text>
        </View>
      </View>

      <View style={styles.deliveryInfo}>
        <View style={styles.locationItem}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>Pickup: {order.PickupDetails?.name || 'N/A'}</Text>
            <Text style={styles.locationAddress}>{order.PickupDetails?.address || 'N/A'}</Text>
            <Text style={styles.phoneNumber}>{order.PickupDetails?.phone || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.locationItem}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>Drop: {order.DeliveryDetails?.name || 'N/A'}</Text>
            <Text style={styles.locationAddress}>{order.DeliveryDetails?.address || 'N/A'}</Text>
            <Text style={styles.phoneNumber}>{order.DeliveryDetails?.phone || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Item:</Text>
            <Text style={styles.detailValue}>{order.Item || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Weight:</Text>
            <Text style={styles.detailValue}>{order.weight || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>₹{order.price || 'N/A'}</Text>
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
  orderDetails: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});