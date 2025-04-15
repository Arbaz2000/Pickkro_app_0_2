import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function CompletedOrderDetails() {
  const params = useLocalSearchParams();
  const order = params.order ? JSON.parse(decodeURIComponent(params.order as string)) : null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
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
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>Order No: #{order._id?.slice(-8) || 'N/A'}</Text>
          <Text style={[styles.orderStatus, { color: '#34C759' }]}>Completed</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.deliveryRow}>
            <Ionicons name="person-circle-outline" size={24} color="#000" />
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Delivered by</Text>
              <Text style={styles.deliveryName}>{order.DeliveryDetails?.name || 'N/A'}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FF6B00" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.deliveryRow}>
            <Ionicons name="time-outline" size={24} color="#000" />
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Delivery Status</Text>
              <Text style={styles.deliveryText}>Delivered on {formatDate(order.Date || new Date().toISOString())}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient</Text>
          <Text style={styles.recipientName}>{order.DeliveryDetails?.name || 'N/A'}</Text>
          <Text style={styles.recipientPhone}>{order.DeliveryDetails?.phone || 'N/A'}</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.recipientAddress}>{order.DeliveryDetails?.address || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Item</Text>
            <Text style={styles.packageValue}>{order.Item || 'N/A'}</Text>
          </View>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Weight</Text>
            <Text style={styles.packageValue}>{order.weight || 'N/A'}</Text>
          </View>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Price</Text>
            <Text style={styles.packageValue}>₹{order.price || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star} 
                name={star <= 4 ? "star" : "star-outline"} 
                size={24} 
                color="#FF6B00" 
              />
            ))}
            <Text style={styles.ratingScore}>4.8 / 5.0</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.ratingButton, { borderColor: '#007AFF' }]}>
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>Rate Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.repeatButton, { backgroundColor: '#FF6B00' }]}
            onPress={() => router.push('/book')}
          >
            <Text style={styles.whitebuttonText}>Repeat Order</Text>
          </TouchableOpacity>
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
  content: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  deliveryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  deliveryText: {
    fontSize: 14,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: '500',
  },
  recipientPhone: {
    fontSize: 14,
    color: '#666',
  },
  recipientAddress: {
    fontSize: 14,
    color: '#666',
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  packageLabel: {
    fontSize: 14,
    color: '#666',
  },
  packageValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingScore: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  ratingButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  repeatButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  whitebuttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
});