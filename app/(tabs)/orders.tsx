import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DELIVERY_STEPS = [
  { id: 1, title: 'Order Placed', time: '10:30 AM', completed: true },
  { id: 2, title: 'Picked Up', time: '11:15 AM', completed: true },
  { id: 3, title: 'Out for Delivery', time: '11:45 AM', completed: true },
  { id: 4, title: 'Delivered', time: '- -:- -', completed: false },
];

export default function Orders() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Live Tracking Map</Text>
          </View>
          <View style={styles.etaCard}>
            <Text style={styles.etaTitle}>Estimated Arrival</Text>
            <Text style={styles.etaTime}>12:30 PM</Text>
            <Text style={styles.etaSubtext}>Driver is 2.5 km away</Text>
          </View>
        </View>

        {/* Delivery Status */}
        <View style={styles.statusContainer}>
          {DELIVERY_STEPS.map((step, index) => (
            <View key={step.id} style={styles.statusStep}>
              <View style={styles.stepIndicator}>
                <View
                  style={[
                    styles.stepDot,
                    step.completed && styles.completedStepDot,
                  ]}>
                  {step.completed && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                {index < DELIVERY_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      step.completed && styles.completedStepLine,
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              }}
              style={styles.driverImage}
            />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>John Smith</Text>
              <Text style={styles.driverRating}>⭐ 4.9 (2.5k deliveries)</Text>
            </View>
          </View>
          <View style={styles.driverActions}>
            <TouchableOpacity style={styles .driverButton}>
              <Ionicons name="call" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.driverButton}>
              <Ionicons name="chatbubble" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Actions */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  mapContainer: {
    padding: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#666',
  },
  etaCard: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  etaTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  etaSubtext: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    padding: 16,
  },
  statusStep: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStepDot: {
    backgroundColor: '#34C759',
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: '#f5f5f5',
    marginVertical: 4,
  },
  completedStepLine: {
    backgroundColor: '#34C759',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 14,
    color: '#666',
  },
  driverCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  driverRating: {
    fontSize: 14,
    color: '#666',
  },
  driverActions: {
    flexDirection: 'row',
  },
  driverButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff3b30',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});