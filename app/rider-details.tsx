import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function RiderDetails() {
  // Add this at the beginning of the component
  const route = useLocalSearchParams();
  const status = route.status || 'Progress'; // Default to Progress if not provided

  // Add this function to determine timeline status
  const getTimelineStatus = (currentStep: string, orderStatus: string) => {
    if (orderStatus.toLowerCase() === 'progress') {
      return currentStep === 'Order Placed';
    } else if (orderStatus.toLowerCase() === 'pickup') {
      return ['Order Placed', 'Picked Up'].includes(currentStep);
    } else if (orderStatus.toLowerCase() === 'delivered') {
      return true; // All steps complete
    }
    return false;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={{ padding: 8 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rider Details</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.orderInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Order No.</Text>
            <Text style={styles.value}>FX8Z749US</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Parcel Weight</Text>
            <Text style={styles.value}>2.5 Kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Parcel Type</Text>
            <Text style={styles.value}>Document</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.value}>+1 234 567 8900</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vehicle NUMBER</Text>
            <Text style={styles.value}>ABC 123</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vehicle Type</Text>
            <Text style={styles.value}>Toyota Camry</Text>
          </View>
        </View>

        <View style={styles.riderSection}>
          <View style={styles.riderInfo}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitials}>MA</Text>
            </View>
            <View>
              <Text style={styles.riderName}>Michael Anderson</Text>
              <View style={styles.driverDetails}>
            <Text style={styles.detailText}>Toyota</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>ABC 123</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>+1 234-567-8900</Text>
          </View>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.locationRow}>
              <View style={styles.dotBlack} />
              <Text style={styles.locationText}>185 Broadway Street, Financial District</Text>
            </View>
            <View style={styles.locationRow}>
              <View style={styles.dotRed} />
              <Text style={styles.locationText}>432 Park Avenue, Midtown Manhattan</Text>
            </View>
          </View>
          <Text style={styles.distance}>delivery in 60 min</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 28.6139,  // Delhi coordinates
              longitude: 77.2090,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: 28.6139,
                longitude: 77.2090,
              }}
              title="Current Location"
            />
          </MapView>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentText}>PAID BY CASH</Text>
            <Text style={styles.amount}>$15.00</Text>
          </View>
        </View>

        <View style={styles.deliveryStatusSection}>
          <Text style={styles.statusTitle}>Delivery Status</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, getTimelineStatus('Order Placed', status as string) && styles.activeDot]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.statusLabel, getTimelineStatus('Order Placed', status as string) && styles.activeLabel]}>
                  Order Placed
                </Text>
                <Text style={[styles.statusTime, getTimelineStatus('Order Placed', status as string) && styles.activeTime]}>
                  Oct 15, 2:30 PM
                </Text>
              </View>
            </View>
            <View style={[styles.timelineConnector, { 
              backgroundColor: getTimelineStatus('Picked Up', status as string) ? '#34C759' : '#e0e0e0' 
            }]} />
            
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { 
                backgroundColor: getTimelineStatus('Picked Up', status as string) ? '#34C759' : '#e0e0e0' 
              }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.statusLabel, getTimelineStatus('Picked Up', status as string) && styles.activeLabel]}>
                  Picked Up
                </Text>
                <Text style={[styles.statusTime, getTimelineStatus('Picked Up', status as string) && styles.activeTime]}>
                  {getTimelineStatus('Picked Up', status as string) ? 'Oct 15, 2:45 PM' : 'Pending'}
                </Text>
              </View>
            </View>
            <View style={[styles.timelineConnector, { 
              backgroundColor: getTimelineStatus('Delivered', status as string) ? '#34C759' : '#e0e0e0' 
            }]} />
            
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { 
                backgroundColor: getTimelineStatus('Delivered', status as string) ? '#34C759' : '#e0e0e0' 
              }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.statusLabel, getTimelineStatus('Delivered', status as string) && styles.activeLabel]}>
                  Delivered
                </Text>
                <Text style={[styles.statusTime, getTimelineStatus('Delivered', status as string) && styles.activeTime]}>
                  {getTimelineStatus('Delivered', status as string) ? 'Oct 15, 3:30 PM' : 'Pending'}
                </Text>
              </View>
            </View>
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
  content: {
    padding: 16,
  },
  orderInfo: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  riderSection: {
    marginBottom: 24,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: '600',
  },
  riderName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  riderRating: {
    fontSize: 14,
    color: '#666',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 24,
  },
  paymentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  deliverySection: {
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  locationInfo: {
    gap: 16,
  },
  locationPoint: {
    flexDirection: 'row',
    gap: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  locationPhone: {
    fontSize: 14,
    color: '#666',
  },
  statusSection: {
    marginBottom: 24,
  },
  statusTimeline: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    gap: 12,
  },
  statusTime: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  activeStatus: {
    color: '#007AFF',
    fontWeight: '500',
  },
  driverSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  dot: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  locationContainer: {
    gap: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotBlack: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  dotRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  deliveryStatusSection: {
    padding: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    marginRight: 12,
    marginTop: 4,
  },
  timelineConnector: {
    width: 2,
    height: 24,
    backgroundColor: '#34C759',
    marginLeft: 5,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  timelineStatusTime: {
    fontSize: 14,
    color: '#666',
  },
  activeDot: {
    width: 12,
    height: 40,
    borderRadius: 6,
  },
  activeLabel: {
    color: '#34C759',
  },
  activeTime: {
    color: '#34C759',
  },
  mapContainer: {
    height: 200,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});