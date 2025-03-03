import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CompletedOrderDetails() {
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
          <Text style={styles.orderNumber}>Order No: #FX8Z749US</Text>
          <Text style={[styles.orderStatus, { color: '#007AFF' }]}>Complete</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.deliveryRow}>
            <Ionicons name="person-circle-outline" size={24} color="#000" />
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Delivered by</Text>
              <Text style={styles.deliveryName}>John Smith</Text>
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
              <Text style={styles.deliveryText}>Delivered on June 15, 2024 at 2:30 PM</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient</Text>
          <Text style={styles.recipientName}>Michael Anderson</Text>
          <Text style={styles.recipientPhone}>+1 (555) 123-4567</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.recipientAddress}>1234 Maple Street, Apt 5B</Text>
          <Text style={styles.recipientLocation}>Brooklyn, NY 11201</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Weight</Text>
            <Text style={styles.packageValue}>2.5 Kg</Text>
          </View>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Dimensions</Text>
            <Text style={styles.packageValue}>30 × 25 × 15 cm</Text>
          </View>
          <View style={styles.packageRow}>
            <Text style={styles.packageLabel}>Category</Text>
            <Text style={styles.packageValue}>Electronics</Text>
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
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.repeatButton, { backgroundColor: '#FF6B00' }]}>
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
    color: '#007AFF',
    fontWeight: '500',
  },
  deliveryInfo: {
    gap: 24,
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
  recipientSection: {
    gap: 8,
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
  recipientLocation: {
    fontSize: 14,
    color: '#666',
  },
  packageSection: {
    gap: 12,
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageLabel: {
    fontSize: 14,
    color: '#666',
  },
  packageValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  ratingSection: {
    marginBottom: 24,
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
  },
  ratingButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  repeatButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  whitebuttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
});